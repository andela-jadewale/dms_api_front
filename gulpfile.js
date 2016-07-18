var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var path = require('path');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var paths = {
    public: 'public/**',
    jade: ['!app/shared/**', 'app/**/*.jade'],
    scripts: 'app/**/*.js',
    images: 'app/images/**/*',
    staticFiles: [
      '!app/**/*.+(less|css|js|jade)',
      '!app/images/**/*',
      'app/**/*.*'
    ],
    unitTests: [],
    serverTests: ['./tests/server/**/*.spec.js'],
    libTests: ['lib/tests/**/*.js'],
    styles: 'app/styles/*.+(less|css)'
  };

// minimise app.js
gulp.task('min', function() {
    return gulp.src('./.tmp/app.js')
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('./.tmp'));
});

//restart server when we change our server.js file
gulp.task('live-server', function () {
  var server = new LiveServer('server.js');
  server.start();
})

gulp.task('copy', function () {
  gulp.src(['app/styles/*.css']).pipe(gulp.dest('./.tmp'))
})

gulp.task('bundle',['copy'], function () {
  return browserify({
    entries: 'app/main.jsx',
    'debug': true,
  })
  .transform(reactify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./.tmp'))
})

gulp.task('serve', ['bundle','min','live-server'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:8084',
    port: 9001
  })
})