module.exports = app => {
    const weatherData = require("../controllers/weather.controller");
  
    var router = require("express").Router();
    
    // Retrieve all weatherData
    router.get("/", weatherData.findAll);

    router.post("/getWeek", weatherData.getWeek);

    // Create a new Data
    router.post("/", weatherData.create);
    
    // Retrieve a single Data with id
    router.get("/:id", weatherData.findOne);
  
    // Retrieve all published weatherData
    router.get("/published", weatherData.findAllPublished);
  
    // Update a Data with id
    router.put("/:id", weatherData.update);
  
    // Delete a Data with id
    router.delete("/:id", weatherData.delete);
  
    // Delete all weatherData
    router.delete("/", weatherData.deleteAll);
  
    app.use('/api/weatherData', router);
  };