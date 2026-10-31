
import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client

# Load credentials from backend/.env
ENV_PATH = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(ENV_PATH)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase credentials are missing in backend/.env")

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

print("Brightloop Supabase client initialized!")
