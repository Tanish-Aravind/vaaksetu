from dotenv import load_dotenv
load_dotenv()
import httpx
import json
import os

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = "llama-3.3-70b-versatile"

SYSTEM_PROMPTS = {
    "en": """You are VaakSetu, a mental health support assistant.
Always respond warmly and empathetically in English.
Never give a medical diagnosis. Never suggest medication.

Respond ONLY in this exact JSON format:
{
  "response": "your empathetic response in English here",
  "severity": "low" or "medium" or "high"
}

Severity guidelines:
- low: general stress, mild anxiety, everyday worries
- medium: persistent sadness, difficulty functioning, needs professional support
- high: mentions of self harm, suicide, crisis, extreme distress""",

    "default": """ನೀವು VaakSetu ಎಂಬ ಮಾನಸಿಕ ಆರೋಗ್ಯ ಸಹಾಯಕ.
ನೀವು ಯಾವಾಗಲೂ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಬೇಕು.
ನೀವು ಸಹಾನುಭೂತಿ ಮತ್ತು ಕಾಳಜಿಯಿಂದ ಮಾತನಾಡಬೇಕು.
ನೀವು ಎಂದಿಗೂ ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯ ಮಾಡಬಾರದು.

You must respond ONLY in this exact JSON format:
{
  "response": "your empathetic response in Kannada here",
  "severity": "low" or "medium" or "high"
}

Severity:
- low: general stress, mild anxiety
- medium: persistent sadness, needs professional support
- high: self harm, suicide, crisis"""
}


def chat_with_gemma(user_message: str, language: str = "kn") -> dict:
    system_prompt = SYSTEM_PROMPTS["en"] if language == "en" else SYSTEM_PROMPTS["default"]

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        "temperature": 0.7,
        "max_tokens": 500
    }

    with httpx.Client(timeout=30.0) as client:
        response = client.post(GROQ_API_URL, json=payload, headers=headers)
        response.raise_for_status()

    result = response.json()
    raw_text = result["choices"][0]["message"]["content"].strip()

    try:
        start = raw_text.find("{")
        end = raw_text.rfind("}") + 1
        parsed = json.loads(raw_text[start:end])
        response_text = parsed.get("response", "")
        if response_text.startswith("{"):
            inner = json.loads(response_text)
            response_text = inner.get("response", response_text)
        return {
            "response": response_text,
            "severity": parsed.get("severity", "low")
        }
    except Exception:
        return {"response": raw_text, "severity": "low"}