const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = __dirname;

var corsOptions = {
  origin: process.env.PORT+1
};

app.use(cors(corsOptions));

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server listening on: http://localhost:%s", port);
});
