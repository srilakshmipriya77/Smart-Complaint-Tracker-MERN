import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';

function Feedback() {
  const [searchParams] = useSearchParams();

  const [complaintId, setComplaintId] = useState(
    searchParams.get('complaintId') || ''
  );

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage('');

      const response = await api.post('/feedback', {
        complaintId,
        rating: Number(rating),
        comment
      });

      setMessage(response.data.message);

      setComplaintId('');
      setRating(5);
      setComment('');
    } catch (error) {
      console.error(
        'Feedback submission failed:',
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
        'Failed to submit feedback'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Submit Feedback</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Complaint ID</label>

          <input
            type="text"
            value={complaintId}
            onChange={(event) =>
              setComplaintId(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Rating</label>

          <select
            value={rating}
            onChange={(event) =>
              setRating(event.target.value)
            }
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Very Poor</option>
          </select>
        </div>

        <div>
          <label>Comment</label>

          <textarea
            value={comment}
            onChange={(event) =>
              setComment(event.target.value)
            }
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}

export default Feedback;