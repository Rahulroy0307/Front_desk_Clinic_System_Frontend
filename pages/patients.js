import React, { useEffect, useState } from 'react';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  // Replace with your backend API URL
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetch(`${apiBase}/patients`)
      .then((res) => res.json())
      .then(setPatients)
      .catch(() => setError('Failed to fetch patients'));
  }, []);

  const addPatient = async (e) => {
    e.preventDefault();
    setError('');
    if (!newName.trim()) {
      setError('Please enter patient name');
      return;
    }
    try {
      const res = await fetch(`${apiBase}/patients`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) throw new Error('Failed to add patient');
      const addedPatient = await res.json();
      setPatients([...patients, addedPatient]);
      setNewName('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-xl mt-8 mb-8">
        <div className="bg-white shadow-xl rounded-xl py-8 px-6 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold text-blue-800 mb-4 tracking-tight">Patient Management</h1>
          <p className="text-gray-600 mb-6 text-center">
            View all registered patients and quickly add more below.
          </p>
          <form onSubmit={addPatient} className="flex w-full gap-2 mb-4">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-blue-500">
                <svg width="18" height="18" fill="none" className="inline"><path d="M8.999 10.799a4 4 0 100-7.998 4 4 0 000 7.998z" stroke="currentColor" /><path d="M15.5 15.5l-3.75-3.75" stroke="currentColor" strokeLinecap="round"/></svg>
              </span>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new patient name"
                className="pl-10 pr-3 py-2 w-full border border-gray-300 focus:border-blue-500 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-lg shadow transition"
            >
              Add
            </button>
          </form>
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded w-full mb-4 text-center">{error}</div>
          )}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="grid grid-cols-1 gap-4">
          {patients.length === 0 && (
            <div className="text-lg text-gray-500 text-center mt-4">
              No patients found. Add your first patient!
            </div>
          )}
          {patients.map((patient, i) => (
            <div
              key={patient.id}
              className="bg-white flex items-center border border-blue-100 rounded-lg shadow-md px-4 py-3 hover:shadow-xl transition group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mr-4">
                <span className="text-blue-700 font-bold text-xl capitalize">{patient.name[0]}</span>
              </div>
              <div>
                <div className="text-lg font-semibold text-blue-800 group-hover:underline">{patient.name}</div>
                {/* Add more patient info here if needed */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
