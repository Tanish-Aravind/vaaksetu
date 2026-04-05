import { useEffect, useState } from "react"
import axios from "axios"

const API_URL = "http://localhost:8000"

export default function SummaryPage({ messages, severity, language, onBack }) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const isEn = language === "en"

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.post(`${API_URL}/summarise`, {
          messages,
          severity
        })
        setSummary(res.data)
      } catch {
        setSummary(null)
      } finally {
        setLoading(false)
      }
    }
    fetchSummary()
  }, [])

  const severityColor = {
    low: "#16a34a",
    medium: "#d97706",
    high: "#dc2626"
  }[severity] || "#4361ee"

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0f2f5",
      padding: "0 16px 40px",
    }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "24px 0 20px",
        }}>
          <button
            onClick={onBack}
            style={{
              background: "#fff",
              border: "1.5px solid #e2e5eb",
              borderRadius: "10px",
              padding: "8px 14px",
              fontSize: "13px",
              color: "#555",
              cursor: "pointer",
            }}
          >
            ← {isEn ? "New Session" : "ಹೊಸ ಸೆಶನ್"}
          </button>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e" }}>
              {isEn ? "Session Summary" : "ಸೆಶನ್ ಸಾರಾಂಶ"}
            </h2>
            <p style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
              {isEn ? "For therapist review" : "ತಜ್ಞರ ಪರಿಶೀಲನೆಗಾಗಿ"}
            </p>
          </div>
        </div>

        {loading ? (
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "32px",
            textAlign: "center",
            color: "#888",
            fontSize: "14px",
            border: "1px solid #eaecf0",
          }}>
            {isEn ? "Generating summary..." : "ಸಾರಾಂಶ ತಯಾರಾಗುತ್ತಿದೆ..."}
          </div>
        ) : summary ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            <div style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "18px",
              border: "1px solid #eaecf0",
            }}>
              <p style={{ fontSize: "11px", fontWeight: "700", color: severityColor, marginBottom: "6px" }}>
                {isEn ? "SEVERITY" : "ತೀವ್ರತೆ"} — {severity.toUpperCase()}
              </p>
              <p style={{ fontSize: "14px", color: "#1a1a2e", lineHeight: "1.7" }}>
                {isEn ? summary.summary_english : summary.summary_kannada}
              </p>
            </div>

            {summary.key_concerns?.length > 0 && (
              <div style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "18px",
                border: "1px solid #eaecf0",
              }}>
                <p style={{ fontSize: "11px", fontWeight: "700", color: "#888", marginBottom: "10px" }}>
                  {isEn ? "KEY CONCERNS" : "ಮುಖ್ಯ ಸಮಸ್ಯೆಗಳು"}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {summary.key_concerns.map((c, i) => (
                    <span key={i} style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      background: "#f0f2f5",
                      fontSize: "12px",
                      color: "#444",
                    }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "18px",
              border: "1px solid #eaecf0",
            }}>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#888", marginBottom: "6px" }}>
                {isEn ? "EMOTIONAL STATE" : "ಭಾವನಾತ್ಮಕ ಸ್ಥಿತಿ"}
              </p>
              <p style={{ fontSize: "14px", color: "#1a1a2e" }}>
                {summary.emotional_state}
              </p>
            </div>

            <div style={{
              background: "#eef2ff",
              borderRadius: "16px",
              padding: "18px",
              border: "1px solid #c7d2fe",
            }}>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#4361ee", marginBottom: "6px" }}>
                {isEn ? "RECOMMENDED ACTION" : "ಶಿಫಾರಸು"}
              </p>
              <p style={{ fontSize: "14px", color: "#1a1a2e", lineHeight: "1.6" }}>
                {summary.recommended_action}
              </p>
            </div>

          </div>
        ) : (
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "32px",
            textAlign: "center",
            color: "#888",
            fontSize: "14px",
            border: "1px solid #eaecf0",
          }}>
            {isEn ? "Could not generate summary." : "ಸಾರಾಂಶ ತಯಾರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ."}
          </div>
        )}

      </div>
    </div>
  )
}