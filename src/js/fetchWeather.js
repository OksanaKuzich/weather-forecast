let currentCity;

export async function fetchCity(cityName) {
  const searchParams = new URLSearchParams({
    q: cityName,
    limit: 5,
    appid: '588df5deb596ae223dd240564055e6fe',
  });

  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?${searchParams}`
    );
    currentCity = await response.json();
    console.log(currentCity);
    return currentCity;
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchWeather(city) {
  const searchParams = new URLSearchParams({
    lat: city.lat,
    lon: city.lon,
    appid: '588df5deb596ae223dd240564055e6fe',
  });

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${searchParams}`
    );
    const currentWeather = await response.json();
    console.log(currentWeather);
    return currentWeather;
  } catch (error) {
    console.log(error.message);
  }
}
