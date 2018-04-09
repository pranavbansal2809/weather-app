const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url:`https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}`,
    json:true
  },(error, response, body) => {
    if(error){
      callback('unable to connect to google server');
    }else if(body.status==='ZERO_RESULTS'){
      callback('invalid address');
    }else if(body.status==='OK'){
      callback(undefined, {
        address: body.results[0].formatted_address,
        longitude: body.results[0].geometry.location.lng,
        latitude: body.results[0].geometry.location.lat
      });
    }
  });
}






module.exports = {
  geocodeAddress,


};


//7c65628cd7c01b3cd897ae76e272e089
