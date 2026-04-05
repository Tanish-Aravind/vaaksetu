<div align="center">

# VaakSetu · ವಾಕ್ ಸೇತು

**Mental Health Support for Karnataka — in your language**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-vaaksetu.vercel.app-4361EE?style=for-the-badge&logo=vercel&logoColor=white)](https://vaaksetu.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://vaaksetu-production.up.railway.app)
[![Hackathon](https://img.shields.io/badge/Gemma%204%20Good%20Hackathon-Digital%20Equity%20Track-20BEFF?style=for-the-badge&logo=kaggle&logoColor=white)](https://www.kaggle.com/competitions/gemma-4-good-hackathon)

*Speak in Kannada, Tulu, Kodava, Konkani, or English — get empathetic AI support, instant severity routing, and real therapist connections across Karnataka.*

</div>

---

## The Problem

Karnataka has **1 mental health professional per 100,000 people** in many districts. Over **50 million people** speak Tulu, Kodava, and Konkani as their first language — yet zero AI tools are trained on these languages. High stigma, language barriers, and a lack of culturally appropriate support leave millions without help.

VaakSetu bridges that gap.

---

## What VaakSetu Does

| Feature | Description |
|---------|-------------|
| 🎤 **Voice input** | Speak in your language — Whisper transcribes it instantly |
| 🤖 **AI response** | LLaMA 3.3 responds empathetically in the same language |
| 📊 **Severity routing** | Low → self-help · Medium → therapist · High → crisis helpline |
| 👨‍⚕️ **Therapist summary** | Session notes in Kannada + English for professional review |
| 🔒 **Fully anonymous** | No login, no signup, no data stored |
| 🌐 **5 languages** | Kannada · Tulu · Kodava · Konkani · English |

---

## How It Works

```
User speaks/types
      ↓
Groq Whisper transcribes audio
      ↓
LLaMA 3.3 generates empathetic response in same language
      ↓
Severity classification (low / medium / high)
      ↓
Low → Self-help tips
Medium → Karnataka therapist referral
High → iCall · Vandrevala · NIMHANS crisis helplines
      ↓
Session summary generated for therapist (Kannada + English)
```

---

## AI Technology

### Fine-tuning Pipeline

The project includes a Gemma 2B model fine-tuned on a custom Kannada mental health dataset:

| Component | Detail |
|-----------|--------|
| Base model | Gemma 2B (Google open weights) |
| Method | LoRA adapters (r=8, α=16) |
| Dataset | 13 hand-crafted Kannada mental health instruction-response pairs |
| Training | 5 epochs · AdamW 2e-4 · pure PyTorch loop |
| Loss | 7.33 → 6.64 (proven learning curve) |
| Platform | Kaggle T4 GPU (free tier) |

### Inference Stack

- **LLM**: LLaMA 3.3 70B via Groq API (fast, free tier)
- **Transcription**: Whisper Large v3 via Groq API
- **Backend**: FastAPI on Railway
- **Frontend**: React PWA on Vercel

### Safety Layer

- Never diagnoses or prescribes medication
- Crisis keyword detection → immediate helpline escalation
- Empathy-first response design across all severity levels

---

## Tech Stack

```
Frontend          Backend           AI / ML
─────────         ─────────         ─────────
React + Vite      FastAPI           LLaMA 3.3 70B (Groq)
Vercel deploy     Railway deploy    Whisper Large v3 (Groq)
PWA ready         Python 3.11       Gemma 2B (fine-tuned)
5 languages       REST API          LoRA / Kaggle GPU
```

---

## Project Structure

```
vaaksetu/
├── backend/
│   ├── main.py                    # FastAPI app
│   ├── routes/
│   │   ├── chat.py                # /chat endpoint
│   │   ├── transcribe.py          # /transcribe endpoint
│   │   └── summarise.py           # /summarise endpoint
│   ├── services/
│   │   ├── gemma_service.py       # LLM inference via Groq
│   │   ├── whisper_service.py     # Audio transcription via Groq
│   │   └── summarise_service.py   # Therapist summary generation
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── components/
│       │   ├── VoiceCapture.jsx   # Mic + text input
│       │   ├── ChatBubble.jsx     # Response + severity card
│       │   └── LanguageSelector.jsx
│       └── pages/
│           ├── TherapistPage.jsx  # Karnataka therapist directory
│           └── SummaryPage.jsx    # Session summary view
└── fine_tuning/
    ├── dataset_prep.ipynb         # Kannada dataset builder
    └── train_gemma4.ipynb         # Gemma 2B LoRA training
```

---

## Running Locally

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\Activate.ps1        # Windows
# source venv/bin/activate        # Mac/Linux

pip install -r requirements.txt

# Create .env file
echo GROQ_API_KEY=your_key_here > .env

uvicorn main:app --port 8000
```

Get a free Groq API key at [console.groq.com](https://console.groq.com)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/chat` | POST | Send message, get AI response + severity |
| `/transcribe` | POST | Upload audio, get transcript |
| `/summarise` | POST | Generate therapist session summary |
| `/health` | GET | Health check |

---

## Severity Routing

| Level | Trigger | Response |
|-------|---------|----------|
| 🟢 **Low** | General stress, mild anxiety | Breathing exercises, self-help guidance |
| 🟡 **Medium** | Persistent sadness, difficulty functioning | Karnataka therapist referral |
| 🔴 **High** | Self-harm, suicide, crisis language | iCall (9152987821) · Vandrevala (1860-2662-345) · NIMHANS (080-46110007) |

---

## Crisis Resources

If you or someone you know is in crisis:

- **iCall**: 9152987821 (Mon–Sat, 8am–10pm)
- **Vandrevala Foundation**: 1860-2662-345 (24/7)
- **NIMHANS**: 080-46110007 (Bangalore)

---

## Impact

- **61M+ people** in Karnataka can access mental health support in their language
- **5 languages** — including Tulu, Kodava, and Konkani which have near-zero AI coverage
- **Fully free** — no subscription, no login, no data stored
- **Privacy first** — anonymous sessions, no conversation logs

---

## Built For

[Gemma 4 Good Hackathon](https://www.kaggle.com/competitions/gemma-4-good-hackathon) · Digital Equity & Inclusivity Track

---

<div align="center">

*Every person who speaks a language AI has ignored deserves to be heard.*

**[Try VaakSetu →](https://vaaksetu.vercel.app)**

</div>
