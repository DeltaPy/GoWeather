const { sequelize } = require("../models");
const db = require("../models");
const weatherData = db.goWeather;
const Op = db.Sequelize.Op;
const fetch = require("node-fetch");


function cleanNull(data) {
  for(i in data) {
    data[i].dataValues = {
      ...data[i].dataValues,
      date: data[i].dataValues.date === null ? "NaN" : data[i].dataValues.date,
      temperatura: data[i].dataValues.temperatura === null ? "NaN" : data[i].dataValues.temperatura,
      prob_prep: data[i].dataValues.prob_prep === null ? "NaN" : data[i].dataValues.prob_prep
    };
  }
  return data;
}

function cleanNullWeek(data) {
  for(i in data) {
    data[i] = {
      ...data[i],
      date: data[i].date === null ? "NaN" : data[i].date,
      temperatura: data[i].temperatura === null ? "NaN" : data[i].temperatura,
      prob_prep: data[i].prob_prep === null ? "NaN" : data[i].prob_prep
    };
  }
  return data;
}




// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const weatherData = {
    id: req.body.id,
    date: req.body.date,
    temperatura: req.body.temperatura,
    prob_prep: req.body.prob_prep
  };
  console.log(weatherData);
  
  res.status(200).send({message: "Success!"});
  

    // sequelize.query('INSERT INTO misurazioni (id,title,description,published) VALUES(DEFAULT,"Ciao","Gay",1)', 
    // {type: sequelize.QueryTypes.INSERT}).then(data => {res.status(200)
    //     .send({message: "Success!"})});

//   // Save Tutorial in the database
//   Tutorial.create(tutorial)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial."
//       });
//     });
};

// Retrieve all Data from the database.
exports.findAll = (req, res) => {
    weatherData.findAll()
      .then(data => {
        // console.log(data);
        res.send(cleanNull(data));
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};


// Get a week from a date range.
exports.getWeek = (req, res) => {
  console.log(req.body);
  sequelize.query(`SELECT * from misurazioni WHERE DATE BETWEEN '${req.body.from}' AND '${req.body.to}'`, {type: sequelize.QueryTypes.SELECT})
  .then(data => {
    console.log(data);
    if(data.length < 6) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.lat}&lon=${req.body.lon}&exclude=minutely,hourly,alerts,current&appid=db63a7aaa092b7a936170ecb1bba91cf&lang=it&units=metric`)
      .then(response => response.json())
      .then(data => console.log(data));
      } else res.send(cleanNullWeek(data));
  })
}

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    weatherData.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    weatherData.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    weatherData.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    weatherData.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tutorials."
          });
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    weatherData.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};