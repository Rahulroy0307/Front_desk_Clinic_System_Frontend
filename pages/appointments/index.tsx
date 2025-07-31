import { useEffect, useState } from 'react';

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  status: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`);
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* 🔍 Search input */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by patient name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white shadow rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold">{appointment.patientName}</h2>
              <p><span className="font-medium">Doctor:</span> {appointment.doctorName}</p>
              <p><span className="font-medium">Date:</span> {new Date(appointment.date).toLocaleString()}</p>
              <p><span className="font-medium">Status:</span> {appointment.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
