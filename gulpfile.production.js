const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const cleanCSS = require('gulp-clean-css');
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
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.dist+'/css'));
});

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(path.dist+'/js'));
});


gulp.task('build', gulp.parallel('pug', 'scss', 'js'));

gulp.task('default', gulp.series('clean', 'build'));
