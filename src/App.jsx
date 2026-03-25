import React, { useState } from 'react';
import './App.css';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [formData, setFormData] = useState({ name: '', date: '', time: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBook = (e) => {
    e.preventDefault();
    if (appointments.length >= 5) {
      alert("Limit reached! You can only store 5 appointments.");
      return;
    }

    const newAppointment = { ...formData, id: Date.now() };
    setAppointments([...appointments, newAppointment]);
    setFormData({ name: '', date: '', time: '' });
    setShowHistory(true);
  };

 
  const handleCancel = (id) => {
    const updatedList = appointments.filter(app => app.id !== id);
    setAppointments(updatedList);
  };

  return (
    <div className="container">
      {!showHistory ? (
        <section className="gui-card">
          <h1>Book Appointment</h1>
          <p className="counter">Storage: {appointments.length} / 5</p>
          <form onSubmit={handleBook}>
            <input type="text" name="name" placeholder="Guest Name" value={formData.name} onChange={handleChange} required />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
            <button type="submit" disabled={appointments.length >= 5} className="btn-primary">
              {appointments.length >= 5 ? "Full" : "Confirm Booking"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => setShowHistory(true)}>
              View History
            </button>
          </form>
        </section>
      ) : (
        <section className="gui-card">
          <div className="header">
            <h2>Appointment History</h2>
            <button onClick={() => setShowHistory(false)} className="btn-close">Back</button>
          </div>
          <div className="list">
            {appointments.length === 0 ? (
              <p>No appointments scheduled.</p>
            ) : (
              appointments.map((app) => (
                <div key={app.id} className="item">
                  <div className="info">
                    <strong>{app.name}</strong>
                    <span>{app.date} at {app.time}</span>
                  </div>
                
                  <button className="btn-cancel" onClick={() => handleCancel(app.id)}>
                    Cancel
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;