'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function(data, className = ''){
    const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}m people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}



// const getCountryAndNeighbour = function(country){
//     // Ajax call country 1
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();


// request.addEventListener('load', function(){
//     const [data] = JSON.parse(this.responseText)
//     console.log(data)

//     // render  country 1
//     renderCountry(data)

//     // Get neighbour country
//     const neighbour = data.borders?.[0];

    
//         // Ajax call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function(){
//         const data2 = JSON.parse(this.responseText)
//         console.log(data2)

//         renderCountry(data2, 'neighbour')
//     })
   
// });
// };

// getCountryAndNeighbour('usa')

// using Promise

// const request = fetch('https://restcountries.eu/rest/v2/name/portugal');
// console.log(request);

// Error function
const renderError = function(msg){
  countriesContainer.insertAdjacentText('beforeend', msg)
  countriesContainer.style.opacity = 1;
};

const getJSON = function(url, errorMsg = 'Something went wrong'){
  return fetch(url).then(response => {

    if(!response.ok)
    throw new Error(`${errorMsg} (${response.status})`)

    return response.json()})
}

const getCountryData = function(country){

  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
  .then(data => {
    renderCountry(data[0])
    const neighbour = data[0].borders?.[0];
    
    if(!neighbour) throw new Error('No neighbour found!')
    
    
   return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found')
  })
  .then(data => renderCountry(data, 'neighbour'))
  .catch(err => {console.error(`${err}`)
  renderError(`Something went wrong ${err.message}. Try again!`)
})
  
}

// btn.addEventListener('click', function(){
//   // getCountryData('australia')
// })

// getCountryData('hfhfhfh')


const whereAmI = function(lat, long){
  fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    console.log(`You are in ${data.city}, ${data.country}`);
    return fetch(`https://restcountries.com/v2/name/${data.country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]))
  });
};

btn.addEventListener('click', function(){
  whereAmI(52.508, 13.381)
  whereAmI(19.037, 72.873)
  whereAmI(-33.933, 18.474)
})
