import React, { useState, useEffect } from 'react';

const daysOfWeek = [
  { name: 'Monday', value: 1 },
  { name: 'Tuesday', value: 2 },
  { name: 'Wednesday', value: 3 },
  { name: 'Thursday', value: 4 },
  { name: 'Friday', value: 5 },
  { name: 'Saturday', value: 6 },
  { name: 'Sunday', value: 7 },
];

function App() {
  const [airports, setAirports] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedAirport, setSelectedAirport] = useState('');
  const [prediction, setPrediction] = useState(null);

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
    return data.airports;
  };

  const fetchPrediction = async (dayOfWeek, airportId) => {
    const response = await fetch(`http://localhost:5000/predict?day_of_week=${dayOfWeek}&airport_id=${airportId}`);
    const modelPrediction = await response.json();
    setPrediction(modelPrediction);
    console.log('response in fetch:', modelPrediction);
    return modelPrediction;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const selectedDay = Number(event.target.value);
    console.log('Selected day:', selectedDay);
    console.log('Selected airport:', selectedAirport);

    const prediction = await fetchPrediction(selectedDay, selectedAirport);
    console.log('Prediction in submit:', prediction);
    return prediction;
  };

  const handleDayChange = (event) => {
    const selectedDay = Number(event.target.value);
    setSelectedDay(selectedDay)
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label>
          What day are you traveling?
          <select onChange={handleDayChange}>
            {daysOfWeek.map((day, index) => (
              <option key={index} value={day.value}>
                {day.name}
              </option>
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
      <div>
        {prediction && <h2>Prediction: {prediction.interpretation}</h2>}
      </div>
    </div>
  );
}

export default App;