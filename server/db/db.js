var Sequelize = require('sequelize');

var sequelize = new Sequelize('hyperspace', 'root', null);

var User = sequelize.define('User', {
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING }
});

var Hyper = sequelize.define('Hyper', {
  url: { type: Sequelize.STRING },
  title: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  image: { type: Sequelize.STRING },
  // Datatype of array only available in postgres so need to find a work around.
  // tags: { type: Sequelize.ARRAY },
  // widgets: { type: Sequelize.ARRAY }
});

sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been made successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the db: ', err);
  });

module.exports.sequelize = sequelize;
module.exports.User = User;
module.exports.Hyper = Hyper;


