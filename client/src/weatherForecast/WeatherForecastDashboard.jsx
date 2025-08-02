import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import WeatherForecastList from "./WeatherForecastList";
import { loadLocalJson, getForecastByCityId } from "../utils/api";

const WeatherForecastDashboard = () => {
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
        <div className='dashboard'>

            <InputField
                data={cities}
                labelKey='name'
                placeholder='Zadejte město'
                onSelect={handleSelect}
            />
            {error && <p className="error">{error}</p>}
            {!selectedCity && <p>Zadejte město pro zobrazení předpovědi.</p>}

            {forecast && (
                <>
                    <h2 className="list-h2">Předpověď počasí pro: {selectedCity.name}</h2>
                    <WeatherForecastList
                        forecast={forecast}
                    />
                </>
            )}
        </div>
    );
};
export default WeatherForecastDashboard;