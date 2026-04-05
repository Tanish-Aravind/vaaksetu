const getSeverityConfig = (language) => ({
  low: {
    bg: "#f0fdf4",
    border: "#bbf7d0",
    titleColor: "#16a34a",
    label: language === "en" ? "Self Help" : "ಸ್ವಯಂ ಸಹಾಯ",
    action: language === "en"
      ? "Try breathing exercises. Write your feelings in a journal."
      : "ಉಸಿರಾಟದ ವ್ಯಾಯಾಮ ಮಾಡಿ. ನಿಮ್ಮ ಭಾವನೆಗಳನ್ನು ಡೈರಿಯಲ್ಲಿ ಬರೆಯಿರಿ.",
    btnColor: "#4361ee",
    btnLabel: language === "en" ? "Find a therapist →" : "ತಜ್ಞರನ್ನು ಹುಡುಕಿ →",
    showButton: true
  },
  medium: {
    bg: "#fffbeb",
    border: "#fde68a",
    titleColor: "#d97706",
    label: language === "en" ? "Seek Professional Help" : "ತಜ್ಞರ ಸಹಾಯ ಪಡೆಯಿರಿ",
    action: language === "en"
      ? "Consider speaking to a mental health professional near you."
      : "ಹತ್ತಿರದ ಮಾನಸಿಕ ಆರೋಗ್ಯ ತಜ್ಞರನ್ನು ಭೇಟಿ ಮಾಡಿ.",
    btnColor: "#d97706",
    btnLabel: language === "en" ? "Find a therapist →" : "ತಜ್ಞರನ್ನು ಹುಡುಕಿ →",
    showButton: true
  },
  high: {
    bg: "#fef2f2",
    border: "#fecaca",
    titleColor: "#dc2626",
    label: language === "en" ? "Urgent Help" : "ತುರ್ತು ಸಹಾಯ",
    action: "iCall: 9152987821  ·  Vandrevala: 1860-2662-345  ·  NIMHANS: 080-46110007",
    btnColor: "#dc2626",
    btnLabel: language === "en" ? "Call now →" : "ಈಗ ಕರೆ ಮಾಡಿ →",
    showButton: true
  }
})

export default function ChatBubble({ response, language, onFindTherapist }) {
  const severityConfig = getSeverityConfig(language)
  const config = severityConfig[response.severity] || severityConfig.low

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "20px",
        border: "1px solid #eaecf0",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
        }}>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#4361ee",
          }} />
          <span style={{ fontSize: "11px", color: "#aaa", fontWeight: "500" }}>
            {language === "en" ? "VaakSetu Response"
  : language === "tulu" ? "VaakSetu ಜವಾಬ್"
  : language === "kod" ? "VaakSetu ಉತ್ರ"
  : language === "kok" ? "VaakSetu ಜಾಪ್"
  : "VaakSetu ಪ್ರತಿಕ್ರಿಯೆ"}
          </span>
        </div>
        <p style={{
          fontSize: "15px",
          color: "#1a1a2e",
          lineHeight: "1.75",
        }}>
          {response.response}
        </p>
      </div>

      <div style={{
        background: config.bg,
        borderRadius: "14px",
        padding: "16px 18px",
        border: `1px solid ${config.border}`,
      }}>
        <p style={{
          fontSize: "12px",
          fontWeight: "700",
          color: config.titleColor,
          letterSpacing: "0.3px",
          marginBottom: "6px",
        }}>
          {config.label}
        </p>
        <p style={{
          fontSize: "13px",
          color: "#555",
          lineHeight: "1.6",
          marginBottom: "12px",
        }}>
          {config.action}
        </p>
        <button
          onClick={() => response.severity !== "high" && onFindTherapist()}
          style={{
            width: "100%",
            padding: "10px",
            background: config.btnColor,
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: response.severity === "high" ? "default" : "pointer",
          }}
        >
          {config.btnLabel}
        </button>
      </div>
    </div>
  )
}