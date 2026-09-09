import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function AssignedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignedComplaints = async () => {
      try {
        const response = await api.get('/complaints/assigned');

        setComplaints(response.data);
      } catch (error) {
        console.error(
          'Failed to fetch assigned complaints:',
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
          'Failed to load assigned complaints'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedComplaints();
  }, []);

  if (loading) {
    return <p>Loading assigned complaints...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Assigned Complaints</h1>

      {complaints.length === 0 ? (
        <p>No complaints assigned.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>
                  <Link
                    to={`/officer/complaints/${complaint.complaintId}`}
                  >
                    {complaint.complaintId}
                  </Link>
                </td>

                <td>{complaint.title}</td>
                <td>{complaint.category}</td>
                <td>{complaint.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AssignedComplaints;