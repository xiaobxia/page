const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const babel = require("gulp-babel");
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const del = require('del');

const path = {
  dist: './dist',
  pug: './src/pug/*.pug',
  scss: './src/scss/*.scss',
  js: './src/js/*.js'
};

gulp.task('clean', function () {
  return del(path.dist);
});

gulp.task('pug', function buildHTML() {
  return gulp.src(path.pug)
    .pipe(pug({
      doctype: 'html'
    })).pipe(gulp.dest(path.dist));
});

gulp.task('scss', function () {
  return gulp.src(path.scss)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist+'/css'));
});

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist+'/js'));
});

gulp.task('server', function (cb) {
  browserSync({
    server: {
      baseDir: path.dist
    },
    port: 8080,
    notify: false,
    ghostMode: false,
    open: true
  }, cb);
});

gulp.task('build', gulp.parallel('pug', 'scss', 'js'));

gulp.task('watch', function () {
  function serverReload(cb) {
    browserSync.reload();
    cb();
  }
  //watch的时候不clean
  gulp.watch(path.pug, gulp.series('pug', serverReload));
  gulp.watch(path.scss, gulp.series('scss', serverReload));
  gulp.watch(path.js, gulp.series('js', serverReload));
});

gulp.task('default', gulp.series('clean', 'build', 'server', 'watch'));
