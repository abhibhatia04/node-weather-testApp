const request = require('request');

var geocodeAddress = (address, callback) => {
	var encodedAddress = encodeURIComponent(address);
request({
	url: `http://www.mapquestapi.com/geocoding/v1/address?key=
GqRuDrkJENmc35kVgYGXrNWZbcE9qJN8&location=${encodedAddress}`,
	json: true 
},(error, response, body) => {
	if (error){
		callback('Unable to connected to server')
	}
	// }else if(info.statuscode === 0){
	// 	console.log('adress not found')
	// }
	else if(body.info.statuscode === 0){
		callback(undefined ,{
			Address:   body.results[0].locations[0].adminArea3,
			Latitude:  body.results[0].locations[0].latLng.lat,
			Longitude: body.results[0].locations[0].latLng.lng

		});
		
	}
});

};
module.exports={
geocodeAddress
};
