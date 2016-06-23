var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webpackConfigProd = require('./webpack.config.prod');
var rimraf = require('gulp-rimraf');
var shell = require('gulp-shell');

var devPath = './';
var distPath = '../site/static';

gulp.task('webpack', function () {
  return gulp
    .src(devPath)
    .pipe(webpack(webpackConfigProd))
    .pipe(gulp.dest(distPath));
});

gulp.task('images', function () {
  return gulp
    .src(devPath + '/images/*.*')
    .pipe(gulp.dest(distPath + '/images'));
});

gulp.task('clean', function () {
  return gulp.src(distPath, { read: false })
    .pipe(shell('rm -rf ' + distPath));
});


gulp.task('default', ['clean', 'images', 'webpack']);
