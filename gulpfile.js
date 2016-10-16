var gulp = require('gulp');
var concat = require('gulp-concat');
var iife = require('gulp-iife');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

//////////  'gulp js': JavaScript build task  //////////
gulp.task('js', function() {
  gulp.src(['src/app.js', 'src/**/_module.js', 'src/**/*.js']) // load main app and sub-module definitions first
    .pipe(sourcemaps.init())  // create sourcemaps along the way...
      .pipe(iife())           // wrap each script in an IIFE to prevent global scope pollution
      .pipe(concat('app.js')) // concatenate all scripts into a single file
      .pipe(ngAnnotate())     // add DI annotations so uglify doesn't break angular code
      .pipe(uglify())         // uglify scripts
    .pipe(sourcemaps.write()) // save the sourcemaps
    .pipe(gulp.dest('build')) // write result to build directory
    .pipe(connect.reload())   // notify the livereload plugin of changes
});

//////////  'gulp html': HTML build task  //////////
gulp.task('html', function() {
  gulp.src('src/**/*.html')   // gather up all HTML files
    .pipe(gulp.dest('build')) // place them in the build directory
    .pipe(connect.reload());  // notify the livereload plugin of changes
});

gulp.task('sass', function() {
  gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

//////////  'gulp clean': task to clean the build directory  //////////
gulp.task('clean', function() {
  gulp.src('build', { read: false })
    .pipe(clean({ force: true}));
});

//////////  'gulp build' a simple one-time build task  //////////
gulp.task('build', ['js', 'html', 'sass']);

//////////  'gulp serve': run a local dev server (or 'npm start')  //////////
gulp.task('serve', ['build'], function() {

  // watch for JS changes
  gulp.watch('src/**/*.js', ['js']);

  // watch for HTML changes
  gulp.watch('src/**/*.html', ['html']);

  // watch for SASS changes
  gulp.watch('src/**/*.scss', ['sass']);

  // start the server with livereload enabled
  connect.server({
    root: 'build/',
    livereload: true,
    port: 8000
  });

});