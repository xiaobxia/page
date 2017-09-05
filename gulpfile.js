const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const babel = require("gulp-babel");
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const del = require('del');

const path = {
  dist: './dist',
  pug: './src/pug/*.pug',
  pugWatch: './src/pug',
  scss: './src/scss/*.scss',
  scssWatch: './src/scss',
  js: './src/js/*.js',
  jsWatch: './src/js',
  ico: './src/favicon.ico'
};

gulp.task('ico', function () {
  return gulp.src(path.ico)
    .pipe(gulp.dest(path.dist));
});

gulp.task('clean', function () {
  return del(path.dist);
});

gulp.task('pug', function () {
  return gulp.src(path.pug)
    .pipe(debug({title: 'unicorn:'}))
    .pipe(pug({
      doctype: 'html'
    })).pipe(gulp.dest(path.dist));
});

gulp.task('scss', function () {
  return gulp.src(path.scss)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist+'/css'))
    //局部更新，不会导致页面重刷（重刷意味着产生ajax请求，也意味着页面的状态变了）
    .pipe(browserSync.reload({stream:true}));
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
  gulp.watch(path.pugWatch, gulp.series('pug', serverReload));
  gulp.watch(path.scssWatch, gulp.series('scss'));
  gulp.watch(path.jsWatch, gulp.series('js', serverReload));
});

gulp.task('default', gulp.series('clean', 'ico', 'build', 'server', 'watch'));
