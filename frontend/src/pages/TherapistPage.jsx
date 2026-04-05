const therapists = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    kannada: "ಡಾ. ಪ್ರಿಯಾ ಶರ್ಮಾ",
    speciality: "Anxiety & Depression",
    languages: ["Kannada", "English", "Hindi"],
    location: "Bangalore, Karnataka",
    phone: "+91 98765 43210",
    experience: "8 years",
    available: true,
    initials: "PS",
    color: "#4361ee"
  },
  {
    id: 2,
    name: "Dr. Ramesh Bhat",
    kannada: "ಡಾ. ರಮೇಶ್ ಭಟ್",
    speciality: "Stress & Trauma",
    languages: ["Kannada", "Tulu", "English"],
    location: "Mangalore, Karnataka",
    phone: "+91 87654 32109",
    experience: "12 years",
    available: true,
    initials: "RB",
    color: "#0f6e56"
  },
  {
    id: 3,
    name: "Dr. Kavitha Nair",
    kannada: "ಡಾ. ಕವಿತಾ ನಾಯರ್",
    speciality: "Family & Relationships",
    languages: ["Kannada", "Konkani", "English"],
    location: "Mysore, Karnataka",
    phone: "+91 76543 21098",
    experience: "6 years",
    available: false,
    initials: "KN",
    color: "#993556"
  },
  {
    id: 4,
    name: "Dr. Suresh Kodava",
    kannada: "ಡಾ. ಸುರೇಶ್ ಕೊಡವ",
    speciality: "Depression & Grief",
    languages: ["Kannada", "Kodava", "English"],
    location: "Coorg, Karnataka",
    phone: "+91 65432 10987",
    experience: "10 years",
    available: true,
    initials: "SK",
    color: "#854f0b"
  },
  {
    id: 5,
    name: "Dr. Meera Rao",
    kannada: "ಡಾ. ಮೀರಾ ರಾವ್",
    speciality: "Youth & Student Stress",
    languages: ["Kannada", "English", "Telugu"],
    location: "Hubli, Karnataka",
    phone: "+91 54321 09876",
    experience: "5 years",
    available: true,
    initials: "MR",
    color: "#185fa5"
  },
  {
    id: 6,
    name: "Dr. Anand Kulkarni",
    kannada: "ಡಾ. ಆನಂದ್ ಕುಲಕರ್ಣಿ",
    speciality: "Workplace Stress & Burnout",
    languages: ["Kannada", "Marathi", "English"],
    location: "Belgaum, Karnataka",
    phone: "+91 43210 98765",
    experience: "9 years",
    available: true,
    initials: "AK",
    color: "#534ab7"
  }
]

const helplines = [
  { name: "iCall", number: "9152987821", desc: "Mon–Sat, 8am–10pm", color: "#4361ee" },
  { name: "Vandrevala Foundation", number: "1860-2662-345", desc: "24/7 helpline", color: "#0f6e56" },
  { name: "NIMHANS", number: "080-46110007", desc: "Bangalore based", color: "#854f0b" },
  { name: "Snehi", number: "044-24640050", desc: "Emotional support", color: "#993556" },
]

export default function TherapistPage({ onBack, language }) {
  const isEn = language === "en"

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0f2f5",
      padding: "0 16px 40px",
    }}>
      <div style={{
        maxWidth: "560px",
        margin: "0 auto",
      }}>

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
            ← {isEn ? "Back" : "ಹಿಂದೆ"}
          </button>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e" }}>
              {isEn ? "Find a Therapist" : "ತಜ್ಞರನ್ನು ಹುಡುಕಿ"}
            </h2>
            <p style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
              {isEn ? "Karnataka mental health professionals" : "ಕರ್ನಾಟಕದ ಮಾನಸಿಕ ಆರೋಗ್ಯ ತಜ್ಞರು"}
            </p>
          </div>
        </div>

        <div style={{
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: "14px",
          padding: "14px 16px",
          marginBottom: "16px",
        }}>
          <p style={{ fontSize: "12px", fontWeight: "700", color: "#dc2626", marginBottom: "8px" }}>
            {isEn ? "Emergency Helplines" : "ತುರ್ತು ಸಹಾಯ ಸಂಖ್ಯೆಗಳು"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {helplines.map(h => (
              <div key={h.name} style={{
                background: "#fff",
                borderRadius: "10px",
                padding: "10px 12px",
                border: "1px solid #fecaca",
              }}>
                <p style={{ fontSize: "11px", fontWeight: "700", color: h.color }}>{h.name}</p>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a2e", margin: "2px 0" }}>
                  {h.number}
                </p>
                <p style={{ fontSize: "11px", color: "#888" }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p style={{
          fontSize: "12px",
          color: "#888",
          marginBottom: "12px",
          fontWeight: "500"
        }}>
          {isEn ? "Available Therapists" : "ಲಭ್ಯವಿರುವ ತಜ್ಞರು"} ({therapists.filter(t => t.available).length} {isEn ? "online" : "ಆನ್‌ಲೈನ್"})
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {therapists.map(therapist => (
            <div key={therapist.id} style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "16px",
              border: "1px solid #eaecf0",
            }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: therapist.color + "20",
                  border: `2px solid ${therapist.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: therapist.color,
                  flexShrink: 0,
                }}>
                  {therapist.initials}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e" }}>
                        {therapist.name}
                      </p>
                      <p style={{ fontSize: "12px", color: "#888", marginTop: "1px" }}>
                        {therapist.kannada}
                      </p>
                    </div>
                    <span style={{
                      fontSize: "10px",
                      padding: "3px 8px",
                      borderRadius: "20px",
                      background: therapist.available ? "#f0fdf4" : "#f9fafb",
                      color: therapist.available ? "#16a34a" : "#aaa",
                      border: `1px solid ${therapist.available ? "#bbf7d0" : "#e5e7eb"}`,
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}>
                      {therapist.available
                        ? (isEn ? "Available" : "ಲಭ್ಯ")
                        : (isEn ? "Busy" : "ಬ್ಯುಸಿ")}
                    </span>
                  </div>

                  <p style={{
                    fontSize: "12px",
                    color: therapist.color,
                    fontWeight: "600",
                    margin: "6px 0 4px",
                  }}>
                    {therapist.speciality}
                  </p>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                    {therapist.languages.map(lang => (
                      <span key={lang} style={{
                        fontSize: "10px",
                        padding: "2px 8px",
                        borderRadius: "20px",
                        background: "#f0f2f5",
                        color: "#555",
                      }}>
                        {lang}
                      </span>
                    ))}
                  </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <div>
                      <p style={{ fontSize: "11px", color: "#888" }}>
                        {therapist.location} · {therapist.experience}
                      </p>
                      <p style={{ fontSize: "12px", color: "#4361ee", fontWeight: "600", marginTop: "2px" }}>
                        {therapist.phone}
                      </p>
                    </div>
                    <button
                      disabled={!therapist.available}
                      style={{
                        padding: "8px 16px",
                        background: therapist.available ? "#4361ee" : "#f0f2f5",
                        color: therapist.available ? "#fff" : "#aaa",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: therapist.available ? "pointer" : "not-allowed",
                      }}
                    >
                      {isEn ? "Contact" : "ಸಂಪರ್ಕಿಸಿ"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "16px",
          border: "1px solid #eaecf0",
          marginTop: "16px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "13px", color: "#888" }}>
            {isEn
              ? "This is a demo. In the full version, real verified therapists from Karnataka will be listed here."
              : "ಇದು ಡೆಮೋ ಆವೃತ್ತಿ. ಪೂರ್ಣ ಆವೃತ್ತಿಯಲ್ಲಿ ಕರ್ನಾಟಕದ ನಿಜವಾದ ತಜ್ಞರು ಇಲ್ಲಿ ಇರುತ್ತಾರೆ."}
          </p>
        </div>

      </div>
    </div>
  )
}