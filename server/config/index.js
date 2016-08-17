(function() {
  'use strict';

  var config;
  // Database config from .env file
  config = {
    url: process.env.DATABASE_URL,
    dbName: process.env.DATABASE_NAME,
    dbPort: process.env.DATABASE_PORT,
    dbHost: process.env.DATABASE_HOST,
    dbUsername: process.env.DATABASE_USERNAME,
    dbPassword: process.env.DATABASE_PASSWORD,
    secretToken: process.env.SECRET_TOKEN
  };

  if(process.env.MONGODB_URI) {
    config = process.env.MONGODB_URI;
  }

  module.exports = config;

})();
