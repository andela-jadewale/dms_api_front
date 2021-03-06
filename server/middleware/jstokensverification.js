/**
  * @param  {Object} app instance of express
  * @param  {Object} jwt instance of jwt
  * authenticates the routes are sent with tokens
  * @return {Object} functions to be called
*/
module.exports = function(app, jwt) {
  'use strict';

  var apiRoutes = app.get('express').Router();
    apiRoutes.use(function(req, res, next) {

      // get token from request
      var token = req.body.token || req.query.token ||
       req.headers['x-access-token'];

      if (token) {
        jwt.verify(token, app.get('superSecret'),
          function(err, decoded) {
          if (err) {
            return res.json({ success: false, message:
              'Failed to authenticate token.' });
          } else {
            req.decoded = decoded;
            next();
          }
        });

      }
      else{
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
      }
    });

  return {
    apiRoutes : apiRoutes
  };

};