/* gulpfile.js
   ----------------------------- */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano');

/* ==[ Convert Sass to CSS ]== */
gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'));
});

/* ==[ Live-reload on Browser ]== */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

/* ==[ Concatenate specified files in HTML ]== */
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))     //minify JS files
    .pipe(gulpIf('*.css', cssnano()))     //minify CSS files
    .pipe(gulp.dest(''))
});

/* ==[ Watch for Changes ]== */
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('app/css/*.css', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
});