var request = require('superagent');
var mock = require('superagent-mocker')(request);


module.exports = request;