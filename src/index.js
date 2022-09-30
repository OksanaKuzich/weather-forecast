import * as fetchRequest from './js/fetchRequest';
import * as markUp from './js/markUp';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 500;
const formEl = document.querySelector('.form');
const cardsEl = document.querySelector('.cards');
const inputEl = document.querySelector('.input');
const listEl = document.querySelector('.cities-list');
const findBtnEl = document.querySelector('.btn-find');

formEl.addEventListener('submit', onSubmitForm);
inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
listEl.addEventListener('click', handleButtonClick);

async function onSubmitForm(e) {
  e.preventDefault();

  const cityName = e.target.elements.city.value.trim();

  if (!cityName) {
    Notify.info('Please enter your city!');
    return;
  }

  const fetchResult = await fetchRequest.fetchCity(cityName);
  console.log(fetchResult);

  if (fetchResult.length === 0) {
    Notify.warning('Sorry, your city was not found!');
    findBtnEl.disabled = true;
    return;
  }

  listEl.classList.add('visually-hidden');

  const fetchResultWeather = await fetchRequest.fetchWeather(
    fetchResult[0].lon,
    fetchResult[0].lat
  );
  cardsEl.innerHTML = markUp.markUpCard(fetchResultWeather);
  findBtnEl.disabled = true;
}

async function onInputChange(e) {
  findBtnEl.disabled = false;

  const cityName = e.target.value.trim();
  if (cityName === '') {
    listEl.classList.add('visually-hidden');
    listEl.innerHTML = '';
    cardsEl.innerHTML = '';
    return;
  } else if (!cityName) {
    Notify.info('Please enter your city!');
    return;
  }

  const fetchResult = await fetchRequest.fetchCity(cityName);

  if (fetchResult.length === 0) {
    Notify.warning('Sorry, your city was not found!');
    findBtnEl.disabled = true;
    return;
  }

  listEl.innerHTML = markUp.markUpList(fetchResult);
  listEl.classList.remove('visually-hidden');
}

async function handleButtonClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  let currentCity = e.target.textContent;
  inputEl.value = currentCity;

  listEl.classList.add('visually-hidden');
  const cityLon = e.target.dataset.lon;
  const cityLat = e.target.dataset.lat;
  const fetchResultWeather = await fetchRequest.fetchWeather(cityLon, cityLat);

  findBtnEl.disabled = true;

  if (
    cityLon !== fetchResultWeather.coord.lon ||
    cityLat !== fetchResultWeather.coord.lat
  ) {
    Notify.success('Your city has been found. Or the one closest to it.');
  }

  cardsEl.innerHTML = markUp.markUpCard(fetchResultWeather);
}
