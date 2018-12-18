const request = require('request');

var getWeather = (lat, lng, callback) => {
	request({
	url: `https://api.darksky.net/forecast/318d41c2af70705d35162c66bc3f6bc0/${lat},${lng}` ,
	json: true
}, (error, response, body) => {
	if(!error && response.statusCode === 200){
		callback(undefined,{
			temperature: body.currently.temperature,
			apparentTemperature: body.currently.apparentTemperature
		} )
	}
	else{
		callback('unable to connect to server');

	}
});

};

module.exports.getWeather = getWeather;