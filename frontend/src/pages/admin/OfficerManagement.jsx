function OfficerManagement() {
  const officers = [
    {
      id: 'OFF001',
      name: 'Raj Kumar',
      department: 'Electrical',
      status: 'Active',
    },
    {
      id: 'OFF002',
      name: 'Anil Sharma',
      department: 'Plumbing',
      status: 'Active',
    },
  ];

  return (
    <div>
      <h1>Officer Management</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Officer ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {officers.map((officer) => (
            <tr key={officer.id}>
              <td>{officer.id}</td>
              <td>{officer.name}</td>
              <td>{officer.department}</td>
              <td>{officer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OfficerManagement;