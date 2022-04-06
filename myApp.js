var express = require('express');
var app = express();
let bodyParser = require("body-parser");

console.log("Hello World");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/", (req, res) => {
  res.send("Hello Express");
});

let message = { message: "Hello json" };
/*app.get("/json", (req, res) => {
  res.json(message);
});
*/

app.use((req, res, next) => {
  console.log(console.log(req.method + " " + req.path + " - " + req.ip));
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json(message);
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time,
    });
  }
);

app.post("/name", function (req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});
/* 

or you can use this:

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time
  });
}); 
*/

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

/*
app.get('/word/echo', (req, res) => {
  res.json({echo : req.params.word})
})
*/

app.get("/name", function (req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;

  var { first: firstName, last: lastName } = req.query;
  res.json({ name: `${firstName} ${lastName}` });
});



 module.exports = app;
