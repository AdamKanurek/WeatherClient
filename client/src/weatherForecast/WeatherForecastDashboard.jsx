import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import WeatherForecastList from "./WeatherForecastList";
import { loadLocalJson, getForecastByCityId } from "../utils/api";

// Main dashboard component for displaying the weather forecast
const WeatherForecastDashboard = () => {
    const [cities, setCities] = useState([]);                // List of available cities (from local JSON)
    const [selectedCity, setSelectedCity] = useState(null);  // Currently selected city
    const [forecast, setForecast] = useState(null);          // Forecast data fetched from API
    const [error, setError] = useState(null);                // Error message (if any)

    // Load list of cities from local JSON file once on component mount
    useEffect(() => {
        loadLocalJson('city.list.json')
            .then(setCities)
            .catch((err) => {
                console.error(err);
                setError('Failed to load list of cities.')
            });
    }, []);

    // Fetch weather forecast when a city is selected
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

    // Handle city selection from the input field
    const handleSelect = (city) => {
        setSelectedCity(city);
        setError(null); // Clear previous error if any
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