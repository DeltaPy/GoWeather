const { sequelize } = require("../models");
const db = require("../models");
const weatherData = db.goWeather;
const Op = db.Sequelize.Op;
const fetch = require("node-fetch");

function cleanNull(data) {
  for (i in data) {
    data[i].dataValues = {
      ...data[i].dataValues,
      date: data[i].dataValues.date === null ? "NaN" : data[i].dataValues.date,
      temperatura:
        data[i].dataValues.temperatura === null
          ? "NaN"
          : data[i].dataValues.temperatura,
      prob_prep:
        data[i].dataValues.prob_prep === null
          ? "NaN"
          : data[i].dataValues.prob_prep,
    };
  }
  return data;
}

function cleanNullWeek(data) {
  for (i in data) {
    data[i] = {
      ...data[i],
      date: data[i].date === null ? "NaN" : data[i].date,
      temperatura: data[i].temperatura === null ? "NaN" : data[i].temperatura,
      prob_prep: data[i].prob_prep === null ? "NaN" : data[i].prob_prep,
    };
  }
  return data;
}

// Retrieve all Data from the database.
exports.findAll = (req, res) => {
  weatherData
    .findAll()
    .then((data) => {
      // console.log(data);
      res.send(cleanNull(data));
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weather data.",
      });
    });
};

// Get a week from a date range.
exports.getWeek = (req, res) => {
  console.log(req.body);
  sequelize
    .query(
      `SELECT * from misurazioni WHERE DATE >= '${req.body.from.slice(
        0,
        10
      )}' AND DATE <= '${req.body.to.slice(0, 10)}'`,
      { type: sequelize.QueryTypes.SELECT }
    )
    .then((data) => {
      console.log(data);
      console.log("Days returned: " + data.length);
      if (data.length < 7) {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.lat}&lon=${req.body.lon}&exclude=minutely,hourly,alerts,current
              &appid=db63a7aaa092b7a936170ecb1bba91cf&lang=it&units=metric`)
          .then((response) => response.json())
          .then((dataApi) => {
            // console.log(dataApi);
            dataApi.daily.map((data) => {
              let day = new Date(data.dt * 1000);
              let dayString = day.toISOString();
              if (data.rain === undefined) data.rain = 0;
              sequelize.query(`INSERT INTO misurazioni(date,temperatura,temperatura_max,temperatura_min,umidita,
                              pressione,velocita_vento,previsione_meteo,codice_previsione,prob_pioggia) 
            VALUES('${dayString.slice(0, 10)}',${data.temp.day},${
                data.temp.max
              },${data.temp.min},
            ${data.humidity},${data.pressure},${data.wind_speed},'${
                data.weather[0].description
              }',${data.weather[0].id},${data.rain}) 
            ON DUPLICATE KEY UPDATE date='${dayString.slice(
              0,
              10
            )}', temperatura=${data.temp.day},
            temperatura_max=${data.temp.max}, temperatura_min=${
                data.temp.min
              }, umidita=${data.humidity},
            pressione=${data.pressure}, velocita_vento=${
                data.wind_speed
              }, previsione_meteo='${data.weather[0].description}',
            prob_pioggia=${data.rain},codice_previsione=${data.weather[0].id}`);
            });
            sequelize
              .query(
                `SELECT * from misurazioni WHERE DATE >= '${req.body.from.slice(
                  0,
                  10
                )}' AND DATE <= '${req.body.to.slice(0, 10)}'`,
                { type: sequelize.QueryTypes.SELECT }
              )
              .then((data) => res.send(cleanNullWeek(data)));
          });
      } else res.send(cleanNullWeek(data));
    });
};

exports.getCurrentDay = (req, res) => {
  console.log("Returning current day data");
  sequelize
    .query(`SELECT * from misurazioni WHERE DATE(DATE) = DATE(NOW())`, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.send(data);
    });
};
