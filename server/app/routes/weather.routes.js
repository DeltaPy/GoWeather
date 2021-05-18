module.exports = (app) => {
  const weatherData = require("../controllers/weather.controller");

  var router = require("express").Router();

  // Retrieve all weatherData
  router.get("/", weatherData.findAll);

  // Get week from date range
  router.post("/getWeek", weatherData.getWeek);

  // Get current day
  router.post("/getCurrentDay", weatherData.getCurrentDay);

  app.use("/api/weatherData", router);
};
