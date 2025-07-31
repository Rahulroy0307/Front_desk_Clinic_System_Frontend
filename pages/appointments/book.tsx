// pages/appointments/book.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  location: string;
};

function BookAppointment() {
  const router = useRouter();

  // Form state
  const [form, setForm] = useState({
    patientName: '',
    date: '',
  });

  // Doctors and slider selection
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  // Fetch doctors only for this page
  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
        if (!res.ok) throw new Error('Failed to fetch doctors');
        const data = await res.json();
        setDoctors(data);
        if (data.length > 0) setSelectedDoctorId(data[0].id); // select the first doctor by default
      } catch (err) {
        console.error('Failed to fetch doctors', err);
      }
    }
    fetchDoctors();
  }, []);

  // Change handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDoctorCardClick = (id: number) => {
    setSelectedDoctorId(id);
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.patientName.trim() || !form.date.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    if (!selectedDoctorId) {
      alert('Please select a doctor');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const appointmentData = {
        patientName: form.patientName,
        date: form.date,
        doctorId: selectedDoctorId,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) throw new Error('Failed to book appointment');
      alert('Appointment booked successfully!');
      router.push('/appointments');
    } catch (error) {
      alert('Error: Could not book appointment.');
      console.error(error);
    }
  };

  // Slider config
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(3, doctors.length),
    slidesToScroll: 1,
    // The slider navigation alone will not update the selection—use card clicks!
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow border">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Book Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Date & Time */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Date & Time</label>
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Doctor Selection Slider */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Select Doctor</label>
          {doctors.length === 0 ? (
            <p className="text-gray-500">No doctors available</p>
          ) : (
            <Slider {...sliderSettings}>
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => handleDoctorCardClick(doctor.id)}
                  className={`p-4 cursor-pointer border rounded mx-2 transition ${
                    selectedDoctorId === doctor.id ? 'ring-2 ring-blue-600 border-blue-600 bg-blue-50' : 'border-gray-300'
                  }`}
                  style={{ minHeight: 110 }}
                >
                  <div className="font-semibold text-lg">{doctor.name}</div>
                  <div className="text-sm text-gray-600">Specialty: {doctor.specialty}</div>
                  <div className="text-sm text-gray-600">Location: {doctor.location}</div>
                  {selectedDoctorId === doctor.id && (
                    <div className="mt-2 text-blue-600 font-bold text-sm">Selected</div>
                  )}
                </div>
              ))}
            </Slider>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;

