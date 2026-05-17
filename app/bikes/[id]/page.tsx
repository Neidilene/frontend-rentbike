"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

interface Bike {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
  emoji: string;
  velocidades: number;
  peso: string;
  travoes: string;
}

const BIKES: Bike[] = [
  { id: 1, nome: "City Cruiser X1", descricao: "Ideal para percursos urbanos. Confortável e fácil de manobrar nas ruas da cidade.", preco: 2.00, disponivel: true, emoji: "🚲", velocidades: 7, peso: "10 kg", travoes: "V-Brake" },
  { id: 2, nome: "Mountain Pro 500", descricao: "Bicicleta de montanha ideal para percursos longos e terrenos irregulares. Quadro em alumínio leve e resistente, sistema de 21 velocidades para adaptação a qualquer inclinação e travões de disco para maior segurança e controlo.", preco: 3.50, disponivel: true, emoji: "🚴", velocidades: 21, peso: "12 kg", travoes: "Disco" },
  { id: 3, nome: "E-Bike Urban", descricao: "Bicicleta elétrica para percursos longos sem esforço. Autonomia de até 80km.", preco: 5.00, disponivel: false, emoji: "⚡", velocidades: 7, peso: "22 kg", travoes: "Disco" },
  { id: 4, nome: "Trail Blazer 200", descricao: "Leve e ágil, perfeita para trilhos e estradas de terra batida.", preco: 2.50, disponivel: true, emoji: "🚲", velocidades: 18, peso: "11 kg", travoes: "V-Brake" },
  { id: 5, nome: "Speed Rider X3", descricao: "Bicicleta de estrada rápida para percursos longos com máxima eficiência.", preco: 4.00, disponivel: true, emoji: "🚴", velocidades: 24, peso: "9 kg", travoes: "Disco" },
  { id: 6, nome: "E-Bike Mountain", descricao: "Elétrica todo-o-terreno para aventuras nas montanhas. Potência e autonomia.", preco: 6.00, disponivel: false, emoji: "⚡", velocidades: 12, peso: "25 kg", travoes: "Disco Hidráulico" },
];

interface Props {
  params: Promise<{ id: string }>;
}

export default function BikeDetailPage({ params }: Props) {
  const router = useRouter();

  // Next.js 16 — params é uma Promise, usa React.use() para desembrulhar
  const { id } = use(params);
  const bike = BIKES.find((b) => b.id === Number(id));

  const [inicio, setInicio] = useState<string>("");
  const [fim, setFim] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  if (!bike) {
    return (
      <div style={styles.root}>
        <div style={styles.notFound}>
          <h2 style={{ fontSize: "20px", color: "#1a1a1a", marginBottom: "8px" }}>Bicicleta não encontrada</h2>
          <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>A bicicleta que procuras não existe.</p>
          <button style={styles.backBtn} onClick={() => router.push("/bikes")}>
            ← Voltar às bicicletas
          </button>
        </div>
      </div>
    );
  }

  const calcDuracao = (): number => {
    if (!inicio || !fim) return 0;
    const diff = new Date(fim).getTime() - new Date(inicio).getTime();
    return Math.max(0, Math.round(diff / 3600000));
  };

  const duracao = calcDuracao();
  const total = (duracao * bike.preco).toFixed(2);

  const handleReserva = () => {
    setError("");
    if (!inicio || !fim) {
      setError("Por favor preenche as datas de início e fim.");
      return;
    }
    if (new Date(fim) <= new Date(inicio)) {
      setError("A data de fim deve ser posterior à data de início.");
      return;
    }
    if (duracao < 1) {
      setError("A reserva deve ter no mínimo 1 hora.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div style={styles.root}>
        <nav style={styles.navbar}>
          <div style={styles.navLogo} onClick={() => router.push("/")}>
            <div style={styles.navLogoBox}>🚲</div>
            <span style={styles.navLogoText}>Rent-a-Bike</span>
          </div>
        </nav>
        <div style={styles.notFound}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={{ fontSize: "20px", color: "#1a1a1a", marginBottom: "8px" }}>Reserva confirmada!</h2>
          <p style={{ fontSize: "13px", color: "#888", marginBottom: "6px" }}>
            <strong>{bike.nome}</strong> reservada com sucesso.
          </p>
          <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>
            Total: <strong style={{ color: "#2e88d4" }}>{total} €</strong>
          </p>
          <button style={styles.reserveBtn} onClick={() => router.push("/reservas")}>
            Ver as minhas reservas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.root}>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navLogo} onClick={() => router.push("/")}>
          <div style={styles.navLogoBox}>🚲</div>
          <span style={styles.navLogoText}>Rent-a-Bike</span>
        </div>
        <div style={styles.navLinks}>
          <span style={styles.navLink} onClick={() => router.push("/")}>Início</span>
          <span style={{ ...styles.navLink, ...styles.navLinkActive }} onClick={() => router.push("/bikes")}>Bicicletas</span>
          <span style={styles.navLink} onClick={() => router.push("/reservas")}>Reservas</span>
          <div style={styles.navAvatar}>👤</div>
        </div>
      </nav>

      <div style={styles.content}>

        {/* Voltar */}
        <button style={styles.backBtn} onClick={() => router.push("/bikes")}>
          ← Voltar às bicicletas
        </button>

        {/* Layout principal */}
        <div style={styles.layout}>

          {/* Coluna esquerda */}
          <div style={styles.leftCol}>
            <div style={{
              ...styles.bikeImg,
              background: bike.disponivel ? "#e8f4fd" : "#f0f0f0",
            }}>
              <span style={{ fontSize: "100px" }}>{bike.emoji}</span>
            </div>

            <div style={styles.detailCard}>
              <div style={styles.detailHeader}>
                <h1 style={styles.bikeName}>{bike.nome}</h1>
                <span style={{
                  ...styles.badge,
                  background: bike.disponivel ? "#eaf3de" : "#fcebeb",
                  color: bike.disponivel ? "#3b6d11" : "#a32d2d",
                }}>
                  {bike.disponivel ? "Disponível" : "Indisponível"}
                </span>
              </div>

              <p style={styles.bikePrice}>
                {bike.preco.toFixed(2)} €{" "}
                <span style={styles.bikePriceSub}>/ hora</span>
              </p>

              <p style={styles.bikeDesc}>{bike.descricao}</p>

              <div style={styles.specsGrid}>
                <div style={styles.specItem}>
                  <span style={styles.specIcon}>⚙️</span>
                  <span style={styles.specLabel}>Velocidades</span>
                  <span style={styles.specVal}>{bike.velocidades}</span>
                </div>
                <div style={styles.specItem}>
                  <span style={styles.specIcon}>🏋️</span>
                  <span style={styles.specLabel}>Peso</span>
                  <span style={styles.specVal}>{bike.peso}</span>
                </div>
                <div style={styles.specItem}>
                  <span style={styles.specIcon}>🛞</span>
                  <span style={styles.specLabel}>Travões</span>
                  <span style={styles.specVal}>{bike.travoes}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna direita — reserva */}
          <div style={styles.reservaCard}>
            <h3 style={styles.reservaTitle}>Fazer reserva</h3>

            <div style={styles.form}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Data e hora de início</label>
                <input
                  type="datetime-local"
                  value={inicio}
                  onChange={(e) => { setInicio(e.target.value); setError(""); }}
                  style={styles.input}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Data e hora de fim</label>
                <input
                  type="datetime-local"
                  value={fim}
                  onChange={(e) => { setFim(e.target.value); setError(""); }}
                  style={styles.input}
                />
              </div>

              {duracao > 0 && (
                <div style={styles.summary}>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Duração estimada</span>
                    <span style={styles.summaryVal}>{duracao} hora{duracao !== 1 ? "s" : ""}</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Preço por hora</span>
                    <span style={styles.summaryVal}>{bike.preco.toFixed(2)} €</span>
                  </div>
                  <div style={styles.summaryDivider} />
                  <div style={styles.summaryRow}>
                    <span style={{ ...styles.summaryLabel, fontWeight: "500", color: "#1a1a1a" }}>Total estimado</span>
                    <span style={{ ...styles.summaryVal, color: "#2e88d4", fontWeight: "500", fontSize: "15px" }}>{total} €</span>
                  </div>
                </div>
              )}

              {error && (
                <div style={styles.errorBox}>⚠ {error}</div>
              )}

              <button
                style={{
                  ...styles.reserveBtn,
                  opacity: loading || !bike.disponivel ? 0.75 : 1,
                  cursor: loading || !bike.disponivel ? "not-allowed" : "pointer",
                  background: bike.disponivel ? "#1a3a5c" : "#bbb",
                }}
                onClick={handleReserva}
                disabled={loading || !bike.disponivel}
              >
                {loading ? "A confirmar..." : bike.disponivel ? "Confirmar reserva" : "Indisponível"}
              </button>

              <p style={styles.reservaNote}>
                Podes cancelar a reserva até ao início do período.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    minHeight: "100vh",
    background: "#f4f2eb",
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  navbar: {
    background: "#1a3a5c",
    padding: "0 32px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  navLogoBox: {
    width: "30px",
    height: "30px",
    background: "#2e88d4",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  navLogoText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#fff",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
  },
  navLink: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.65)",
    cursor: "pointer",
  },
  navLinkActive: {
    color: "#fff",
    fontWeight: "500",
    borderBottom: "2px solid #2e88d4",
    paddingBottom: "2px",
  },
  navAvatar: {
    width: "32px",
    height: "32px",
    background: "#2e88d4",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "16px",
  },
  content: {
    padding: "24px 32px",
  },
  backBtn: {
    background: "none",
    border: "none",
    fontSize: "13px",
    color: "#888",
    cursor: "pointer",
    marginBottom: "20px",
    padding: 0,
    fontFamily: "inherit",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: "24px",
    alignItems: "start",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  bikeImg: {
    borderRadius: "12px",
    height: "260px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  detailCard: {
    background: "#fff",
    border: "0.5px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px 24px",
  },
  detailHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  bikeName: {
    fontSize: "22px",
    fontWeight: "500",
    color: "#1a1a1a",
    margin: 0,
  },
  badge: {
    fontSize: "11px",
    padding: "3px 10px",
    borderRadius: "12px",
    fontWeight: "500",
  },
  bikePrice: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#2e88d4",
    margin: "0 0 12px",
  },
  bikePriceSub: {
    fontSize: "13px",
    fontWeight: "400",
    color: "#888",
  },
  bikeDesc: {
    fontSize: "13px",
    color: "#666",
    lineHeight: 1.7,
    margin: "0 0 18px",
  },
  specsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },
  specItem: {
    background: "#f8f7f4",
    borderRadius: "8px",
    padding: "12px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  specIcon: { fontSize: "18px" },
  specLabel: { fontSize: "11px", color: "#888" },
  specVal: { fontSize: "13px", fontWeight: "500", color: "#1a1a1a" },
  reservaCard: {
    background: "#fff",
    border: "0.5px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px 22px",
  },
  reservaTitle: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#1a1a1a",
    margin: "0 0 18px",
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
  },
  input: {
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "12px",
    outline: "none",
    boxSizing: "border-box",
    background: "#f8f7f4",
    fontFamily: "inherit",
  },
  summary: {
    background: "#f8f7f4",
    borderRadius: "8px",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: "12px",
    color: "#888",
  },
  summaryVal: {
    fontSize: "13px",
    color: "#1a1a1a",
  },
  summaryDivider: {
    height: "0.5px",
    background: "#e0e0e0",
    margin: "4px 0",
  },
  errorBox: {
    background: "#fcebeb",
    border: "1px solid #f09595",
    color: "#a32d2d",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "12px",
  },
  reserveBtn: {
    width: "100%",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "inherit",
    marginTop: "4px",
  },
  reservaNote: {
    fontSize: "11px",
    color: "#aaa",
    textAlign: "center",
    margin: 0,
    lineHeight: 1.5,
  },
  notFound: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    textAlign: "center",
    padding: "40px",
  },
  successIcon: {
    width: "56px",
    height: "56px",
    background: "#eaf3de",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    color: "#3b6d11",
    margin: "0 auto 18px",
    fontWeight: "bold",
  },
};