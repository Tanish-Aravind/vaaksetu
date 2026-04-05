import { useState } from "react"
import LanguageSelector from "./components/LanguageSelector"
import VoiceCapture from "./components/VoiceCapture"
import ChatBubble from "./components/ChatBubble"
import TherapistPage from "./pages/TherapistPage"
import SummaryPage from "./pages/SummaryPage"
import { Toaster } from "react-hot-toast"

function App() {
  const [language, setLanguage] = useState("kn")
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState("home")
  const [messages, setMessages] = useState([])
  const [severity, setSeverity] = useState("low")

  const handleNewResponse = (userMessage, botResponse) => {
    setMessages(prev => [
      ...prev,
      { role: "user", content: userMessage },
      { role: "assistant", content: botResponse.response }
    ])
    setSeverity(botResponse.severity)
    setResponse(botResponse)
  }

  const handleEndSession = async () => {
    if (messages.length === 0) return
    setPage("summary")
  }

  if (page === "therapists") {
    return <TherapistPage onBack={() => setPage("home")} language={language} />
  }

  if (page === "summary") {
    return (
      <SummaryPage
        messages={messages}
        severity={severity}
        language={language}
        onBack={() => {
          setPage("home")
          setMessages([])
          setTranscript("")
          setResponse(null)
        }}
      />
    )
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0f2f5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 16px 40px",
    }}>
      <Toaster position="top-center" toastOptions={{
        style: { fontSize: "13px", borderRadius: "10px" }
      }} />

      <div style={{
        width: "100%",
        maxWidth: "560px",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ textAlign: "center", padding: "28px 0 20px" }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "700",
            letterSpacing: "-0.5px",
            color: "#1a1a2e"
          }}>
            Vaak<span style={{ color: "#4361ee" }}>Setu</span>
          </h1>
          <p style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>
            {language === "en"
              ? "Voice Bridge — Mental Health Assistant"
              : "ವಾಕ್ ಸೇತು — ಮಾನಸಿಕ ಆರೋಗ್ಯ ಸಹಾಯಕ"}
          </p>
        </div>

        <LanguageSelector language={language} setLanguage={setLanguage} />

        <VoiceCapture
          language={language}
          transcript={transcript}
          setTranscript={setTranscript}
          setResponse={setResponse}
          setLoading={setLoading}
          loading={loading}
          onNewResponse={handleNewResponse}
        />

        {loading && (
          <div style={{ textAlign: "center", padding: "16px", color: "#888", fontSize: "13px" }}>
            {language === "en" ? "Preparing response..." : "ಪ್ರತಿಕ್ರಿಯೆ ತಯಾರಾಗುತ್ತಿದೆ..."}
          </div>
        )}

        {response && !loading && (
          <ChatBubble
            response={response}
            language={language}
            onFindTherapist={() => setPage("therapists")}
          />
        )}

        {messages.length >= 2 && (
          <button
            onClick={handleEndSession}
            style={{
              marginTop: "16px",
              width: "100%",
              padding: "12px",
              background: "#1a1a2e",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {language === "en" ? "End Session & View Summary" : "ಸೆಶನ್ ಮುಗಿಸಿ — ಸಾರಾಂಶ ನೋಡಿ"}
          </button>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}

export default App