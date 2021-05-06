module.exports = (sequelize, Sequelize) => {
    const weatherData = sequelize.define("misurazioni", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: Sequelize.DATEONLY
      },
      temperatura: {
        type: Sequelize.FLOAT
      },
      prob_prep: {
          type: Sequelize.INTEGER
      }
    },{freezeTableName:true, timestamps:false});
  
    return weatherData;
  };

// module.exports = (sequelize, Sequelize) => {
//   const Tutorial = sequelize.define("tutorial", {
//     title: {
//       type: Sequelize.STRING
//     },
//     description: {
//       type: Sequelize.STRING
//     },
//     published: {
//       type: Sequelize.BOOLEAN
//     }
//   },{freezeTableName:true, timestamps:false});

//   return Tutorial;
// };