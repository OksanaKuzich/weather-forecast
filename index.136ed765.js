let e;function n(e){return new Date(e).toLocaleTimeString()}const t=document.querySelector(".form"),a=document.querySelector(".cards");t.addEventListener("submit",(async function(t){t.preventDefault();const r=t.target.elements.city.value.trim(),s=await async function(n){const t=new URLSearchParams({q:n,limit:5,appid:"588df5deb596ae223dd240564055e6fe"});try{const n=await fetch(`http://api.openweathermap.org/geo/1.0/direct?${t}`);return e=await n.json(),console.log(e),e}catch(e){console.log(e.message)}}(r),i=await async function(e){const n=new URLSearchParams({lat:e.lat,lon:e.lon,appid:"588df5deb596ae223dd240564055e6fe"});try{const e=await fetch(`https://api.openweathermap.org/data/2.5/weather?${n}`),t=await e.json();return console.log(t),t}catch(e){console.log(e.message)}}(s[0]);a.innerHTML=(c=s[0],`<div class="container">\n          <h2>${c.name}, ${c.state}, ${c.country}</h2>\n        </div>`),a.insertAdjacentHTML("beforeend",(o=i,`<div class="container-wather">\n          <img src='http://openweathermap.org/img/wn/${o.weather[0].icon}@2x.png'>\n          <p>Weather: ${o.weather[0].description}</p>\n          <p>Temperature: ${(o.main.temp-273.15).toFixed(2)}<span>&#8451;</span></p>\n          <p>Pressure: ${.75*o.main.grnd_level}mm</p>\n          <p>Humidity: ${o.main.humidity}%</p>\n          <p>Wind: ${o.wind.speed}m/s</p>\n          <p>Sunrise: ${n(1e3*o.sys.sunrise)}</p>\n          <p>Sunset: ${n(1e3*o.sys.sunset)}</p>\n        </div>`));var o;var c}));
//# sourceMappingURL=index.136ed765.js.map