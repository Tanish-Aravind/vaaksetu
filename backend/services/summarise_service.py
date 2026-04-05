import httpx
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma2:2b"

SUMMARISE_PROMPT = """You are a clinical assistant helping therapists in Karnataka, India.
Read the conversation and produce a structured summary.
The user may have spoken in Kannada or English.

You must respond ONLY in this exact JSON format, nothing else:
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

    prompt = f"""{SUMMARISE_PROMPT}

Severity level: {severity}

Conversation:
{conversation_text}

Respond in JSON only:"""

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
            "recommended_action": "Please review the conversation manually",
            "severity": severity
        }