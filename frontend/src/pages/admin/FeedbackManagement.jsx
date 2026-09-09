import { useEffect, useState } from 'react';
import api from '../../services/api';

function FeedbackManagement() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await api.get('/feedback');

        setFeedback(response.data);
      } catch (error) {
        console.error(
          'Failed to fetch feedback:',
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
          'Failed to load feedback'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return <p>Loading feedback...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Feedback Management</h1>

      {feedback.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Citizen</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {feedback.map((item) => (
              <tr key={item._id}>
                <td>{item.complaintId}</td>

                <td>
                  {item.citizenId?.name || 'Unknown'}
                </td>

                <td>{item.rating}/5</td>

                <td>{item.comment || 'No comment'}</td>

                <td>
                  {item.createdAt
                    ? new Date(
                        item.createdAt
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

export default FeedbackManagement;