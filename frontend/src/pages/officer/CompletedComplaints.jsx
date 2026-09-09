import { Link } from 'react-router-dom';

function CompletedComplaints() {
  const complaints = [
    {
      id: 'CMP003',
      title: 'Garbage not collected',
      category: 'Sanitation',
      status: 'Resolved',
      resolvedDate: '05 Sep 2026',
    },
    {
      id: 'CMP006',
      title: 'Damaged street sign',
      category: 'Roads',
      status: 'Resolved',
      resolvedDate: '04 Sep 2026',
    },
  ];

  return (
    <div>
      <h1>Completed Complaints</h1>

      {complaints.length === 0 ? (
        <p>No completed complaints.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Resolved Date</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>
                  <Link to={`/officer/complaints/${complaint.id}`}>
                    {complaint.id}
                  </Link>
                </td>
                <td>{complaint.title}</td>
                <td>{complaint.category}</td>
                <td>{complaint.status}</td>
                <td>{complaint.resolvedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CompletedComplaints;