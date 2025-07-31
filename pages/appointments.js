import React, { useState } from 'react';

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Suresh Kumar',
    specialization: 'General Physician',
    location: 'Chennai City Hospital',
  },
  {
    id: 2,
    name: 'Dr. Lakshmi Narayanan',
    specialization: 'Cardiologist',
    location: 'Kochi Heart Centre',
  },
  {
    id: 3,
    name: 'Dr. Priya Menon',
    specialization: 'Dermatologist',
    location: 'Bangalore Skin Clinic',
  },
  {
    id: 4,
    name: 'Dr. Anil Reddy',
    specialization: 'Orthopedic Surgeon',
    location: 'Hyderabad Ortho Care',
  },
  {
    id: 5,
    name: 'Dr. Niveditha Subramanian',
    specialization: 'Gynecologist',
    location: 'Madurai Women\'s Health Clinic',
  },
];

const locations = [
  'All Locations',
  'Chennai City Hospital',
  'Kochi Heart Centre',
  'Bangalore Skin Clinic',
  'Hyderabad Ortho Care',
  'Madurai Women\'s Health Clinic',
];

export default function AppointmentsPage() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All Locations');

  const filteredDoctors = doctorsData.filter((doctor) =>
    (location === 'All Locations' || doctor.location === location) &&
    (doctor.name.toLowerCase().includes(search.toLowerCase()) ||
     doctor.specialization.toLowerCase().includes(search.toLowerCase()))
  );

  const handleBook = (doc) => alert('Book appointment with ' + doc.name);
  const handleReschedule = (doc) => alert('Reschedule appointment for ' + doc.name);
  const handleCancel = (doc) => alert('Cancel appointment with ' + doc.name);

  return (
    <div className="min-h-screen px-2 py-8 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">Appointments</h1>

      <div className="flex flex-wrap justify-between gap-3 mb-6 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search by doctor name or specialization"
          className="flex-1 border border-gray-300 rounded px-2 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded px-2 py-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {locations.map((loc) => (
            <option key={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded shadow p-6 flex flex-col gap-4 border">
            <div>
              <div className="text-xl font-bold">{doctor.name}</div>
              <div className="text-gray-600">{doctor.specialization}</div>
              <div className="text-gray-500 text-sm">Location: {doctor.location}</div>
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 bg-blue-700 hover:bg-blue-900 text-white py-2 rounded font-semibold transition"
                onClick={() => handleBook(doctor)}
              >
                Book Appointment
              </button>
              <button
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded font-semibold transition"
                onClick={() => handleReschedule(doctor)}
              >
                Reschedule
              </button>
              <button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
                onClick={() => handleCancel(doctor)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
