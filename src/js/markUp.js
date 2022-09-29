export function markUpCard(city) {
  return `<div class="container">
          <h2>${city.name}, ${city.state}, ${city.country}</h2>
        </div>`;
}

export function markUpList(item) {
  return item
    .map(({ flags, name }) => {
      return `<li class='list'><img class='flag' src="${flags.svg}" alt="${name.official}" width=70px><p>${name.official}</p></li>`;
    })
    .join('');
}

export function markUpWeather(weather) {
  return `<div class="container-wather">
          <img src='http://openweathermap.org/img/wn/${
            weather.weather[0].icon
          }@2x.png'>
          <p>Weather: ${weather.weather[0].description}</p>
          <p>Temperature: ${(weather.main.temp - 273.15).toFixed(
            2
          )}<span>&#8451;</span></p>
          <p>Pressure: ${weather.main.grnd_level * 0.75}mm</p>
          <p>Humidity: ${weather.main.humidity}%</p>
          <p>Wind: ${weather.wind.speed}m/s</p>
          <p>Sunrise: ${convertedDate(weather.sys.sunrise * 1000)}</p>
          <p>Sunset: ${convertedDate(weather.sys.sunset * 1000)}</p>
        </div>`;
}

function convertedDate(ms) {
  const date = new Date(ms);
  return date.toLocaleTimeString();
}
