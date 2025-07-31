import React, { useEffect, useState } from 'react';

export default function QueuePage() {
  const [queue, setQueue] = useState([]);
  const [newPatient, setNewPatient] = useState('');
  const [error, setError] = useState('');

  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Fetch queue patients from backend on mount
  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const res = await fetch(`${apiBase}/queue`);
      if (!res.ok) throw new Error('Failed to fetch queue');
      const data = await res.json();
      // Sort urgent patients on top initially
      const sortedData = data.sort((a, b) => (b.urgent === a.urgent ? 0 : b.urgent ? 1 : -1));
      setQueue(sortedData);
      setError('');
    } catch (err) {
      setError(err.message || 'Error fetching queue');
    }
  };

  // Add new patient to queue
  const addPatientToQueue = async (e) => {
    e.preventDefault();
    setError('');
    if (!newPatient.trim()) {
      setError('Please enter a patient name');
      return;
    }
    try {
      const res = await fetch(`${apiBase}/queue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientName: newPatient }),
      });
      if (!res.ok) throw new Error('Failed to add patient to queue');
      const addedQueueEntry = await res.json();
      setQueue((prev) => [...prev, addedQueueEntry]);
      setNewPatient('');
    } catch (err) {
      setError(err.message || 'Error adding patient to queue');
    }
  };

  // Update status of a patient in the queue
  const updateStatus = async (id, currentStatus) => {
    setError('');
    let nextStatus = 'Waiting';
    if (currentStatus === 'Waiting') nextStatus = 'With Doctor';
    else if (currentStatus === 'With Doctor') nextStatus = 'Done';

    try {
      const res = await fetch(`${apiBase}/queue/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updatedEntry = await res.json();
      setQueue((prev) =>
        prev.map((entry) => (entry.id === id ? updatedEntry : entry))
          // Sort urgent patients on top after update
          .sort((a, b) => (b.urgent === a.urgent ? 0 : b.urgent ? 1 : -1))
      );
    } catch (err) {
      setError(err.message || 'Error updating status');
    }
  };

  // Toggle urgent status of patient
  const toggleUrgent = async (id, currentUrgent) => {
  try {
    const res = await fetch(`${apiBase}/queue/${id}/urgent`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urgent: !currentUrgent }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`PATCH failed:`, res.status, errText);
      throw new Error('Failed to update urgent status');
    }

    const updatedEntry = await res.json();

    setQueue((prev) =>
      prev
        .map((entry) => (entry.id === id ? updatedEntry : entry))
        .sort((a, b) => (b.urgent === a.urgent ? 0 : b.urgent ? 1 : -1))
    );
  } catch (err) {
    setError(err.message || 'Error updating urgent status');
  }
};


  return (
    <div className="min-h-screen p-6 bg-gray-100 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Patient Queue</h1>

      <form onSubmit={addPatientToQueue} className="flex max-w-md mx-auto mb-8 gap-3">
        <input
          type="text"
          placeholder="Enter patient name"
          value={newPatient}
          onChange={(e) => setNewPatient(e.target.value)}
          className="flex-grow border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded font-semibold transition"
        >
          Add
        </button>
      </form>

      {error && (
        <div className="max-w-md mx-auto mb-6 p-3 bg-red-100 text-red-700 rounded text-center">
          {error}
        </div>
      )}

      <div className="bg-white rounded shadow p-4">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 text-left">Queue Number</th>
              <th className="border-b px-4 py-2 text-left">Patient Name</th>
              <th className="border-b px-4 py-2 text-left">Status</th>
              <th className="border-b px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {queue.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No patients in queue.
                </td>
              </tr>
            ) : (
              queue.map(({ id, patientName, queueNumber, status, urgent }) => (
                <tr
                  key={id}
                  className={`hover:bg-gray-50 ${urgent ? 'bg-yellow-100' : ''}`}
                >
                  <td className="border-b px-4 py-2">{queueNumber}</td>
                  <td className="border-b px-4 py-2">{patientName}</td>
                  <td className="border-b px-4 py-2">{status}</td>
                  <td className="border-b px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => updateStatus(id, status)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Update Status
                    </button>
                    <button
                      onClick={() => toggleUrgent(id, urgent)}
                      className={`px-3 py-1 rounded text-sm ${
                        urgent ? 'bg-red-600 text-white' : 'bg-yellow-400 text-black'
                      }`}
                    >
                      {urgent ? 'Urgent' : 'Mark Urgent'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
