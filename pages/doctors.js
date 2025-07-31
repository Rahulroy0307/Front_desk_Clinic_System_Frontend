import React, { useEffect, useState } from 'react';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    specialty: '',
    location: '',
  });

  // Update this if your backend is running on a different URL or port
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  // Fetch doctors from backend
  const fetchDoctors = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiBase}/doctors`);
      if (!res.ok) throw new Error(`Failed to fetch doctors: ${res.statusText}`);
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      setError(err.message || 'Error fetching doctors');
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors once on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate all fields filled and non-empty after trimming whitespace
    if (!form.name.trim() || !form.specialty.trim() || !form.location.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch(`${apiBase}/doctors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to add doctor: ${errorText || res.statusText}`);
      }

      const newDoctor = await res.json();
      setDoctors((prev) => [...prev, newDoctor]);

      // Reset form inputs
      setForm({ name: '', specialty: '', location: '' });
    } catch (err) {
      setError(err.message || 'Error adding doctor');
    }
  };

  // Delete a doctor by ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this doctor?');
    if (!confirmDelete) return;

    setError('');
    try {
      const res = await fetch(`${apiBase}/doctors/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete doctor: ${errorText || res.statusText}`);
      }
      setDoctors((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      setError(err.message || 'Error deleting doctor');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Doctors Management</h1>

      <form onSubmit={handleSubmit} className="mb-6 max-w-md mx-auto space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Doctor Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <input
          name="specialty"
          type="text"
          placeholder="Specialty"
          value={form.specialty}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Add Doctor
        </button>
      </form>

      {error && (
        <div className="max-w-md mx-auto mb-4 p-3 bg-red-100 text-red-700 rounded text-center" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center font-semibold">Loading doctors...</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Specialty</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No doctors found.
                </td>
              </tr>
            ) : (
              doctors.map(({ id, name, specialty, location }) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{name}</td>
                  <td className="border border-gray-300 px-4 py-2">{specialty}</td>
                  <td className="border border-gray-300 px-4 py-2">{location}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      aria-label={`Delete doctor ${name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
