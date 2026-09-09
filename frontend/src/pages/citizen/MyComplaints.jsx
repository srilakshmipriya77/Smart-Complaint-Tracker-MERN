import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await api.get('/complaints');

        setComplaints(response.data);
      } catch (error) {
        console.error(
          'Failed to fetch complaints:',
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
          'Failed to load complaints'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <p>Loading complaints...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Complaints</h1>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>
                  <Link
                    to={`/citizen/complaints/${complaint.complaintId}`}
                  >
                    {complaint.complaintId}
                  </Link>
                </td>

                <td>{complaint.title}</td>
                <td>{complaint.category}</td>
                <td>{complaint.status}</td>

                <td>
                  {complaint.createdAt
                    ? new Date(
                        complaint.createdAt
                      ).toLocaleDateString()
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyComplaints;