import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    # Priority 1: Use DATABASE_URL (for Railway/Neon)
    database_url = os.getenv("DATABASE_URL")
    if database_url:
        # Fix for Neon's connection string
        if "neon.tech" in database_url:
            # Ensure SSL mode is set
            if "sslmode" not in database_url:
                database_url += "?sslmode=require"
        return psycopg2.connect(database_url)
    
    # Priority 2: Use individual variables (backup)
    try:
        return psycopg2.connect(
            host=os.getenv("DB_HOST", "localhost"),
            port=os.getenv("DB_PORT", "5432"),
            dbname=os.getenv("DB_NAME", "postgres"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", ""),
            sslmode="require"  # Important for Neon
        )
    except Exception as e:
        # Priority 3: Fallback to local development
        return psycopg2.connect(
            host="localhost",
            port="5432",
            dbname=os.getenv("DB_NAME", "postgres"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "")
        )