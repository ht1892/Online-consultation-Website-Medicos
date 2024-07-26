const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
   res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const apikey = "89398c4432bf1a5286daca292d7f807e";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric";

  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL =   "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
      res.write("<p>The weather is currently "+ weatherDesc + "</p>");
      res.write("<img src="+ imageURL + ">");
      res.send();
    })
  })
})

app.listen(3000,function(){
  console.log("Server is running just like your life(on port 3000 tho).");
})
