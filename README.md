# Weather App

A simple and intuitive Weather App that allows you to check current weather conditions and forecasts for selected cities. The app leverages **two reliable weather APIs** to provide accurate and up-to-date information.

## Features

* **City Selection:** Choose from a list of predefined cities to see their weather.
* **Current Weather:** Get real-time weather data including temperature, humidity, and wind.
* **Forecasts:** View upcoming weather forecasts powered by **OpenMeteo** and **YR.no**.
* **Dual API Integration:** Combines data from OpenMeteo and YR.no for enhanced reliability.

## APIs Used

1. **OpenMeteo** – Provides weather forecasts including temperature, precipitation, and wind information.
   [https://open-meteo.com/](https://open-meteo.com/)

2. **YR.no** – Offers detailed weather predictions and forecasts.
   [https://www.yr.no/](https://www.yr.no/)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/macbuildssys/weather-app.git
   cd weather-app
   ```

2. Navigate to the production build folder:

   ```bash
   cd dist
   ```

3. Start a local server using `http-server`:

   ```bash
   npx http-server -o -c-1
   ```

   * `-o` automatically opens the app in your default browser.
   * `-c-1` disables caching.

> **Note:** The `cities.json` file is included in the package, so all predefined cities will load automatically.

## Using the Pre-Built Zip Package

1. Unzip the downloaded package:

   ```bash
   unzip weather-app-browser.zip
   cd weather-app-browser
   ```

2. Start a local server as above:

   ```bash
   npx http-server -o -c-1
   ```

* The app will open in your browser exactly like the development version.
* No Node.js or Electron is required — it runs fully in the browser.

## Deployment

You can host the `dist/` folder or the zipped package on any static hosting service:

* **GitHub Pages:** Push `dist/` or `weather-app-browser/` and enable Pages.
* **Netlify / Vercel:** Drag and drop the folder.
* **Any static server:** Serve via Nginx, Apache, or similar.
