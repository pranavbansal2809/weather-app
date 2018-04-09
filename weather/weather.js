const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url:`https://api.darksky.net/forecast/7c65628cd7c01b3cd897ae76e272e089/${lat},${lng}`,
    json:true
    }, (error, response, body) => {
      //console.log(`temperature----> ${JSON.stringify(body.currently.temperature)}`);
      if(!error && response.statusCode === 200){
          callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }else{
        callback('unable to fetch weather.io');
      }


    });
};
// var longitudeStr = JSON.stringify(result.longitude);
// var latitudeStr = JSON.stringify(result.latitude);
//
// geocode.getTemperature(latitudeStr, longitudeStr);




module.exports.getWeather = getWeather;
