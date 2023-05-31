const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let cities = [];

fetch(endpoint)
  .then(res => res.json())
  .then(data => cities.push(...data))
  .catch(err => console.error(err));

function findMatches(wordtoMatch, cities) {
  return cities.filter(place => {
    const regEx = new RegExp(wordtoMatch, 'gi');
    return place.city.match(regEx) || place.state.match(regEx);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const match = findMatches(this.value, cities);
  let html = match.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join("");
  suggestions.innerHTML = html;
}

function displayMatches2() {
  const match = findMatches(this.value, cities);
  let html2 = match.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join("");
  suggestions2.innerHTML = html2;
}

let searchbar = document.querySelector(".search");
let searchbar2 = document.querySelector(".search2");
let suggestions = document.querySelector(".suggestions");
let suggestions2 = document.querySelector(".suggestions2");

searchbar.addEventListener("change", displayMatches);
searchbar.addEventListener("keyup", displayMatches);
searchbar2.addEventListener("change", displayMatches2);
searchbar2.addEventListener("keyup", displayMatches2);