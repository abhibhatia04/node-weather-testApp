const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js')

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

geocode.geocodeAddress(argv.address,(errorMessage, result) => {
	if(errorMessage){
		console.log(errorMessage);
	}else{
		console.log(result.Address);
		weather.getWeather(result.Latitude, result.Longitude, (errorMessage,weatherResult) =>{
	if(errorMessage){
		console.log(errorMessage);
	}else{
		console.log(`the current temperature is ${weatherResult.temperature}. but it feels like ${weatherResult.apparentTemperature}.`);
	}
});
	}
});


