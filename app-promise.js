const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.option({
	a: {
		demand: true,
		alias: 'address',
		describe: 'address to fetch the wheather',
		string: true
	}
})
.help()
.alias('help', 'h')
.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=
GqRuDrkJENmc35kVgYGXrNWZbcE9qJN8&location=${encodedAddress}`;

//***************************************************************
//code for getting address and from that printing temperature
//*************************************************************** 

axios.get(geocodeUrl).then((response) =>{
	var lat = response.data.results[0].locations[0].latLng.lat;
	var lng = response.data.results[0].locations[0].latLng.lng;
	var weatherUrl = `https://api.darksky.net/forecast/318d41c2af70705d35162c66bc3f6bc0/${lat},${lng}`;
	console.log(response.data.results[0].locations[0].adminArea3,);
	return axios.get(weatherUrl);

}).then((response)=>{
	var temp = response.data.currently.temperature;
	var apparentTemp = response.data.currently.apparentTemperature;
	console.log(`the current temperature is ${temp} but it feels like ${apparentTemp}.	`)
}).catch((e)=>{
	if(e.code === 'ENOTFOUND'){
		console.log('Unable to connect to server');
	}
});