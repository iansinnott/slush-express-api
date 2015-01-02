var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    lint    = require('gulp-jshint');

module.exports = function() {
  nodemon({ script: 'bin/www', ext: 'js'});
};
