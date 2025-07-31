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
                <table>
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Teplota</th>
                            <th>Popis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecast.list
                            .filter((item) => item.dt_txt.includes('12:00:00'))
                            .map((item, idx) => (
                                <tr key={idx}>
                                    <td>{new Date(item.dt * 1000).toLocaleDateString()}</td>
                                    <td>{Math.round(item.main.temp)} °C</td>
                                    <td>{item.weather[0].description}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default WeatherForecastTable;