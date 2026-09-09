import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

function OfficerComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

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

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const updateStatus = async (action) => {
    try {
      setUpdating(true);
      setError('');

      const response = await api.patch(
        `/complaints/${id}/${action}`
      );

      setComplaint(response.data.complaint);
    } catch (error) {
      console.error(
        'Status update failed:',
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        'Failed to update complaint'
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p>Loading complaint...</p>;
  }

  if (error && !complaint) {
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

      {error && <p>{error}</p>}

      <h2>Update Status</h2>

      {complaint.status === 'Assigned' && (
        <button
          onClick={() => updateStatus('start')}
          disabled={updating}
        >
          {updating ? 'Updating...' : 'Start Complaint'}
        </button>
      )}

      {complaint.status === 'In Progress' && (
        <button
          onClick={() => updateStatus('resolve')}
          disabled={updating}
        >
          {updating ? 'Updating...' : 'Mark as Resolved'}
        </button>
      )}

      {complaint.status === 'Resolved' && (
        <p>Complaint resolved. Waiting for citizen closure.</p>
      )}
    </div>
  );
}

export default OfficerComplaintDetails;