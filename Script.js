"use strict";

const countryEl = document.querySelector(".country");
const coordsEl = document.querySelector(".coords");
const regionEl = document.querySelector(".region");
const currencyEl = document.querySelector(".currency");
const ipaddressEl = document.querySelector(".ipaddress");
const flagEl = document.querySelector(".flag");
const btnEl = document.querySelector(".btn");

let ipdata = "";
let countrydata = "";

const getData = function () {
  fetch("http://ip-api.com/json/")
    .then((Response) => {
      if (!Response.ok) throw new Error(`${errorMsg} ${Response.status}`);
      return Response.json();
    })
    .then((data) => {
      ipdata = data;
      fetch(`https://restcountries.com/v3.1/alpha/${ipdata.countryCode}`)
        .then((Response) => {
          if (!Response.ok) throw new Error(`${errorMsg} ${Response.status}`);
          return Response.json();
        })
        .then((data) => {
          countrydata = data;
          const [geodata] = countrydata;
          console.log();
          const countryCity = `${ipdata.country.toUpperCase()}, ${ipdata.city}`;
          const coords = `Coordinate: ${ipdata.lat}, ${ipdata.lon}`;
          const region = `Region: ${geodata.region}`;
          const currency = `Currency: ${
            geodata.currencies[Object.keys(geodata.currencies)].name
          }`;
          const ipaddress = `IP Address: ${ipdata.query}`;
          const flagaddress = geodata.flags[Object.keys(geodata.flags)[0]];
          init(countryCity, coords, region, currency, ipaddress, flagaddress);
          btnEl.style.opacity = 1;
        });
    })
    .catch((err) => console.log(`Something Went Wrong, ${err.message}`));
};
const init = function (
  country,
  coords,
  region,
  currency,
  ipaddress,
  imgaddress
) {
  countryEl.textContent = country;
  coordsEl.textContent = coords;
  regionEl.textContent = region;
  currencyEl.textContent = currency;
  ipaddressEl.textContent = ipaddress;
  flagEl.src = imgaddress;
};

getData();

btnEl.addEventListener("click", function () {
  window.open(
    `https://www.google.pt/maps/@${ipdata.lat},${ipdata.lon}`,
    "_blank"
  );
});
