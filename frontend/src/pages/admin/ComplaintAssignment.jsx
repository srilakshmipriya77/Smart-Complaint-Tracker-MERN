import { useEffect, useState } from 'react';
import api from '../../services/api';

function Assignment() {
  const [complaints, setComplaints] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [complaintsResponse, officersResponse] =
        await Promise.all([
          api.get('/complaints/admin/all'),
          api.get('/users/officers')
        ]);

      setComplaints(complaintsResponse.data);
      setOfficers(officersResponse.data);
    } catch (error) {
      console.error(
        'Failed to load assignment data:',
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        'Failed to load assignment data'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async (complaintId) => {
    const officerId = selectedOfficer[complaintId];

    if (!officerId) {
      alert('Please select an officer');
      return;
    }

    try {
      await api.patch(
        `/complaints/${complaintId}/assign`,
        { officerId }
      );

      setComplaints((current) =>
        current.map((complaint) =>
          complaint.complaintId === complaintId
            ? {
                ...complaint,
                status: 'Assigned',
                officerId
              }
            : complaint
        )
      );

      alert('Complaint assigned successfully');
    } catch (error) {
      console.error(
        'Assignment failed:',
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        'Failed to assign complaint'
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const verifiedComplaints = complaints.filter(
    (complaint) => complaint.status === 'Verified'
  );

  return (
    <div>
      <h1>Complaint Assignment</h1>

      {verifiedComplaints.length === 0 ? (
        <p>No verified complaints ready for assignment.</p>
      ) : (
        verifiedComplaints.map((complaint) => (
          <div key={complaint._id}>
            <h2>{complaint.title}</h2>

            <p>
              <strong>ID:</strong> {complaint.complaintId}
            </p>

            <select
              value={selectedOfficer[complaint.complaintId] || ''}
              onChange={(event) =>
                setSelectedOfficer({
                  ...selectedOfficer,
                  [complaint.complaintId]: event.target.value
                })
              }
            >
              <option value="">
                Select Officer
              </option>

              {officers.map((officer) => (
                <option
                  key={officer._id}
                  value={officer._id}
                >
                  {officer.name} ({officer.email})
                </option>
              ))}
            </select>

            <button
              onClick={() =>
                handleAssign(complaint.complaintId)
              }
            >
              Assign
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Assignment;