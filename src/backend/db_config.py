'''
Configuration file that returns an object that is connected to Supabase.
'''

import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("DB_URL")
key = os.getenv("DB_KEY")
Client = create_client(url, key)

def connect ():
    return Client