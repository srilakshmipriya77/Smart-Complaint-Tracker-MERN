import { useState } from 'react';
import api from '../../services/api';

function RegisterComplaint() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    address: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/complaints', formData);

      console.log('Complaint created:', response.data);

      alert('Complaint submitted successfully');

      setFormData({
        title: '',
        category: '',
        description: '',
        address: '',
      });
    } catch (error) {
  console.error('FULL ERROR:', error);
  console.error('STATUS:', error.response?.status);
  console.error('DATA:', error.response?.data);

  alert(
    `Failed: ${error.response?.status || 'No status'} - ${
      error.response?.data?.message || error.message
    }`
  );
}
  };
  return (
    <div>
      <h1>Register Complaint</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Complaint Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Sanitation">Sanitation</option>
          </select>
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          Submit Complaint
        </button>

      </form>
    </div>
  );
}

export default RegisterComplaint;