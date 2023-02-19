const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/",function(req,res){
  var name = String(req.body.name);
  var age = Number(req.body.age);
  var email = String(req.body.id);

  res.write("<h1>Thankyou for trusting us!</h1>");
  res.write("<p>We will get back to you shortly.</p>");

  res.send();
})


app.listen(3000,function(){
  console.log("Server is running just like your life(on port 3000 tho).")
});
