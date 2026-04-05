import os

import httpx
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma2:2b"

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

Severity guidelines:
- low: general stress, mild anxiety, everyday worries
- medium: persistent sadness, difficulty functioning, needs professional support
- high: mentions of self harm, suicide, crisis, extreme distress"""
}


def chat_with_gemma(user_message: str, language: str = "kn") -> dict:
    system_prompt = SYSTEM_PROMPTS["en"] if language == "en" else SYSTEM_PROMPTS["default"]
    prompt = f"{system_prompt}\n\nUser: {user_message}\n\nRespond in JSON only:"

    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False
    }

    with httpx.Client(timeout=60.0) as client:
        response = client.post(OLLAMA_URL, json=payload)
        response.raise_for_status()

    result = response.json()
    raw_text = result["response"].strip()

    try:
        start = raw_text.find("{")
        end = raw_text.rfind("}") + 1
        json_str = raw_text[start:end]
        parsed = json.loads(json_str)
        return {
            "response": parsed.get("response", "Sorry, please try again."),
            "severity": parsed.get("severity", "low")
        }
    except Exception:
        return {
            "response": raw_text,
            "severity": "low"
        }