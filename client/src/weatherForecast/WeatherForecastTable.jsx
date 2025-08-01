import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { loadLocalJson, getForecastByCityId } from "../utils/api";

const WeatherForecastTable = () => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadLocalJson('city.list.json')
            .then(setCities)
            .catch((err) => {
                console.error(err);
                setError('Failed to load list of cities.')
            });
    }, []);

    useEffect(() => {
        if (!selectedCity) {
            setForecast(null);
            return;
        };

        getForecastByCityId(selectedCity.id)
            .then(setForecast)
            .catch((err) => {
                console.error(err);
                setError('Failed to load weather forecast')
            });
    }, [selectedCity]);

    const handleSelect = (city) => {
        setSelectedCity(city);
        setError(null);
    };

    return (
        <div>
            <InputField
                data={cities}
                labelKey='name'
                placeholder='Zadejte město'
                onSelect={handleSelect}
            />
            {error && <p className="error">{error}</p>}

            {!selectedCity && <p>Zadejte město pro zobrazení předpovědi.</p>}

            {forecast && (
                <div>
                    <h2 className="table-h2">Předpověď počasí pro: {selectedCity.name}</h2>
                    <table className="weather-table">
                        <thead>
                            <tr>
                                <th className="col-date">Datum</th>
                                <th className="col-weather">Počasí</th>
                                <th className="col-temp">Teplota</th>
                                <th className="col-humidity">Vlhkost</th>
                                <th className="col-wind">Vítr</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecast.list
                                .filter((item) => item.dt_txt.includes("12:00:00"))
                                .map((item) => {
                                    const date = new Date(item.dt * 1000).toLocaleDateString(undefined, {
                                        weekday: "short",
                                        day: "numeric",
                                        month: "short",
                                    });
                                    const { temp, humidity } = item.main;
                                    const windSpeed = item.wind.speed;
                                    const weather = item.weather[0];

                                    return (
                                        <tr key={item.dt}>
                                            <td className="col-date">{date}</td>
                                            <td className="col-weather">
                                                <img
                                                    src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                                                    alt={weather.description}
                                                    title={weather.description}
                                                    className="weather-icon"
                                                />
                                                <span className="weather-description">{weather.description}</span>
                                            </td>
                                            <td className="col-temp">{Math.round(temp)}°C</td>
                                            <td className="col-humidity">{humidity}%</td>
                                            <td className="col-wind">{windSpeed}m/s</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
export default WeatherForecastTable;