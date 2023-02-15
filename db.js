const mongoose = require('mongoose');
const debug = require('debug')('dev:');

const DATABASE = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);

module.exports = function connection() {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
    .then(() => debug('Conntected to database'))
    .catch((error) => {
      debug('ERROR:', error);
    });
};
