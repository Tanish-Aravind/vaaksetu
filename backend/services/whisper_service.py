from faster_whisper import WhisperModel
import tempfile
import os

model = None

def get_model():
    global model
    if model is None:
        model = WhisperModel("base", device="cpu", compute_type="int8")
    return model

def transcribe_audio(audio_bytes: bytes, language: str = "kn") -> str:
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp.write(audio_bytes)
        tmp_path = tmp.name
    try:
        segments, info = get_model().transcribe(
    tmp_path,
    language=language,
    task="transcribe",
    beam_size=5
)
        transcript = " ".join(segment.text for segment in segments)
        return transcript.strip()
    finally:
        os.unlink(tmp_path)