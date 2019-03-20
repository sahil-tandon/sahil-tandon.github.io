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
    runSequence = require('run-sequence'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    replaceImgSrc = require('gulp-replace-image-src');

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
  return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))     //minify JS files
    .pipe(gulpIf('*.css', cssnano()))     //minify CSS files
    .pipe(gulp.dest(''))
});

/* ==[ Optimize Images and move to dist folder ]== */
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({      //caching images after optimizing
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

/* ==[ Copy fonts to dist folder ]== */
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

/* ==[ Replace and correct image paths on prod index.html file ]== */
gulp.task('replaceImgSrc', function() {
  gulp.src('index.html')
    .pipe(replaceImgSrc({
      prependSrc : 'dist/',
      keepOrigin : true
    }))
    .pipe(gulp.dest(''));
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
    ['useref', 'images', 'fonts'],
    'replaceImgSrc',
    callback
  )
});

/* ==[ default task ]== */
gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
});