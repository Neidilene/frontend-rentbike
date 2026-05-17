"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Bike {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
  emoji: string;
}

const BIKES: Bike[] = [
  { id: 1, nome: "City Cruiser X1", descricao: "Ideal para percursos urbanos. Confortável e fácil de manobrar.", preco: 2.00, disponivel: true, emoji: "🚲" },
  { id: 2, nome: "Mountain Pro 500", descricao: "Quadro em alumínio, 21 velocidades, travões de disco.", preco: 3.50, disponivel: true, emoji: "🚴" },
  { id: 3, nome: "E-Bike Urban", descricao: "Bicicleta elétrica para percursos longos sem esforço.", preco: 5.00, disponivel: false, emoji: "⚡" },
  { id: 4, nome: "Trail Blazer 200", descricao: "Leve e ágil, perfeita para trilhos e estradas de terra.", preco: 2.50, disponivel: true, emoji: "🚲" },
  { id: 5, nome: "Speed Rider X3", descricao: "Bicicleta de estrada rápida para percursos longos.", preco: 4.00, disponivel: true, emoji: "🚴" },
  { id: 6, nome: "E-Bike Mountain", descricao: "Elétrica todo-o-terreno para aventuras nas montanhas.", preco: 6.00, disponivel: false, emoji: "⚡" },
];

export default function BikesPage() {
  const router = useRouter();
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [filtered, setFiltered] = useState<Bike[]>(BIKES);

  const handleFilter = () => {
    // Por agora filtra apenas as disponíveis se datas preenchidas
    // Quando o backend estiver pronto, substituir por chamada à API
    if (dataInicio && dataFim) {
      setFiltered(BIKES.filter((b) => b.disponivel));
    } else {
      setFiltered(BIKES);
    }
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
          <span style={{ ...styles.navLink, ...styles.navLinkActive }}>Bicicletas</span>
          <span style={styles.navLink} onClick={() => router.push("/reservas")}>Reservas</span>
          <div style={styles.navAvatar}>
            <span style={{ fontSize: "16px" }}>👤</span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div style={styles.content}>

        {/* Header + Filtro */}
        <div style={styles.topBar}>
          <div>
            <h1 style={styles.pageTitle}>Bicicletas disponíveis</h1>
            <p style={styles.pageSub}>Escolhe a tua bicicleta e faz a tua reserva</p>
          </div>
          <div style={styles.filterRow}>
            <div style={styles.filterField}>
              <span style={styles.filterIcon}>📅</span>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                style={styles.dateInput}
              />
            </div>
            <div style={styles.filterField}>
              <span style={styles.filterIcon}>📅</span>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                style={styles.dateInput}
              />
            </div>
            <button style={styles.filterBtn} onClick={handleFilter}>
              Filtrar
            </button>
          </div>
        </div>

        {/* Grid de bicicletas */}
        <div style={styles.grid}>
          {filtered.map((bike) => (
            <div
              key={bike.id}
              style={{
                ...styles.card,
                opacity: bike.disponivel ? 1 : 0.72,
              }}
            >
              {/* Imagem */}
              <div style={{
                ...styles.cardImg,
                background: bike.disponivel ? "#e8f4fd" : "#f0f0f0",
              }}>
                <span style={{ fontSize: "52px" }}>{bike.emoji}</span>
              </div>

              {/* Info */}
              <div style={styles.cardBody}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardName}>{bike.nome}</span>
                  <span style={{
                    ...styles.badge,
                    background: bike.disponivel ? "#eaf3de" : "#fcebeb",
                    color: bike.disponivel ? "#3b6d11" : "#a32d2d",
                  }}>
                    {bike.disponivel ? "Disponível" : "Indisponível"}
                  </span>
                </div>

                <p style={styles.cardDesc}>{bike.descricao}</p>

                <div style={styles.cardFooter}>
                  <span style={styles.cardPrice}>
                    {bike.preco.toFixed(2)} €{" "}
                    <span style={styles.cardPriceSub}>/ hora</span>
                  </span>
                  <button
                    style={{
                      ...styles.reserveBtn,
                      background: bike.disponivel ? "#1a3a5c" : "#bbb",
                      cursor: bike.disponivel ? "pointer" : "default",
                    }}
                    disabled={!bike.disponivel}
                    onClick={() => bike.disponivel && router.push(`/bikes/${bike.id}`)}
                  >
                    {bike.disponivel ? "Reservar" : "Indisponível"}
                  </button>
                </div>
              </div>
            </div>
          ))}
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

  // Navbar
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
  },

  // Content
  content: {
    padding: "28px 32px",
  },

  // Top bar
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
    alignItems: "center",
  },
  filterField: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  filterIcon: {
    fontSize: "14px",
  },
  dateInput: {
    border: "none",
    outline: "none",
    fontSize: "12px",
    color: "#555",
    background: "transparent",
    fontFamily: "inherit",
  },
  filterBtn: {
    background: "#2e88d4",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    padding: "9px 20px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },

  // Card
  card: {
    background: "#ffffff",
    border: "0.5px solid #e0e0e0",
    borderRadius: "12px",
    overflow: "hidden",
  },
  cardImg: {
    height: "130px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    padding: "14px 16px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  cardName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1a1a1a",
  },
  badge: {
    fontSize: "10px",
    padding: "2px 8px",
    borderRadius: "10px",
    fontWeight: "500",
  },
  cardDesc: {
    fontSize: "12px",
    color: "#888",
    margin: "0 0 12px",
    lineHeight: 1.5,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardPrice: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#2e88d4",
  },
  cardPriceSub: {
    fontSize: "11px",
    fontWeight: "400",
    color: "#888",
  },
  reserveBtn: {
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "7px 16px",
    fontSize: "12px",
    fontFamily: "inherit",
  },
};