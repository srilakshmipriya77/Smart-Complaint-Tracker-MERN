function CitizenManagement() {
  const citizens = [
    {
      id: 'CIT001',
      name: 'Rahul',
      email: 'rahul@example.com',
      status: 'Active',
    },
    {
      id: 'CIT002',
      name: 'Priya',
      email: 'priya@example.com',
      status: 'Active',
    },
  ];

  return (
    <div>
      <h1>Citizen Management</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Citizen ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {citizens.map((citizen) => (
            <tr key={citizen.id}>
              <td>{citizen.id}</td>
              <td>{citizen.name}</td>
              <td>{citizen.email}</td>
              <td>{citizen.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CitizenManagement;