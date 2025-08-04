import { useState } from 'react';

const WeatherForecastList = ({ forecast }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const dailyForecasts = forecast.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <ul className="forecast-list">
      {dailyForecasts.map((item, index) => {
        const date = new Date(item.dt * 1000).toLocaleDateString(undefined, {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
        const { temp, humidity } = item.main;
        const windSpeed = item.wind.speed;
        const weather = item.weather[0];
        const isExpanded = expandedIndex === index;

        return (
          <li key={item.dt} className="forecast-item" onClick={() => toggleExpand(index)}>
            <div className="forecast-main">
              <span className="forecast-date">{date}</span>
              <div className="forecast-weather">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                  alt={weather.description}
                  className="forecast-icon"
                />
                <span>{Math.round(temp)}°C</span>
                <span className="weather-description">{weather.description}</span>
              </div>
            </div>

            <div className={`forecast-details ${isExpanded ? 'expanded' : ''}`}>
              <span>💧vlhkost: {humidity}%</span>
              <span>💨rychlost větru: {windSpeed}m/s</span>
            </div>
          </li>
        );
      })}
    </ul>
  );

};
export default WeatherForecastList;