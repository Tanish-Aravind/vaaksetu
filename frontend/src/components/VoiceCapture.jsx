import { useState, useRef } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const API_URL = "http://localhost:8000"

const t = {
  en: {
    hold: "Hold to speak",
    speaking: "Speaking... release to stop",
    or: "or",
    placeholder: "Type here...",
    send: "Send",
    yourWords: "Your message",
    transcribing: "Transcribing...",
    recording: "Recording started...",
    micError: "Please allow microphone access",
    connError: "Connection error, please try again",
    transcriptError: "Transcription error, please try again",
  },
  kn: {
    hold: "ಹಿಡಿದು ಮಾತನಾಡಿ",
    speaking: "ಮಾತನಾಡಿ... ಬಿಡಲು ಬಟನ್ ಬಿಡಿ",
    or: "ಅಥವಾ",
    placeholder: "ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...",
    send: "ಕಳುಹಿಸಿ",
    yourWords: "ನಿಮ್ಮ ಮಾತು",
    transcribing: "ಧ್ವನಿ ಗುರುತಿಸಲಾಗುತ್ತಿದೆ...",
    recording: "ರೆಕಾರ್ಡಿಂಗ್ ಪ್ರಾರಂಭ...",
    micError: "ಮೈಕ್ ಅನುಮತಿ ನೀಡಿ",
    connError: "ಸಂಪರ್ಕ ದೋಷ",
    transcriptError: "ಟ್ರಾನ್ಸ್‌ಕ್ರಿಪ್ಟ್ ದೋಷ",
  },
  tulu: {
    hold: "ಪತ್ತಿ ಪಾತೆರ",
    speaking: "ಪಾತೆರೆ... ಬಿಡ್ಪಾವೊ",
    or: "ಅತ್ತಾಂಡ",
    placeholder: "ಇಲ್ಲಿ ಬರೆಯಿ...",
    send: "ಕಡಪಾವೊ",
    yourWords: "ನಿಕ್ಕ್ ಪಾತೆರ",
    transcribing: "ಕೇನೊಂದುಂಡು...",
    recording: "ರೆಕಾರ್ಡಿಂಗ್...",
    micError: "ಮೈಕ್ ಅನುಮತಿ ಕೊರಿ",
    connError: "ಸಂಪರ್ಕ ತೊಂದರೆ",
    transcriptError: "ದೋಷ ಆಂಡ್",
  },
  kod: {
    hold: "ಪಿಡಿಂಜ್ ಪೇಸ್",
    speaking: "ಪೇಸ್... ಬಿಡ್",
    or: "ಅತ್ವಾ",
    placeholder: "ಇಲ್ಲಿ ಬರಿ...",
    send: "ಕಳ್ಳು",
    yourWords: "ನಿನ್ನ ಮಾತ್",
    transcribing: "ಕೇಂಡ್ ಅಳಿಯೊಂಡ್...",
    recording: "ರೆಕಾರ್ಡ್...",
    micError: "ಮೈಕ್ ಅನುಮತಿ ಕೊಡ್",
    connError: "ಸಂಪರ್ಕ ತೊಂದ್ರೆ",
    transcriptError: "ತಪ್ಪು ಆಯ್ತ್",
  },
  kok: {
    hold: "ಧರ್ನ್ ಉಲಯ್",
    speaking: "ಉಲಯ್... ಸೊಡ್",
    or: "ವ್ಹಯ್",
    placeholder: "ಹಾಂಗಾ ಬರಯ್...",
    send: "ಧಾಡ್",
    yourWords: "ತುಮ್ಚೆ ಉತ್ರ್",
    transcribing: "ಐಕೊನ್ ಆಸಾ...",
    recording: "ರೆಕಾರ್ಡ್...",
    micError: "ಮೈಕ್ ಪರ್ವಾನಗಿ ದಿ",
    connError: "ಸಂಪರ್ಕ ಚೂಕ್",
    transcriptError: "ಚೂಕ್ ಜಾಲಿ",
  }
}

export default function VoiceCapture({
  language, transcript, setTranscript,
  setResponse, setLoading, loading, onNewResponse
}) {
  const [recording, setRecording] = useState(false)
  const [typedMessage, setTypedMessage] = useState("")
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const lang = t[language] || t.kn

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []
      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data)
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" })
        await transcribeAudio(blob)
        stream.getTracks().forEach(t => t.stop())
      }
      mediaRecorder.start()
      setRecording(true)
      toast(lang.recording)
    } catch {
      toast.error(lang.micError)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }

  const transcribeAudio = async (blob) => {
    const formData = new FormData()
    formData.append("audio", blob, "recording.wav")
    formData.append("language", language === "en" ? "en" : "kn")
    try {
      toast(lang.transcribing)
      const res = await axios.post(`${API_URL}/transcribe`, formData)
      setTranscript(res.data.transcript)
      await sendToGemma(res.data.transcript)
    } catch {
      toast.error(lang.transcriptError)
    }
  }

const sendToGemma = async (message) => {
  setLoading(true)
  setResponse(null)
  try {
    const res = await axios.post(`${API_URL}/chat`, { message, language })
    setResponse(res.data)
    if (onNewResponse) onNewResponse(message, res.data)
  } catch {
    toast.error(lang.connError)
  } finally {
    setLoading(false)
  }
}

  const handleTextSubmit = async () => {
    if (!typedMessage.trim()) return
    setTranscript(typedMessage)
    await sendToGemma(typedMessage)
    setTypedMessage("")
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: "20px",
      padding: "24px",
      border: "1px solid #eaecf0",
      marginBottom: "12px",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
      }}>
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          disabled={loading}
          style={{
            width: "76px",
            height: "76px",
            borderRadius: "50%",
            background: recording ? "#ef4444" : "#4361ee",
            border: "none",
            fontSize: "28px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: recording
              ? "0 0 0 10px rgba(239,68,68,0.15)"
              : "0 4px 16px rgba(67,97,238,0.35)",
            transition: "all 0.2s",
            opacity: loading ? 0.5 : 1,
          }}
        >
          {recording ? "⏹" : "🎤"}
        </button>
        <span style={{ fontSize: "12px", color: "#aaa" }}>
          {recording ? lang.speaking : lang.hold}
        </span>
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "0 0 16px",
      }}>
        <div style={{ flex: 1, height: "1px", background: "#eee" }} />
        <span style={{ fontSize: "11px", color: "#ccc" }}>{lang.or}</span>
        <div style={{ flex: 1, height: "1px", background: "#eee" }} />
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={typedMessage}
          onChange={e => setTypedMessage(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleTextSubmit()}
          placeholder={lang.placeholder}
          style={{
            flex: 1,
            padding: "11px 14px",
            borderRadius: "10px",
            border: "1.5px solid #e2e5eb",
            fontSize: "14px",
            outline: "none",
            transition: "border-color 0.15s",
          }}
          onFocus={e => e.target.style.borderColor = "#4361ee"}
          onBlur={e => e.target.style.borderColor = "#e2e5eb"}
        />
        <button
          onClick={handleTextSubmit}
          disabled={loading || !typedMessage.trim()}
          style={{
            padding: "11px 18px",
            background: "#4361ee",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "600",
            opacity: loading || !typedMessage.trim() ? 0.45 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {lang.send}
        </button>
      </div>

      {transcript && (
        <div style={{
          marginTop: "14px",
          background: "#f5f7ff",
          borderRadius: "10px",
          padding: "12px 14px",
          borderLeft: "3px solid #4361ee",
        }}>
          <p style={{
            fontSize: "10px",
            color: "#4361ee",
            fontWeight: "700",
            letterSpacing: "0.5px",
            marginBottom: "4px"
          }}>
            {lang.yourWords}
          </p>
          <p style={{ fontSize: "14px", color: "#1a1a2e", lineHeight: "1.5" }}>
            {transcript}
          </p>
        </div>
      )}
    </div>
  )
}