
"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminPage() {
  const [bicicletas, setBicicletas] = useState([
    {
      id: 1,
      nome: "🚴 City Cruiser X1",
      preco: "2,00 €",
      estado: "Disponível",
    },
    {
      id: 2,
      nome: "🚵 Mountain Pro 500",
      preco: "3,50 €",
      estado: "Disponível",
    },
    {
      id: 3,
      nome: "⚡ E-Bike Urban",
      preco: "5,00 €",
      estado: "Indisponível",
    },
  ]);

  const removerBike = (id: number) => {
    setBicicletas(
      bicicletas.filter((bike) => bike.id !== id)
    );
  };

  const alterarEstado = (id: number) => {
    setBicicletas(
      bicicletas.map((bike) =>
        bike.id === id
          ? {
              ...bike,
              estado:
                bike.estado === "Disponível"
                  ? "Indisponível"
                  : "Disponível",
            }
          : bike
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#efede7] flex text-sm">
      {/* Sidebar */}
      <aside className="w-52 bg-[#163252] text-white flex flex-col">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="bg-[#2d7dd2] w-8 h-8 rounded-lg flex items-center justify-center">
            🚲
          </div>

          <div>
            <h1 className="text-lg font-bold">
              Rent-a-Bike
            </h1>

            <span className="bg-yellow-400 text-black text-[10px] px-2 py-1 rounded-full font-semibold">
              Admin
            </span>
          </div>
        </div>

        <nav className="mt-6 flex flex-col gap-1 px-2">
          <Link
            href="/admin"
            className="bg-white/10 rounded-lg px-3 py-2.5 text-left font-medium hover:bg-white/20 transition block"
          >
            🚲 Bicicletas
          </Link>

          <Link
            href="/reservas"
            className="rounded-lg px-3 py-2.5 text-left font-medium hover:bg-white/10 transition block"
          >
            📋 Reservas
          </Link>

          <Link
            href="/users"
            className="rounded-lg px-3 py-2.5 text-left font-medium hover:bg-white/10 transition block"
          >
            👥 Utilizadores
          </Link>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-5">
        {/* Topbar */}
        <div className="flex justify-end items-center mb-6">
          <Link
            href="/"
            className="text-[#163252] font-semibold hover:underline"
          >
            Ver site
          </Link>

          <div className="ml-5 w-9 h-9 rounded-full bg-[#2d7dd2] flex items-center justify-center text-white shadow">
            👤
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <p className="text-gray-500 text-sm">
              Total bicicletas
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {bicicletas.length}
            </h2>

            <p className="text-green-600 mt-2 text-sm font-medium">
              {
                bicicletas.filter(
                  (b) => b.estado === "Disponível"
                ).length
              }{" "}
              disponíveis
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <p className="text-gray-500 text-sm">
              Reservas ativas
            </p>

            <h2 className="text-3xl font-bold mt-2">
              1
            </h2>

            <p className="text-blue-600 mt-2 text-sm font-medium">
              Em curso
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <p className="text-gray-500 text-sm">
              Utilizadores
            </p>

            <h2 className="text-3xl font-bold mt-2">
              34
            </h2>

            <p className="text-green-600 mt-2 text-sm font-medium">
              +3 este mês
            </p>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-xl font-bold text-[#163252]">
              Frota de bicicletas
            </h2>

            <button
              onClick={() =>
                alert(
                  "Funcionalidade de adicionar bicicleta em desenvolvimento."
                )
              }
              className="bg-[#2d7dd2] hover:bg-[#2569b3] transition text-white px-4 py-2 text-sm rounded-xl font-semibold shadow-sm"
            >
              + Adicionar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="text-left px-4 py-3">
                    Nome
                  </th>

                  <th className="text-left px-4 py-3">
                    Preço/hora
                  </th>

                  <th className="text-left px-4 py-3">
                    Estado
                  </th>

                  <th className="text-left px-4 py-3">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {bicicletas.map((bike) => (
                  <tr
                    key={bike.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-4 font-semibold text-[#163252]">
                      {bike.nome}
                    </td>

                    <td className="px-4 py-4 text-gray-700">
                      {bike.preco}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          bike.estado === "Disponível"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {bike.estado}
                      </span>
                    </td>

                    <td className="px-4 py-4 flex gap-2">
                      <button
                        onClick={() =>
                          alterarEstado(bike.id)
                        }
                        className="border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded-lg text-xs font-medium transition"
                      >
                        Alterar estado
                      </button>

                      <button
                        onClick={() =>
                          removerBike(bike.id)
                        }
                        className="border border-red-300 text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-xs font-medium transition"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

