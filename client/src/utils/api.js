const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '59fe2159d5d05de23703db96229d98b5';

export const apiGet = (url, params = {}) => {
    const fullParams = {
        ...params,
        appid: API_KEY,
        units: 'metric',
        lang: 'cs'
    }
    const queryParams = new URLSearchParams(fullParams);
    const fullUrl = `${API_URL}${url}?${queryParams.toString()}`;

    return fetch(fullUrl).then((res) => {
        if(!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
    });
};

export const loadLocalJson = (filename) => {
    return fetch(`${process.env.PUBLIC_URL}/${filename}`)
        .then((res) => {
            if(!res.ok) {
                throw new Error(`Error loading local file: ${res.status}`);
            }
            return res.json();
        });
};

export const getForecastByCityId = (cityId) => {
    return apiGet('/forecast', {id: cityId});
}