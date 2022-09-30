import { format } from 'date-fns';

export function markUpCard(city) {
  return `<div class="container">
          <h2 class="city-name">Weather in ${city.name}, ${
    city.sys.country
  }</h2>
          <p class="current-date">${format(new Date(), 'd MMMM, eeee')}</p>
          <div class="wrapper">
          <div class="weather">
          <img class="img" src='http://openweathermap.org/img/wn/${
            city.weather[0].icon
          }@2x.png'>
          <p class="temperature">${(city.main.temp - 273.15).toFixed(
            0
          )}<span>&#8451;</span></p>
          <p class="type-weather">${city.weather[0].description}</p>
          </div>
          <div class="info">
          <p class="">Feels like: ${(city.main.feels_like - 273.15).toFixed(
            0
          )}<span>&#8451;</span></p>
          <p class="">Pressure: ${city.main.grnd_level * 0.75}mm</p>
          <p class="">Humidity: ${city.main.humidity}%</p>
          <p class="">Wind: ${city.wind.speed}m/s</p>
          <p class="">Sunrise: ${convertedDate(city.sys.sunrise * 1000)}AM</p>
          <p class="">Sunset: ${convertedDate(city.sys.sunset * 1000)}PM</p>
          </div>
          </div>
          </div>`;
}

export function markUpList(items) {
  return items
    .map(({ name, state, country, lat, lon }) => {
      return `<li class='list'><button class="btn-list" type="button" data-lat="${lat}" data-lon="${lon}">${name}, ${state}, ${country}</button></li>`;
    })
    .join('');
}

function convertedDate(ms) {
  const date = new Date(ms);
  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
}
