const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = __dirname;

app.use((req, res, next)=>
{
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,  Content-Type, Accept, Authotization");
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status.json({})
    }
    next();
})

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server listening on: http://localhost:%s", port);
});
