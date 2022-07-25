const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    console.log("the request is recieved");
    console.log("the user is requesting " + req.body.cityName );
    const apikey = config.SECRET_API_KEY;
const query = req.body.cityName;
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?id=524901&appid=" + apikey + "&q=" + query + "&units=" + unit;

https.get(url, function(response){
console.log(response.statusCode);
response.on("data", function(data){
   const weatherData = JSON.parse(data);
   const temp = weatherData.main.temp;
   const weatherDescription = weatherData.weather[0].description;
   const icon = weatherData.weather[0].icon 
   const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  res.write("<h1 style=" + "text-align:center;" + ">The weather is currently " + weatherDescription + "</p>");
  res.write("<h1>The temperature in " + query + " is "+ temp + " degrees Celcius.</h1>");
  res.write("<img src =" + imageURL + ">")
  res.send();
})
})
})


app.listen(3000, function(){
console.log("server is running on port 3000.")
})