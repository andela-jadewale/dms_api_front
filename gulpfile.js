var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');

//restart server when we change our server.js file
gulp.task('live-server', function () {
  var server = new LiveServer('server.js');
  server.start();
})

gulp.task('serve', ['live-server'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:8084',
    port: 9001
  })
})