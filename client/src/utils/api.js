// Base URL for OpenWeatherMap API
const API_URL = 'https://api.openweathermap.org/data/2.5';

// API key for OpenWeatherMap
const API_KEY = '59fe2159d5d05de23703db96229d98b5';

/**
 * Helper function for making GET requests to the API.
 * Automatically includes the API key, metric units, and Czech language in the query.
 *
 * @param {string} url - The API endpoint (e.g. '/forecast')
 * @param {object} params - Additional query parameters
 * @returns {Promise<object>} - Parsed JSON response
 */
export const apiGet = (url, params = {}) => {
    const fullParams = {
        ...params,
        appid: API_KEY,
        units: 'metric',
        lang: 'cz'
    }

    // Convert parameters into a query string
    const queryParams = new URLSearchParams(fullParams);
    const fullUrl = `${API_URL}${url}?${queryParams.toString()}`;

    // Perform the GET request
    return fetch(fullUrl).then((res) => {
        if(!res.ok) {
            // If response is not OK, throw an error
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json(); // Parse JSON response
    });
};

/**
 * Loads a local JSON file.
 *
 * @param {string} filename - Name of the JSON file
 * @returns {Promise<object>} - Parsed JSON data
 */
export const loadLocalJson = (filename) => {
    return fetch(`${import.meta.env.BASE_URL}${filename}`)
        .then((res) => {
            if(!res.ok) {
                throw new Error(`Error loading local file: ${res.status}`);
            }
            return res.json();
        });
};

/**
 * Retrieves 5-day weather forecast for a given city by its OpenWeatherMap city ID.
 *
 * @param {number} cityId - Unique city ID from OpenWeatherMap
 * @returns {Promise<object>} - Forecast data
 */
export const getForecastByCityId = (cityId) => {
    return apiGet('/forecast', {id: cityId});
}