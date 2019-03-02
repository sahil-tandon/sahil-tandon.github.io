/* gulpfile.js
   ----------------------------- */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

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
      baseDir: './app'
    },
  });
});

/* ==[ Watch for Changes ]== */
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('app/css/*.css', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
});

