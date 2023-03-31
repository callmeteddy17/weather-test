import React, { useState } from 'react';
import axios from 'axios';
import { icon } from './icon';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=490b756e3b74c231cd7c28da42ea73dd`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Nhập thành phố"
          type="text"
        />
      </div>
      {data.name !== undefined && (
        <div>
          <div>
            <h3>{data.name}</h3>
          </div>
          {icon.map((image) => {
            if (image.type === data.weather[0].main) {
              return <img src={image.img} />;
            }
          })}
          <div>
            {data.main ? (
              <h1>{((data.main.temp - 32) / 1.8).toFixed()}°C</h1>
            ) : null}
          </div>
          <div style={{ paddingBottom: '20px' }}>
            {icon.map((weather) => {
              if (weather.type === data.weather[0].main) {
                return <h3>{weather.status}</h3>;
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
