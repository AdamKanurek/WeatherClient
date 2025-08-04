# Weather Client

Simple application that displays 5 day weather forecast for selected city. Weather forecast data are from OpenWeatherMap API. 

## App start

1. Clone repository:
   ```bash
   git clone https://github.com/AdamKanurek/WeatherClient
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run dev server:
   ```bash
   npm run dev
   ```

4. App will run on `http://localhost:5173` (vite).

## Build and deploy

```bash
npm run build
npm run deploy
```

App is deployed using `gh-pages` and final build is in `dist`. https://adamkanurek.github.io/WeatherClient/

## Project structure

- `src/components/InputField.jsx` – component for city select (autocomplete)
- `src/weatherForecast/WeatherForecastList.jsx` – list of daily weather forecasts with unwraping details
- `src/weatherForecast/WeatherForecastDashboard.jsx` – main dashboard containing selection and display logic
- `src/utils/api.js` – functions to help with loading data from OpenWeatherMap and local JSON file.
- `dist/` – final build folder
- `public/` – public files (city.list.json)

## Supported browsers

- Chrome (last 2 versions)
- Firefox
- Safari
- Edge

App is responsive - optimalised for mobile devices and desktop.

## API Key

For proper operation you need to have your own API key from OpenWeatherMap API:

replace my key in `src/utils/api.js` in a variable `API_KEY`

## Used technologies

- React
- Vite
- CSS
- OpenWeatherMap API
