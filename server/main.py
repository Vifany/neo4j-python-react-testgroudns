from fastapi import FastAPI, Depends
from neo4j import GraphDatabase

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
    driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# Define a dependency function to get a Neo4j session
def get_neo4j_session():
    session = driver.session()
    try:
        yield session
    finally:
        session.close()

# Define a route handler that uses the Neo4j session
@app.get("/")
async def read_root(session=Depends(get_neo4j_session)):
    pid = '123'
    body = "Hello World!"
    session.run(    
        """
        CREATE (p:Post {id: $id, body: $body})
        """,  
        id = pid, 
        body = body)
    
@app.get("/test")
async def read_post(session=Depends(get_neo4j_session)):
    pid = '123'
    ans = session.run(
        """
        MATCH (p:Post {id: $id})
        RETURN p.body
        """,
        id = pid
    )
    return ans.data()