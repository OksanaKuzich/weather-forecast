import * as fetchWeather from './js/fetchWeather';
import * as markUp from './js/markUp';

const formEl = document.querySelector('.form');
const cardsEl = document.querySelector('.cards');

formEl.addEventListener('submit', onSubmitForm);

async function onSubmitForm(e) {
  e.preventDefault();
  const cityName = e.target.elements.city.value.trim();
  const fetchResult = await fetchWeather.fetchCity(cityName);
  const fetchResultWeather = await fetchWeather.fetchWeather(fetchResult[0]);

  cardsEl.innerHTML = markUp.markUpCard(fetchResultWeather);
}
