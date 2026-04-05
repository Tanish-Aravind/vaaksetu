from dotenv import load_dotenv
load_dotenv()

import httpx
import json
import os

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = "llama-3.3-70b-versatile"

SUMMARISE_PROMPT = """You are a clinical assistant helping therapists in Karnataka, India.
Read the conversation and produce a structured summary.

Respond ONLY in this exact JSON format:
{
  "summary_kannada": "2-3 sentence summary in Kannada script",
  "summary_english": "2-3 sentence summary in English",
  "key_concerns": ["concern1", "concern2"],
  "emotional_state": "brief description in English",
  "recommended_action": "what the therapist should do next"
}"""


def summarise_conversation(messages: list, severity: str) -> dict:
    conversation_text = ""
    for msg in messages:
        role = "User" if msg["role"] == "user" else "VaakSetu"
        conversation_text += f"{role}: {msg['content']}\n"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": SUMMARISE_PROMPT},
            {"role": "user", "content": f"Severity: {severity}\n\nConversation:\n{conversation_text}"}
        ],
        "temperature": 0.3,
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
        return {
            "summary_kannada": parsed.get("summary_kannada", ""),
            "summary_english": parsed.get("summary_english", ""),
            "key_concerns": parsed.get("key_concerns", []),
            "emotional_state": parsed.get("emotional_state", ""),
            "recommended_action": parsed.get("recommended_action", ""),
            "severity": severity
        }
    except Exception:
        return {
            "summary_kannada": "ಸಾರಾಂಶ ಲಭ್ಯವಿಲ್ಲ",
            "summary_english": "Summary could not be generated",
            "key_concerns": [],
            "emotional_state": "unknown",
            "recommended_action": "Please review manually",
            "severity": severity
        }