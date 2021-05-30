const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  router.post("/videos", controller.upload);
  router.get("/videos", controller.getListFiles);
  router.get("/videos/:name", controller.download);

  app.use(router);
};

module.exports = routes;
