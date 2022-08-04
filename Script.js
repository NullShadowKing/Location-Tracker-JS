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

const correctFormmating = function (datap, datac) {
  const [geodata] = datac;
  const countryCity = `${datap.country.toUpperCase()}, ${datap.city}`;
  const coords = `Coordinate: ${datap.lat}, ${datap.lon}`;
  const region = `Region: ${geodata.region}`;
  const currency = `Currency: ${
    geodata.currencies[Object.keys(geodata.currencies)].name
  }`;
  const ipaddress = `IP Address: ${datap.query}`;
  const flagaddress = geodata.flags[Object.keys(geodata.flags)[0]];
  init(countryCity, coords, region, currency, ipaddress, flagaddress);
  btnEl.style.opacity = 1;
};

const newGetData = async function () {
  const response = await fetch("http://ip-api.com/json/");
  if (!response.ok) throw new Error(`${errorMsg} ${Response.status}`);
  const data = await response.json();
  ipdata = data;
  const countryres = await fetch(
    `https://restcountries.com/v3.1/alpha/${ipdata.countryCode}`
  );
  if (!countryres.ok) throw new Error(`${errorMsg} ${countryres.status}`);
  const dataC = await countryres.json();
  countrydata = dataC;
  correctFormmating(ipdata, countrydata);
};

// const getData = function () {
//   fetch("http://ip-api.com/json/")
//     .then((Response) => {
//       if (!Response.ok) throw new Error(`${errorMsg} ${Response.status}`);
//       return Response.json();
//     })
//     .then((data) => {
//       ipdata = data;
//       fetch(`https://restcountries.com/v3.1/alpha/${ipdata.countryCode}`)
//         .then((Response) => {
//           if (!Response.ok) throw new Error(`${errorMsg} ${Response.status}`);
//           return Response.json();
//         })
//         .then((data) => {
//           countrydata = data;
//           correctFormmating(ipdata, countrydata);
//         });
//     })
//     .catch((err) => console.log(`Something Went Wrong, ${err.message}`));
// };
// getData();

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

newGetData();

btnEl.addEventListener("click", function () {
  window.open(
    `https://www.google.pt/maps/@${ipdata.lat},${ipdata.lon}`,
    "_blank"
  );
});
