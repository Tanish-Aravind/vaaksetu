# edit test_groq.py - remove the gemma filter
from dotenv import load_dotenv
load_dotenv()
import os, httpx

r = httpx.get(
    "https://api.groq.com/openai/v1/models",
    headers={"Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}"}
)
for m in r.json()["data"]:
    print(m["id"])