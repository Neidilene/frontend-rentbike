"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Estado = "ativa" | "concluida" | "cancelada";
type Filtro = "todas" | Estado;

interface Reserva {
  id: number;
  bike: string;
  emoji: string;
  inicio: string;
  fim: string;
  total: number;
  estado: Estado;
}

const RESERVAS: Reserva[] = [
  { id: 1, bike: "City Cruiser X1", emoji: "🚲", inicio: "2026-04-24T09:00", fim: "2026-04-24T12:00", total: 6.00, estado: "ativa" },
  { id: 2, bike: "Mountain Pro 500", emoji: "🚴", inicio: "2026-04-18T14:00", fim: "2026-04-18T17:00", total: 10.50, estado: "concluida" },
  { id: 3, bike: "E-Bike Urban", emoji: "⚡", inicio: "2026-04-10T10:00", fim: "2026-04-10T11:00", total: 5.00, estado: "cancelada" },
  { id: 4, bike: "Trail Blazer 200", emoji: "🚲", inicio: "2026-04-02T08:00", fim: "2026-04-02T10:00", total: 5.00, estado: "concluida" },
];

const FILTROS: { label: string; value: Filtro }[] = [
  { label: "Todas", value: "todas" },
  { label: "Ativas", value: "ativa" },
  { label: "Concluídas", value: "concluida" },
  { label: "Canceladas", value: "cancelada" },
];

const ESTADO_STYLE: Record<Estado, { background: string; color: string; label: string }> = {
  ativa: { background: "#eaf3de", color: "#3b6d11", label: "Ativa" },
  concluida: { background: "#e6f1fb", color: "#185fa5", label: "Concluída" },
  cancelada: { background: "#fcebeb", color: "#a32d2d", label: "Cancelada" },
};

function formatDate(dt: string): string {
  const d = new Date(dt);
  return d.toLocaleString("pt-PT", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function ReservasPage() {
  const router = useRouter();
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [reservas, setReservas] = useState<Reserva[]>(RESERVAS);
  const [cancelando, setCancelando] = useState<number | null>(null);

  const filtered = filtro === "todas"
    ? reservas
    : reservas.filter((r) => r.estado === filtro);

  const handleCancelar = (id: number) => {
    setCancelando(id);
    setTimeout(() => {
      setReservas((prev) =>
        prev.map((r) => r.id === id ? { ...r, estado: "cancelada" } : r)
      );
      setCancelando(null);
    }, 1000);
  };

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
          <span style={styles.navLink} onClick={() => router.push("/bikes")}>Bicicletas</span>
          <span style={{ ...styles.navLink, ...styles.navLinkActive }}>Reservas</span>
          <div style={styles.navAvatar}>👤</div>
        </div>
      </nav>

      <div style={styles.content}>

        {/* Header */}
        <div style={styles.topBar}>
          <div>
            <h1 style={styles.pageTitle}>As minhas reservas</h1>
            <p style={styles.pageSub}>Consulta e gere as tuas reservas</p>
          </div>

          {/* Filtros */}
          <div style={styles.filterRow}>
            {FILTROS.map((f) => (
              <button
                key={f.value}
                style={{
                  ...styles.filterBtn,
                  background: filtro === f.value ? "#1a3a5c" : "#fff",
                  color: filtro === f.value ? "#fff" : "#888",
                  borderColor: filtro === f.value ? "#1a3a5c" : "#ddd",
                }}
                onClick={() => setFiltro(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de reservas */}
        {filtered.length === 0 ? (
          <div style={styles.emptyBox}>
            <span style={{ fontSize: "32px", marginBottom: "12px" }}>📋</span>
            <p style={styles.emptyText}>Não tens reservas nesta categoria.</p>
            <button style={styles.newReservaBtn} onClick={() => router.push("/bikes")}>
              Ver bicicletas disponíveis
            </button>
          </div>
        ) : (
          <div style={styles.list}>
            {filtered.map((reserva) => {
              const estadoStyle = ESTADO_STYLE[reserva.estado];
              const isCancelando = cancelando === reserva.id;

              return (
                <div key={reserva.id} style={styles.card}>
                  {/* Ícone */}
                  <div style={{
                    ...styles.cardIcon,
                    background: reserva.estado === "cancelada" ? "#f0f0f0" : "#e8f4fd",
                  }}>
                    <span style={{ fontSize: "26px" }}>{reserva.emoji}</span>
                  </div>

                  {/* Info */}
                  <div style={styles.cardInfo}>
                    <div style={styles.cardName}>{reserva.bike}</div>
                    <div style={styles.cardDate}>
                      {formatDate(reserva.inicio)} → {new Date(reserva.fim).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}
                      {" · "}
                      <strong style={{ color: "#1a1a1a" }}>{reserva.total.toFixed(2)} €</strong>
                    </div>
                  </div>

                  {/* Badge estado */}
                  <span style={{
                    ...styles.badge,
                    background: estadoStyle.background,
                    color: estadoStyle.color,
                  }}>
                    {estadoStyle.label}
                  </span>

                  {/* Botão cancelar — só para reservas ativas */}
                  {reserva.estado === "ativa" && (
                    <button
                      style={{
                        ...styles.cancelBtn,
                        opacity: isCancelando ? 0.65 : 1,
                        cursor: isCancelando ? "wait" : "pointer",
                      }}
                      onClick={() => handleCancelar(reserva.id)}
                      disabled={isCancelando}
                    >
                      {isCancelando ? "A cancelar..." : "Cancelar"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
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
    padding: "28px 32px",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px",
  },
  pageTitle: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#1a1a1a",
    margin: "0 0 4px",
  },
  pageSub: {
    fontSize: "13px",
    color: "#888",
    margin: 0,
  },
  filterRow: {
    display: "flex",
    gap: "8px",
  },
  filterBtn: {
    border: "1px solid",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: "500",
    transition: "all 0.15s",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    background: "#fff",
    border: "0.5px solid #e0e0e0",
    borderRadius: "12px",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  cardIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: "4px",
  },
  cardDate: {
    fontSize: "12px",
    color: "#888",
  },
  badge: {
    fontSize: "11px",
    padding: "4px 12px",
    borderRadius: "12px",
    fontWeight: "500",
    whiteSpace: "nowrap",
  },
  cancelBtn: {
    background: "none",
    border: "1px solid #f09595",
    color: "#a32d2d",
    borderRadius: "7px",
    padding: "7px 14px",
    fontSize: "12px",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
  emptyBox: {
    background: "#fff",
    border: "0.5px solid #e0e0e0",
    borderRadius: "12px",
    padding: "48px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  emptyText: {
    fontSize: "14px",
    color: "#888",
    margin: "0 0 20px",
  },
  newReservaBtn: {
    background: "#1a3a5c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 24px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};