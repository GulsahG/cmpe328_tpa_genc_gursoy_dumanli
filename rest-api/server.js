const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json', "dummy");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(port);

server.use((req, res, next)=> {
  res.header('Access-Control-Allow-Origin','*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,  Content-Type, Accept, Authorization");
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status.json({})
  }
  next();
});