import React, { useState, useEffect } from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function App() {
  const [airports, setAirports] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedAirport, setSelectedAirport] = useState('');

  useEffect(() => {
    fetchAirports().then(setAirports);
  }, []);

  const fetchAirports = async () => {
    const response = await fetch('http://localhost:5000/airports', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    // console.log('response:', data.airports);
    return data.airports;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected day:', selectedDay);
    console.log('Selected airport:', selectedAirport);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label>
          What day are you traveling?
          <select value={selectedDay} onChange={e => setSelectedDay(e.target.value)}>
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </label>
        <label>
          Which airport are you traveling from?:
          <select value={selectedAirport} onChange={e => setSelectedAirport(e.target.value)}>
            {airports.map(airport => (
              <option key={airport.id} value={airport.id}>{airport.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;