import os
import psycopg2

def get_connection():
    database_url = os.getenv("DATABASE_URL")
    if database_url:
        return psycopg2.connect(database_url)
    else:
        # Fallback for local development
        return psycopg2.connect(
            host="localhost",
            port="5432", 
            dbname="your_local_db",
            user="your_local_user",
            password="your_local_password"
        )