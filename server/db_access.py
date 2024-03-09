import random

from neo4j import GraphDatabase
from pydantic import BaseModel
from string import ascii_letters
from string import digits


# URI examples: "neo4j://localhost", "neo4j+s://xxx.databases.neo4j.io"
URI = "bolt://localhost:7687/"
AUTH = ("neo4j", "password")

neo_driver = GraphDatabase.driver(URI, auth=AUTH)

alphabet = ascii_letters + digits

def random_choice():
    return ''.join(random.choices(alphabet, k=8))



    
class Post(BaseModel):
    id: str = random_choice()
    body: str
    reply: str = None
    
   
   
'''
    Очень грубые запросы к базе данных, демонстрирующие её функционал
''' 

def post_message(post: Post):
    """
        Добавление поста
    """
    message = driver.execute_query(
        """
        CREATE (p:Post {id: $id, body: $body})
        RETURN p
        """,
        id = post.id, 
        body = post.body
        )
    print(message.records)
    
    
def read_message(id: str):
    """
        Получение поста по Id
    """
    message = driver.execute_query(
        """
        MATCH (p:Post {id: $id})
        RETURN p.body
        """,
        id = id
        )
    print(message.records)
    
def reply_message(post: Post):
    """
        Ответ на пост
    """
    if post.reply != None:
        message = driver.execute_query(
        """
        MATCH (parentPost:Post {id: $reply})
        CREATE (newPost:Post {id: $id, body: $body})
        CREATE (newPost)-[:REPLY_TO]->(parentPost)
        RETURN newPost  
        """,
        id = post.id,
        reply = post.reply,
        body = post.body
        )
        print(message.records)
        
def get_thread(root_id: str, depth: int):
    """
        Ответы к выбранному посту (все, плохо структурированные)
        TODO: разобраться как структурировать
    """
    record = driver.session().run(
        """
        MATCH (endNode)-[:REPLY_TO*]->(startNode:Post {id: $root_id})
        RETURN endNode AS chain
        """,
        root_id = root_id,
        depth = depth
        )      

    for inst in record.data():
        print(inst)
        
        
test_post = Post(body = 'Hello again!', reply = 'WZaGKyTn' )

with neo_driver as driver:
    driver.verify_connectivity()
    get_thread('aW6uPATH', 2)