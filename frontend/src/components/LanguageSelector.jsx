const languages = [
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "en", label: "English" },
  { code: "tulu", label: "ತುಳು" },
  { code: "kod", label: "ಕೊಡವ" },
  { code: "kok", label: "ಕೊಂಕಣಿ" },
]

export default function LanguageSelector({ language, setLanguage }) {
  return (
    <div style={{
      display: "flex",
      gap: "8px",
      marginBottom: "16px",
      overflowX: "auto",
      paddingBottom: "4px",
    }}>
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          style={{
            padding: "7px 16px",
            borderRadius: "20px",
            border: language === lang.code
              ? "1.5px solid #4361ee"
              : "1.5px solid #e2e5eb",
            background: language === lang.code ? "#eef2ff" : "#fff",
            color: language === lang.code ? "#4361ee" : "#666",
            fontWeight: language === lang.code ? "600" : "400",
            fontSize: "13px",
            whiteSpace: "nowrap",
            transition: "all 0.15s",
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}