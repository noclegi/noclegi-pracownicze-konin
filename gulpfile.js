var gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload');

// config to hold the path files
var paths = {
  server: ['routes/**/*.js', 'app.js', 'config.js'],
  client: ['./public/js/**/*.js', '!./public/js/**/*.min.js']
};

// Made the tasks simpler and modular
// so that every task handles a particular build/dev process
// If there is any improvement that you think can help make these tasks simpler
// open an issue at https://github/com/ngenerio/generator-express-simple
// It can be made simpler

// Lint the javascript server files
gulp.task('lintserver', function() {
  gulp
    .src(paths.server)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

// Lint the javascript client files
gulp.task('lintclient', function() {
  gulp
    .src(paths.client)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('buildJs', function() {
  gulp
    .src(paths.client.concat([
      './public/vendor/jquery/dist/jquery.min.js',
      './public/vendor/bootstrap/dist/js/bootstrap.min.js'
    ]))
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./public/js'))
});


// Minify the css files to reduce the size of the files
// To avoid this task, import all the other stylus files into one file
// and rather process that file into a single file and jump straight to concatenation
// You can learn more about this from the twitter bootstrap project
gulp.task('buildCss', function() {
  gulp
    .src(['./public/vendor/bootstrap/dist/css/bootstrap.min.css', './public/stylus/**/*.styl'])
    .pipe(stylus())
    .pipe(minifyCss())
    .pipe(concat('app.styles.min.css'))
    .pipe(gulp.dest('./public/css'));
});

// Watch the various files and runs their respective tasks
gulp.task('watch', function() {
  gulp.watch(paths.server, ['lintserver']);
  gulp.watch(paths.client, ['lintclient', 'buildJs']);
  gulp.watch(['./public/stylus/**/*.styl'], ['buildCss']);
  gulp
    .src(['./views/**/*.jade', './public/css/**/*.min.css', './public/js/**/*.min.js'])
    .pipe(watch())
    .pipe(livereload());
});

gulp.task('lint', ['lintserver', 'lintclient']);
gulp.task('default', ['lint', 'buildCss', 'buildJs', 'watch']);
