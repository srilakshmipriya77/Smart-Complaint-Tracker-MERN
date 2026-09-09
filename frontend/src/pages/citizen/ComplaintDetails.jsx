import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

function ComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await api.get(`/complaints/${id}`);

        setComplaint(response.data);
      } catch (error) {
        console.error(
          'Failed to fetch complaint:',
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
          'Failed to load complaint'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  const closeComplaint = async () => {
    try {
      const response = await api.patch(
        `/complaints/${id}/close`
      );

      setComplaint(response.data.complaint);

      alert('Complaint closed successfully');
    } catch (error) {
      console.error(
        'Failed to close complaint:',
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        'Failed to close complaint'
      );
    }
  };

  if (loading) {
    return <p>Loading complaint...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!complaint) {
    return <p>Complaint not found.</p>;
  }

  return (
    <div>
      <h1>Complaint Details</h1>

      <p>
        <strong>Complaint ID:</strong>{' '}
        {complaint.complaintId}
      </p>

      <p>
        <strong>Title:</strong> {complaint.title}
      </p>

      <p>
        <strong>Category:</strong> {complaint.category}
      </p>

      <p>
        <strong>Description:</strong> {complaint.description}
      </p>

      <p>
        <strong>Address:</strong> {complaint.address}
      </p>

      <p>
        <strong>Status:</strong> {complaint.status}
      </p>

      {complaint.status === 'Resolved' && (
        <button onClick={closeComplaint}>
          Close Complaint
        </button>
      )}

      <p>
        <strong>Officer ID:</strong>{' '}
        {complaint.officerId || 'Not assigned'}
      </p>

      <p>
        <strong>Submitted:</strong>{' '}
        {complaint.createdAt
          ? new Date(complaint.createdAt).toLocaleString()
          : 'N/A'}
      </p>
    </div>
  );
}

export default ComplaintDetails;