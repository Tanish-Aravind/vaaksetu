from groq import Groq
import tempfile
import os
from dotenv import load_dotenv
load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def transcribe_audio(audio_bytes: bytes, language: str = "kn") -> str:
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp.write(audio_bytes)
        tmp_path = tmp.name
    try:
        with open(tmp_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                file=("recording.wav", audio_file),
                model="whisper-large-v3",
                language=language if language in ["en", "kn"] else "kn",
            )
        return transcription.text.strip()
    finally:
        os.unlink(tmp_path)