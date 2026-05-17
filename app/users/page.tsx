
export default function UsersPage() {
  const users = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@email.com",
    },
    {
      id: 2,
      nome: "Maria Costa",
      email: "maria@email.com",
    },
    {
      id: 3,
      nome: "Carlos Lima",
      email: "carlos@email.com",
    },
  ];

  return (
    <div className="min-h-screen bg-[#efede7] p-6">
      <h1 className="text-2xl font-bold text-[#163252] mb-6">
        Utilizadores
      </h1>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="text-left px-4 py-3">Nome</th>
              <th className="text-left px-4 py-3">Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-4 font-medium">
                  {user.nome}
                </td>

                <td className="px-4 py-4 text-gray-600">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

