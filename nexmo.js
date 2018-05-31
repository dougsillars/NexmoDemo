var express = require("express");
var myParser = require("body-parser");
const Nexmo = require('nexmo')
var app = express();


app.use(myParser.urlencoded({extended : true}));
app.post("/sendSMS", function(request, response) {
	console.log(request.body); //This prints the JSON document received (if it is a JSON document)
	//read the body text
	const nexmo = new Nexmo({
  		apiKey: 'f9830463',
  		apiSecret: '6Y0XR916x9wQyGXU'
	})	;
	
	var from = request.body.messageFrom;
	var to = request.body.phoneNumber;
	var text = request.body.message;
	console.log(from + " " + to+ " " +text);
	
	nexmo.message.sendSms(from, to, text, (error, response) => {
  		if(error) {
    	throw error;
  	} else if(response.messages[0].status != '0') {
    	console.error(response);
    	throw 'Nexmo returned back a non-zero status';
    	
  	} else {
    	console.log(response);
    	
  	}
	});
	return response.send("message sent!");

});
 
 //Start the server and make it listen for connections on port 8080 
app.listen(8080);	
