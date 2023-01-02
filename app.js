const { json } = require("body-parser");
const express = require("express");
const app = express();
const https = require("https");

app.get("/", function(req, res){
    console.log(res.statusCode)

    const url = "https://api.openweathermap.org/data/2.5/forecast?appid=e59133edfc5877deb71ad5ef954240db&q=london&units=metrics";
  
    https.get(url, function(response){

        response.on("data", function(data){
            
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp 
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + " </p>");
            res.write("<h1>The temperature in London is "+temperature+" degrees Celcius.</h1>");
            res.write("<img src="+imageUrl+">");
            res.send()

        })
     
    })
    
})



app.listen(3000, function(){
    console.log("The server is running at port 3000")
})