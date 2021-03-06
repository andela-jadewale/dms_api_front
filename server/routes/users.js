/*
 * @param  {Object} instance of express
 * @param  {Object} instance of mongoose schema
 * @param  {Object} instance of mongoose
 * @param  {Object} instance of json web token for authentication
 * @param  {Object} instance of bcrypt for password encryption
 * passes objects above by reference to be used by user route contollers
 * @return {void}
 */
module.exports = function(app, Schema, db, jwt, bcrypt) {
  'use strict';

  // User controller which takes references of the objects above
  var Users = require('../controllers/user')(app, Schema, db, jwt, bcrypt),

    // Authenticates users have token for routes
    auth = require('../middleware/jstokensverification')(app, jwt);

  // Logs users in
  app.route('/api/v1/users/login')
    .post(Users.logIn);

  // Creates a user account
  app.route('/api/v1/users/')
    .post(Users.createUser);

  // Authenticates all users route below
  app.use('/api/v1/users/', auth.apiRoutes);

  // Logs user out
  app.route('/api/v1/users/logout')
    .post(Users.logOut);

  // Gets all users
  app.route('/api/v1/users/')
    .get(Users.getAllUsers);

  // Gets,update and deletes a user
  app.route('/api/v1/users/:id')
    .get(Users.getUser)
    .put(Users.updateUser)
    .delete(Users.deleteUser);

};