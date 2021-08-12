const bodyParser = require("body-parser");
const express = require("express"); 

const cors = require("cors"); 

const app = express();


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Application." });
});

// routes
require("./routes/routes")(app);

// set port, listen for requests

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});