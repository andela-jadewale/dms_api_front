var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var bower = require('gulp-bower');
var reactify = require('reactify');
var path = require('path');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

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
    return gulp.src('app/**/*.+(js|jsx)')
      .pipe(rename({suffix: '.min'}))
      .pipe(concat('app/main.jsx'))
      .pipe(gulp.dest('./.tmp'));
});

//restart server when we change our server.js file
gulp.task('live-server', function () {
  var server = new LiveServer('server.js');
  server.start();
})

gulp.task('css', function () {
  gulp.src(['app/styles/*.css']).pipe(gulp.dest('./.tmp'))
})

gulp.task('img', function () {
  gulp.src(['app/images/*.+(jpg|jpeg|png)'])
  .pipe(gulp.dest('./.tmp'))
})

gulp.task('bundle',['css','img'], function () {
  return browserify({
    entries: 'app/main.jsx',
    'debug': true,
  })
  .transform(reactify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./.tmp'))
})

gulp.task('nodemon', function() {
  nodemon({
      script: 'server.js',
      ext: 'js',
      // tasks: ['lint'],
      ignore: ['public/', 'node_modules/']
    })
    .on('restart', function() {
      console.log('>> node restart');
    });
});

gulp.task('test', function () {
    return gulp
    .src('test/runner.html')
    .pipe(mochaPhantomJS());
});


gulp.task('watch', function() {
    //Watch .js files
  gulp.watch('app/**/*.+(jsx|js)');
    //Watch .scss files
  gulp.watch('app/styles/*.css');
 });

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./.tmp'));
});

gulp.task('serve', ['nodemon','watch','bundle','min','bower'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:8084',
    port: 9001
  })
})

gulp.task('production', ['build']);
gulp.task('heroku:production', ['production']);
gulp.task('build', ['nodemon','bundle', 'min','bower']);

