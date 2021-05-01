// module.exports = (sequelize, Sequelize) => {
//     const giorno = sequelize.define("giorno", {
//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true
//       },
//       data: {
//         type: Sequelize.DATE
//       },
//       temperatura: {
//         type: Sequelize.FLOAT
//       },
//       prob_prep: {
//           type: Sequelize.INTEGER
//       }
//     });
  
//     return giorno;
//   };

module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  },{freezeTableName:true, timestamps:false});

  return Tutorial;
};