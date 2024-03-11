import time
from fastapi import FastAPI, Depends
from neo4j import GraphDatabase
from contextlib import asynccontextmanager
from utils import random_string 
from pydantic import BaseModel

# Define a Pydantic model for the Post object
class Post(BaseModel):
    body: str
    reply_to: str = None

# Define your Neo4j database connection details
NEO4J_URI = "neo4j://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "password"

# Create a FastAPI app instance
app = FastAPI()

# Initialize the Neo4j driver instance on startup
driver = None

@app.on_event("startup")
async def startup_event():
    global driver
    while True:
        try:
            driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
            driver.verify_connectivity()
            break
        except Exception as e:
            print(e)
            time.sleep(3)
            continue

# Define a dependency function to get a Neo4j session
def get_neo4j_session():
    session = driver.session()
    try:
        yield session
    finally:
        session.close()

# Define a route to create a post

@app.post("/post")
async def create_post(post:Post, session=Depends(get_neo4j_session)):
    """ Create a new post in the database
    
    args: post (Post): the post object to create
    
    returns: None
    """
    
    pid = random_string()
    if post.reply_to:
        session.run(
            """
            MATCH (p:Post {id: $reply_to})
            CREATE (p)<-[:REPLY]-(r:Post {id: $id, body: $body})
            """,
            reply_to = post.reply_to,
            id = pid,
            body = post.body
        )
    else:
        session.run(
            """
            CREATE (p:Post {id: $id, body: $body})
            """,
            id = pid,
            body = post.body
        )
        
    return {'message': "Post created successfully"}

@app.get("/thread/{pid}")
async def get_thread(pid: str, session=Depends(get_neo4j_session)):
    """ Get a thread of posts from the database
    
    args: pid (str): the id of the post to start the thread from
    
    returns: list of posts
    """
    
    result = session.run(
        """
        MATCH p=(tail:Post)-[:REPLY*]->(head:Post {id: $pid})
            WHERE NOT (head)-->() AND NOT ()-->(tail)
        WITH COLLECT(p) AS thread
        CALL apoc.convert.toTree(thread) YIELD value AS tree
        RETURN tree
        """,
        pid = pid
    )
    
    return result.data()