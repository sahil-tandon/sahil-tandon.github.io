/* gulpfile.js
   ----------------------------- */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    runSequence = require('run-sequence');

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

/* ==[ Concatenate specified files in HTML and generate prod index.html ]== */
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))     //minify JS files
    .pipe(gulpIf('*.css', cssnano()))     //minify CSS files
    .pipe(gulp.dest(''))
});

/* ==[ Clean up dist folder ]== */
gulp.task('cleanDist', function() {
  return del.sync('dist');
});

/* ==[ Watch for Changes ]== */
gulp.task('watch', function() {
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('app/css/*.css', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
});

/* ==[ Run prod build ]== */
gulp.task('build', function(callback) {
  runSequence(
    'cleanDist',
    'sass',
    'useref',
    callback
  )
});

/* ==[ default task ]== */
gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
});