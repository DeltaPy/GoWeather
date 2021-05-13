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
      temperatura_max: {
        type: Sequelize.FLOAT
      },
      temperatura_min: {
        type: Sequelize.FLOAT
      },
      umidita: {
        type: Sequelize.INTEGER
      },
      pressione: {
        type: Sequelize.INTEGER
      },
      velocita_vento: {
        type: Sequelize.FLOAT
      },
      previsione_meteo: {
        type: Sequelize.STRING
      },
      prob_pioggia: {
        type: Sequelize.FLOAT
      }
    },{freezeTableName:true, timestamps:false});
  
    return weatherData;
  };