import * as fetchWeather from './js/fetchWeather';
import * as markUp from './js/markUp';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 500;
const formEl = document.querySelector('.form');
const cardsEl = document.querySelector('.cards');
const inputEl = document.querySelector('.input');
const listEl = document.querySelector('.cities-list');

formEl.addEventListener('submit', onSubmitForm);
inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
listEl.addEventListener('click', handleButtonClick);

async function onSubmitForm(e) {
  e.preventDefault();
  listEl.classList.add('visually-hidden');

  const cityName = e.target.elements.city.value.trim();
  if (!cityName) {
    Notify.info('Please enter your city!');
    return;
  }
  const fetchResult = await fetchWeather.fetchCity(cityName);
  if (fetchResult.length === 0) {
    Notify.warning('Sorry, your city was not found!');
    return;
  }
  const fetchResultWeather = await fetchWeather.fetchWeather(fetchResult[0]);

  cardsEl.innerHTML = markUp.markUpCard(fetchResultWeather);
}

async function onInputChange(e) {
  const cityName = e.target.value.trim();
  if (!cityName) {
    Notify.info('Please enter your city!');
    return;
  }
  const fetchResult = await fetchWeather.fetchCity(cityName);
  if (fetchResult.length === 0) {
    Notify.warning('Sorry, your city was not found!');
    return;
  }

  listEl.innerHTML = markUp.markUpList(fetchResult);
  listEl.classList.remove('visually-hidden');
}

async function handleButtonClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  listEl.classList.add('visually-hidden');
  console.log('dataset', e.target.dataset);
  const cityLon = e.target.dataset.lon;
  const cityLat = e.target.dataset.lat;
  const fetchResultWeather = await fetchWeather.fetchWeather(cityLon, cityLat);
  console.log(fetchResultWeather);

  cardsEl.innerHTML = markUp.markUpCard(fetchResultWeather);
}
