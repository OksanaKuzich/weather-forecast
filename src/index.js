import * as fetchRequest from './js/fetchRequest';
import * as markUp from './js/markUp';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { format } from 'date-fns';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

const DEBOUNCE_DELAY = 500;
const formEl = document.querySelector('.form');
const cardsEl = document.querySelector('.cards');
const inputEl = document.querySelector('.input');
const listEl = document.querySelector('.cities-list');
const findBtnEl = document.querySelector('.btn-find');
const diagramEl = document.querySelector('.container-diagram');
let fetchResultForecast;

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
  const btnMoreEl = document.querySelector('.btn-more');
  btnMoreEl.addEventListener('click', onClickMore);

  findBtnEl.disabled = true;
}

async function onInputChange(e) {
  findBtnEl.disabled = false;

  const cityName = e.target.value.trim();
  if (cityName === '') {
    listEl.classList.add('visually-hidden');
    listEl.innerHTML = '';
    cardsEl.innerHTML = '';
    diagramEl.style.display = 'none';
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

  // if (
  //   cityLon !== fetchResultWeather.coord.lon ||
  //   cityLat !== fetchResultWeather.coord.lat
  // ) {
  //   Notify.success('Your city has been found. Or the one closest to it.');
  // }

  cardsEl.innerHTML = markUp.markUpCard(fetchResultWeather);
  const btnMoreEl = document.querySelector('.btn-more');
  btnMoreEl.addEventListener('click', onClickMore);
}

async function onClickMore(e) {
  const cityLon = e.target.dataset.lon;
  const cityLat = e.target.dataset.lat;
  fetchResultForecast = await fetchRequest.fetchForecast(cityLon, cityLat);

  const btnMoreEl = document.querySelector('.btn-more');

  btnMoreEl.style.display = 'none';
  diagramEl.style.display = 'block';

  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        convertedDate(fetchResultForecast.list[7].dt * 1000),
        convertedDate(fetchResultForecast.list[15].dt * 1000),
        convertedDate(fetchResultForecast.list[24].dt * 1000),
        convertedDate(fetchResultForecast.list[31].dt * 1000),
        convertedDate(fetchResultForecast.list[39].dt * 1000),
      ],

      datasets: [
        {
          label: 'Temperature for 5 days', // Название
          backgroundColor: 'rgb(60, 60, 60)', // Цвет закраски
          borderColor: 'rgb(60, 60, 60)', // Цвет линии
          data: [
            (fetchResultForecast.list[7].main.temp - 273.15).toFixed(0),
            (fetchResultForecast.list[15].main.temp - 273.15).toFixed(0),
            (fetchResultForecast.list[24].main.temp - 273.15).toFixed(0),
            (fetchResultForecast.list[31].main.temp - 273.15).toFixed(0),
            (fetchResultForecast.list[39].main.temp - 273.15).toFixed(0),
          ], // Данные каждой точки графика
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });
}

function convertedDate(ms) {
  const date = new Date(ms);
  return date.toLocaleDateString(navigator.language, {
    day: '2-digit',
    month: '2-digit',
  });
}
