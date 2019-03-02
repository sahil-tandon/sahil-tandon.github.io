/* gulpfile.js
   ----------------------------- */

var gulp = require('gulp'),
    sass = require('gulp-sass');

/* ==[ Convert Sass to CSS ]== */
gulp.task('sass', function(){
  return gulp.src('app/scss/*.scss')
    .pipe(sass())     
    .pipe(gulp.dest('app/css'));
});

/* ==[ Watch for Changes ]== */
gulp.task('watch', function(){
  gulp.watch('app/scss/*.scss', gulp.series('sass'));
});