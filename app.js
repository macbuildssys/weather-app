// Using Vue global (from CDN in index.html)
const { createApp, ref } = Vue;

createApp({
  setup() {
    const city = ref('');
    const source = ref('open-meteo');
    const weatherData = ref(null);
    const error = ref('');
    const loading = ref(false);

    // Quick built-in city list (exact matches)
    const cities = {
      // Africa
      'Cairo': { lat: 30.0444, lon: 31.2357 },
      'Lagos': { lat: 6.5244, lon: 3.3792 },
      'Nairobi': { lat: -1.2921, lon: 36.8219 },
      'Johannesburg': { lat: -26.2041, lon: 28.0473 },
      'Cape Town': { lat: -33.9249, lon: 18.4241 },
      'Casablanca': { lat: 33.5731, lon: -7.5898 },
      'Accra': { lat: 5.6037, lon: -0.1870 },
      'Addis Ababa': { lat: 9.0389, lon: 38.7620 },
      'Dar es Salaam': { lat: -6.8235, lon: 39.2695 },
      'Kinshasa': { lat: -4.4419, lon: 15.2663 },
      'Alexandria': { lat: 31.2001, lon: 29.9187 },
      'Algiers': { lat: 36.7538, lon: 3.0588 },
      'Tunis': { lat: 36.8065, lon: 10.1815 },
      'Marrakech': { lat: 31.6295, lon: -7.9811 },
      'Durban': { lat: -29.8587, lon: 31.0218 },

      // Asia
      'Tokyo': { lat: 35.6762, lon: 139.6503 },
      'Delhi': { lat: 28.6139, lon: 77.2090 },
      'Shanghai': { lat: 31.2304, lon: 121.4737 },
      'Mumbai': { lat: 19.0760, lon: 72.8777 },
      'Beijing': { lat: 39.9042, lon: 116.4074 },
      'Seoul': { lat: 37.5665, lon: 126.9780 },
      'Bangkok': { lat: 13.7563, lon: 100.5018 },
      'Jakarta': { lat: -6.2088, lon: 106.8456 },
      'Manila': { lat: 14.5995, lon: 120.9842 },
      'Hong Kong': { lat: 22.3193, lon: 114.1694 },
      'Singapore': { lat: 1.3521, lon: 103.8198 },
      'Kuala Lumpur': { lat: 3.1390, lon: 101.6869 },
      'Dubai': { lat: 25.2048, lon: 55.2708 },
      'Istanbul': { lat: 41.0082, lon: 28.9784 },
      'Taipei': { lat: 25.0330, lon: 121.5654 },
      'Ho Chi Minh City': { lat: 10.8231, lon: 106.6297 },
      'Bangalore': { lat: 12.9716, lon: 77.5946 },
      'Chennai': { lat: 13.0827, lon: 80.2707 },
      'Karachi': { lat: 24.8607, lon: 67.0011 },
      'Osaka': { lat: 34.6937, lon: 135.5023 },
      'Shenzhen': { lat: 22.5431, lon: 114.0579 },
      'Guangzhou': { lat: 23.1291, lon: 113.2644 },
      'Dhaka': { lat: 23.8103, lon: 90.4125 },
      'Tehran': { lat: 35.6892, lon: 51.3890 },
      'Riyadh': { lat: 24.7136, lon: 46.6753 },
      'Jerusalem': { lat: 31.7683, lon: 35.2137 },

      // Europe
      'London': { lat: 51.5074, lon: -0.1278 },
      'Paris': { lat: 48.8566, lon: 2.3522 },
      'Berlin': { lat: 52.5200, lon: 13.4050 },
      'Madrid': { lat: 40.4168, lon: -3.7038 },
      'Rome': { lat: 41.9028, lon: 12.4964 },
      'Moscow': { lat: 55.7558, lon: 37.6176 },
      'Amsterdam': { lat: 52.3676, lon: 4.9041 },
      'Barcelona': { lat: 41.3851, lon: 2.1734 },
      'Milan': { lat: 45.4642, lon: 9.1900 },
      'Vienna': { lat: 48.2082, lon: 16.3738 },
      'Prague': { lat: 50.0755, lon: 14.4378 },
      'Brussels': { lat: 50.8503, lon: 4.3517 },
      'Copenhagen': { lat: 55.6761, lon: 12.5683 },
      'Stockholm': { lat: 59.3293, lon: 18.0686 },
      'Athens': { lat: 37.9838, lon: 23.7275 },
      'Lisbon': { lat: 38.7223, lon: -9.1393 },
      'Dublin': { lat: 53.3498, lon: -6.2603 },
      'Warsaw': { lat: 52.2297, lon: 21.0122 },
      'Budapest': { lat: 47.4979, lon: 19.0402 },
      'Munich': { lat: 48.1351, lon: 11.5820 },
      'Hamburg': { lat: 53.5511, lon: 9.9937 },
      'Frankfurt': { lat: 50.1109, lon: 8.6821 },
      'Zurich': { lat: 47.3769, lon: 8.5417 },
      'Helsinki': { lat: 60.1699, lon: 24.9384 },
      'Oslo': { lat: 59.9139, lon: 10.7522 },

      // North America
      'New York': { lat: 40.7128, lon: -74.0060 },
      'Los Angeles': { lat: 34.0522, lon: -118.2437 },
      'Chicago': { lat: 41.8781, lon: -87.6298 },
      'Toronto': { lat: 43.6511, lon: -79.3470 },
      'Mexico City': { lat: 19.4326, lon: -99.1332 },
      'Vancouver': { lat: 49.2827, lon: -123.1207 },
      'San Francisco': { lat: 37.7749, lon: -122.4194 },
      'Washington D.C.': { lat: 38.9072, lon: -77.0369 },
      'Boston': { lat: 42.3601, lon: -71.0589 },
      'Seattle': { lat: 47.6062, lon: -122.3321 },
      'Miami': { lat: 25.7617, lon: -80.1918 },
      'Montreal': { lat: 45.5017, lon: -73.5673 },
      'Atlanta': { lat: 33.7490, lon: -84.3880 },
      'Houston': { lat: 29.7604, lon: -95.3698 },
      'Philadelphia': { lat: 39.9526, lon: -75.1652 },
      'Phoenix': { lat: 33.4484, lon: -112.0740 },
      'Las Vegas': { lat: 36.1699, lon: -115.1398 },
      'Denver': { lat: 39.7392, lon: -104.9903 },
      'Austin': { lat: 30.2672, lon: -97.7431 },
      'Dallas': { lat: 32.7767, lon: -96.7970 },

      // South America
      'São Paulo': { lat: -23.5505, lon: -46.6333 },
      'Rio de Janeiro': { lat: -22.9068, lon: -43.1729 },
      'Buenos Aires': { lat: -34.6037, lon: -58.3816 },
      'Lima': { lat: -12.0464, lon: -77.0428 },
      'Bogotá': { lat: 4.7110, lon: -74.0721 },
      'Santiago': { lat: -33.4489, lon: -70.6693 },
      'Caracas': { lat: 10.4806, lon: -66.9036 },
      'Quito': { lat: -0.1807, lon: -78.4678 },
      'Medellín': { lat: 6.2442, lon: -75.5812 },
      'Brasília': { lat: -15.7942, lon: -47.8822 },
      'Montevideo': { lat: -34.9011, lon: -56.1645 },
      'La Paz': { lat: -16.4980, lon: -68.1500 },
      'Belo Horizonte': { lat: -19.9167, lon: -43.9345 },
      'Porto Alegre': { lat: -30.0346, lon: -51.2177 },
      'Recife': { lat: -8.0578, lon: -34.8829 },
      'Salvador': { lat: -12.9714, lon: -38.5014 },

      // Australia & Oceania
      'Sydney': { lat: -33.8688, lon: 151.2093 },
      'Melbourne': { lat: -37.8136, lon: 144.9631 },
      'Brisbane': { lat: -27.4698, lon: 153.0251 },
      'Perth': { lat: -31.9505, lon: 115.8605 },
      'Adelaide': { lat: -34.9285, lon: 138.6007 },
      'Auckland': { lat: -36.8485, lon: 174.7633 },
      'Wellington': { lat: -41.2865, lon: 174.7762 },
      'Christchurch': { lat: -43.5321, lon: 172.6362 },
      'Hobart': { lat: -42.8826, lon: 147.3272 },
      'Canberra': { lat: -35.2809, lon: 149.1300 },

      // Antarctica (research stations)
      'McMurdo Station': { lat: -77.8460, lon: 166.6750 },
      'Palmer Station': { lat: -64.7730, lon: -64.0520 }
    };

    const getWeatherIcon = (condition) => {
      const iconMap = {
        'clear': 'fas fa-sun',
        'rain': 'fas fa-cloud-rain',
        'cloudy': 'fas fa-cloud',
        'snow': 'fas fa-snowflake',
        'storm': 'fas fa-bolt',
        'fog': 'fas fa-smog'
      };
      return iconMap[condition] || iconMap['clear'];
    };

    const isValidCity = (input) => {
      const trimmed = input.trim();
      return Object.prototype.hasOwnProperty.call(cities, trimmed);
    };

    const mapWeatherCodeToCondition = (code, isYrNo = false) => {
      if (isYrNo) {
        const yrSymbolMap = {
          'clearsky_day': 'clear', 'clearsky_night': 'clear',
          'fair_day': 'clear', 'fair_night': 'clear',
          'partlycloudy_day': 'cloudy', 'partlycloudy_night': 'cloudy',
          'cloudy': 'cloudy',
          'rainshowers_day': 'rain', 'rainshowers_night': 'rain',
          'rainshowers_polar_twilight': 'rain',
          'rain': 'rain', 'heavyrain': 'rain', 'heavyrainandthunder': 'storm',
          'snow': 'snow', 'snowandthunder': 'storm',
          'snowshowers_day': 'snow', 'snowshowers_night': 'snow',
          'fog': 'fog'
        };
        return yrSymbolMap[code] || 'clear';
      } else {
        const wmoCodeMap = {
          0: 'clear', 1: 'clear', 2: 'cloudy', 3: 'cloudy', 45: 'fog', 48: 'fog',
          51: 'rain', 53: 'rain', 55: 'rain', 56: 'rain', 57: 'rain',
          61: 'rain', 63: 'rain', 65: 'rain', 66: 'rain', 67: 'rain',
          71: 'snow', 73: 'snow', 75: 'snow', 77: 'snow',
          80: 'rain', 81: 'rain', 82: 'rain', 85: 'snow', 86: 'snow',
          95: 'storm', 96: 'storm', 99: 'storm'
        };
        return wmoCodeMap[code] || 'clear';
      }
    };

    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const formatDate = (date) => {
      const d = new Date(date);
      const day = d.getDate();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[d.getMonth()];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
      return `${dayName}, ${day}${getDaySuffix(day)} ${month}`;
    };

    const fetchOpenMeteo = async (lat, lon) => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weathercode`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Open-Meteo request failed');
      const data = await response.json();

      const current = {
        temp: Math.round(data.current_weather.temperature),
        condition: mapWeatherCodeToCondition(data.current_weather.weathercode),
        date: formatDate(data.current_weather.time),
      };

      const daily = data.daily.time.map((day, i) => ({
        date: formatDate(day),
        temp: Math.round((data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) / 2),
        condition: mapWeatherCodeToCondition(data.daily.weathercode[i]),
      })).slice(0, 5);

      const hourly = data.hourly.time.map((hour, i) => ({
        time: new Date(hour).toLocaleTimeString([], { hour: '2-digit' }),
        temp: Math.round(data.hourly.temperature_2m[i]),
        condition: mapWeatherCodeToCondition(data.hourly.weathercode[i]),
      })).slice(0, 24);

      return { current, daily, hourly };
    };

    const fetchYrNo = async (lat, lon) => {
      const url = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`;
      const response = await fetch(url, {
        headers: {
          // Recommended by met.no to include an identifying User-Agent
          'User-Agent': 'TWA-Forecast (github.com/yourname)'
        }
      });
      if (!response.ok) throw new Error('Yr.no request failed');
      const data = await response.json();

      const currentTimeseries = data.properties.timeseries[0].data.instant.details;
      const currentSymbol = data.properties.timeseries[0].data.next_1_hours?.summary.symbol_code
        || data.properties.timeseries[0].data.next_6_hours?.summary.symbol_code;

      const current = {
        temp: Math.round(currentTimeseries.air_temperature),
        condition: mapWeatherCodeToCondition(currentSymbol, true),
        date: formatDate(data.properties.timeseries[0].time),
      };

      const daily = [];
      const now = new Date();
      let currentDay = now.getDate();
      let dayCount = 0;

      for (const timeseries of data.properties.timeseries) {
        const date = new Date(timeseries.time);
        if (date.getDate() !== currentDay) {
          currentDay = date.getDate();
          if (dayCount >= 5) break;
          const dayData = timeseries.data.instant.details;
          const symbol = timeseries.data.next_6_hours?.summary.symbol_code
            || timeseries.data.next_12_hours?.summary.symbol_code;

          daily.push({
            date: formatDate(timeseries.time),
            temp: Math.round(dayData.air_temperature),
            condition: mapWeatherCodeToCondition(symbol, true),
          });
          dayCount++;
        }
      }

      const hourly = data.properties.timeseries.slice(0, 24).map(ts => {
        const hourData = ts.data.instant.details;
        const symbol = ts.data.next_1_hours?.summary.symbol_code
          || ts.data.next_6_hours?.summary.symbol_code;
        return {
          time: new Date(ts.time).toLocaleTimeString([], { hour: '2-digit' }),
          temp: Math.round(hourData.air_temperature),
          condition: mapWeatherCodeToCondition(symbol, true),
        };
      });

      return { current, daily, hourly };
    };

    const handleSearch = async () => {
      if (!city.value.trim()) {
        error.value = 'Please enter a city or location.';
        return;
      }

      loading.value = true;
      error.value = '';
      weatherData.value = null;

      try {
        if (!isValidCity(city.value)) {
          throw new Error('Failed to fetch weather data. Please try another location.');
        }

        const { lat, lon } = cities[city.value];
        const data = source.value === 'open-meteo'
          ? await fetchOpenMeteo(lat, lon)
          : await fetchYrNo(lat, lon);

        weatherData.value = data;
      } catch (err) {
        error.value = err.message || 'Something went wrong.';
      } finally {
        loading.value = false;
      }
    };

    return {
      city,
      source,
      weatherData,
      error,
      loading,
      getWeatherIcon,
      handleSearch
    };
  }
}).mount('#app');
