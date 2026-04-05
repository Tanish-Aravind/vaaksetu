from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes.transcribe import router as transcribe_router
from routes.chat import router as chat_router
from routes.summarise import router as summarise_router
import os

load_dotenv()

app = FastAPI(title="VaakSetu API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://vaaksetu.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transcribe_router)
app.include_router(chat_router)
app.include_router(summarise_router)

@app.get("/")
def root():
    return {"message": "VaakSetu is running"}

@app.get("/health")
def health():
    return {"status": "ok", "app": "VaakSetu"}