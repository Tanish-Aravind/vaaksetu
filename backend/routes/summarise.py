from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from services.summarise_service import summarise_conversation

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class SummariseRequest(BaseModel):
    messages: List[Message]
    severity: str = "medium"

@router.post("/summarise")
def summarise(request: SummariseRequest):
    messages_dict = [{"role": m.role, "content": m.content} for m in request.messages]
    result = summarise_conversation(messages_dict, request.severity)
    return result