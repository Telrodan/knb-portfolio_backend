const dotenv = require('dotenv');
const debug = require('debug')('node-angular');

dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
