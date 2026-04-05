from fastapi import APIRouter
from pydantic import BaseModel
from services.gemma_service import chat_with_gemma

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    language: str = "kn"

@router.post("/chat")
def chat(request: ChatRequest):
    result = chat_with_gemma(request.message, request.language)
    return {
        "response": result["response"],
        "severity": result["severity"],
        "language": request.language
    }