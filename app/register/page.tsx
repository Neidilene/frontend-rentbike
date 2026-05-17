"use client";

import { useState } from "react";

interface FormState {
  nome: string;
  email: string;
  password: string;
  confirmar: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    nome: "",
    email: "",
    password: "",
    confirmar: "",
  });
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!form.nome || !form.email || !form.password || !form.confirmar) {
      setError("Por favor preenche todos os campos.");
      return;
    }
    if (form.password.length < 6) {
      setError("A palavra-passe deve ter pelo menos 6 caracteres.");
      return;
    }
    if (form.password !== form.confirmar) {
      setError("As palavras-passe não coincidem.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const passwordMismatch = form.confirmar.length > 0 && form.confirmar !== form.password;

  // ── Ecrã de sucesso ────────────────────────────────────────
  if (success) {
    return (
      <div style={styles.root}>
        <div style={styles.card}>
          <div style={styles.logoWrap}>
            <div style={styles.logoBox}>🚲</div>
            <span style={styles.logoText}>Rent-a-Bike</span>
          </div>
          <div style={styles.successBox}>
            <div style={styles.successIcon}>✓</div>
            <h2 style={styles.successTitle}>Conta criada!</h2>
            <p style={styles.successSub}>
              A tua conta foi criada com sucesso. Podes agora iniciar sessão.
            </p>
            <a href="/login" style={{ textDecoration: "none" }}>
              <button style={styles.submitBtn}>Ir para o Login</button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Formulário de registo ──────────────────────────────────
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
          <h1 style={styles.title}>Criar conta</h1>
          <p style={styles.sub}>Regista-te gratuitamente e começa a reservar</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Nome */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Nome completo</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>👤</span>
              <input
                type="text"
                placeholder="O teu nome"
                value={form.nome}
                onChange={handleChange("nome")}
                style={styles.input}
                autoComplete="name"
              />
            </div>
          </div>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>E-mail</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>✉</span>
              <input
                type="email"
                placeholder="exemplo@email.com"
                value={form.email}
                onChange={handleChange("email")}
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
                placeholder="Mínimo 6 caracteres"
                value={form.password}
                onChange={handleChange("password")}
                style={styles.input}
                autoComplete="new-password"
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

          {/* Confirmar Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Confirmar palavra-passe</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Repete a palavra-passe"
                value={form.confirmar}
                onChange={handleChange("confirmar")}
                style={{
                  ...styles.input,
                  borderColor: passwordMismatch ? "#f09595" : "#ddd",
                }}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={styles.eyeBtn}
              >
                {showConfirm ? "🙈" : "👁"}
              </button>
            </div>
            {passwordMismatch && (
              <span style={styles.fieldError}>As palavras-passe não coincidem</span>
            )}
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
            {loading ? "A criar conta..." : "Criar conta"}
          </button>
        </form>

        {/* Footer */}
        <p style={styles.footer}>
          Já tens conta?{" "}
          <a href="/login" style={styles.footerLink}>
            Iniciar sessão
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
    marginBottom: "24px",
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
    gap: "14px",
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
  fieldError: {
    fontSize: "11px",
    color: "#a32d2d",
    marginTop: "2px",
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
    cursor: "pointer",
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
  // Sucesso
  successBox: {
    textAlign: "center",
    padding: "10px 0",
  },
  successIcon: {
    width: "52px",
    height: "52px",
    background: "#eaf3de",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    color: "#3b6d11",
    margin: "0 auto 18px",
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: "8px",
  },
  successSub: {
    fontSize: "13px",
    color: "#888",
    lineHeight: 1.6,
    marginBottom: "24px",
  },
};