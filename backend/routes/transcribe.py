from fastapi import APIRouter, UploadFile, File, Form
from services.whisper_service import transcribe_audio

router = APIRouter()

@router.post("/transcribe")
async def transcribe(
    audio: UploadFile = File(...),
    language: str = Form(default="kn")
):
    audio_bytes = await audio.read()
    text = transcribe_audio(audio_bytes, language)
    return {
        "transcript": text,
        "language": language
    }