"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor preenche todos os campos.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("Credenciais inválidas. Tenta novamente.");
    }, 1500);
  };

  return (
    <div style={styles.root}>
      <div style={styles.card}>

        {/* Logo */}
        <div style={styles.logoWrap}>
          <div style={styles.logoBox}>🚲</div>
          <span style={styles.logoText}>Rent-a-Bike</span>
        </div>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Bem-vindo de volta</h1>
          <p style={styles.sub}>Inicia sessão para gerir as tuas reservas</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>E-mail</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>✉</span>
              <input
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Palavra-passe</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={styles.eyeBtn}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={styles.errorBox}>⚠ {error}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.75 : 1,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>

        {/* Footer */}
        <p style={styles.footer}>
          Não tens conta?{" "}
          <a href="/register" style={styles.footerLink}>
            Regista-te
          </a>
        </p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    minHeight: "100vh",
    background: "#f4f2eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "40px 36px",
    boxShadow: "0 2px 24px rgba(0,0,0,0.08)",
    border: "0.5px solid #e0e0e0",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "28px",
  },
  logoBox: {
    width: "36px",
    height: "36px",
    background: "#1a3a5c",
    borderRadius: "9px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#1a3a5c",
    letterSpacing: "0.01em",
  },
  header: {
    textAlign: "center",
    marginBottom: "28px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: "6px",
  },
  sub: {
    fontSize: "13px",
    color: "#888",
    lineHeight: 1.5,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "12px",
    color: "#555",
    fontWeight: "500",
    letterSpacing: "0.02em",
  },
  inputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "12px",
    fontSize: "13px",
    color: "#bbb",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    background: "#f8f7f4",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "11px 40px 11px 36px",
    fontSize: "13px",
    color: "#1a1a1a",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  eyeBtn: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: "#bbb",
    padding: "4px",
    lineHeight: 1,
  },
  errorBox: {
    background: "#fcebeb",
    border: "1px solid #f09595",
    color: "#a32d2d",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "12px",
  },
  submitBtn: {
    width: "100%",
    background: "#1a3a5c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "14px",
    fontWeight: "500",
    marginTop: "4px",
    fontFamily: "inherit",
    letterSpacing: "0.02em",
  },
  footer: {
    textAlign: "center",
    fontSize: "13px",
    color: "#888",
    marginTop: "22px",
  },
  footerLink: {
    color: "#2e88d4",
    fontWeight: "500",
    textDecoration: "none",
  },
};