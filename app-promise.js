const axios  = require('axios');
const yargs = require('yargs');

const argv = yargs
  .options({
    address:{
      demand: true,
      describe: 'addres for which u want location of',
      alias:'@',
      string:true
    }
  })
  .help()
  .alias('help','h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);

var geoCodeUrl = `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geoCodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('unable to find that address');
  }

//console.log(JSON.stringify(response.data, undefined, 2));
var lat = response.data.results[0].geometry.location.lat;
var lng = response.data.results[0].geometry.location.lng;
var weatherUrl = `https://api.darksky.net/forecast/7c65628cd7c01b3cd897ae76e272e089/${lat},${lng}`;
console.log(response.data.results[0].formatted_address);
return axios.get(weatherUrl);

}).then((response) => {
  console.log(JSON.stringify(response.data, undefined, 2));
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature} .It feels like ${apparentTemperature}.`);
  console.log(`humidity is ${response.data.humidity}.`)
}).catch( (e) => {
  if(e ==='ENOTFOUND'){
    console.log('unabli to connect to api server');
  } else {
    console.log(e.message);
  }

});
