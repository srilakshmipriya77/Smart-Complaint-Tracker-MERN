import { useEffect, useState } from 'react';
import api from '../../services/api';

function ComplaintVerification() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComplaints = async () => {
    try {
      const response = await api.get('/complaints/admin/all');

      setComplaints(response.data);
    } catch (error) {
  console.error('FULL ERROR:', error);
  console.error('STATUS:', error.response?.status);
  console.error('DATA:', error.response?.data);

  setError(
    `${error.response?.status || 'Network'}: ${
      error.response?.data?.message || error.message
    }`
  );
} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const verifyComplaint = async (complaintId) => {
    try {
      await api.patch(
        `/complaints/${complaintId}/verify`
      );

      setComplaints((current) =>
        current.map((complaint) =>
          complaint.complaintId === complaintId
            ? { ...complaint, status: 'Verified' }
            : complaint
        )
      );
    } catch (error) {
  console.error('FULL ERROR:', error);
  console.error('STATUS:', error.response?.status);
  console.error('DATA:', error.response?.data);

  setError(
    `${error.response?.status || 'Network'}: ${
      error.response?.data?.message || error.message
    }`
  );
}
  };

  if (loading) {
    return <p>Loading complaints...</p>;
  }

  if (error && complaints.length === 0) {
    return <p>{error}</p>;
  }

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === 'Submitted'
  );

  return (
    <div>
      <h1>Complaint Verification</h1>

      {error && <p>{error}</p>}

      {pendingComplaints.length === 0 ? (
        <p>No complaints pending verification.</p>
      ) : (
        pendingComplaints.map((complaint) => (
          <div key={complaint._id}>
            <h2>{complaint.title}</h2>

            <p>
              <strong>Complaint ID:</strong>{' '}
              {complaint.complaintId}
            </p>

            <p>
              <strong>Category:</strong>{' '}
              {complaint.category}
            </p>

            <p>
              <strong>Description:</strong>{' '}
              {complaint.description}
            </p>

            <p>
              <strong>Address:</strong>{' '}
              {complaint.address}
            </p>

            <button
              onClick={() =>
                verifyComplaint(complaint.complaintId)
              }
            >
              Verify
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default ComplaintVerification;