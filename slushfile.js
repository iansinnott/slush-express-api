/*
 * slush-express-api
 * https://github.com/iansinnott/slush-express-api
 *
 * Copyright (c) 2015, Ian Sinnott
 * Licensed under the MIT license.
 */

'use strict';

var gulp     = require('gulp'),
    install  = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename   = require('gulp-rename'),
    inquirer = require('inquirer'),
    path     = require('path'),
    exec     = require('shelljs').exec,
    _        = require('underscore.string');

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

/**
 * Get a npm-formatted author string if the user has set their user information
 * in git. If they don't have git it will use the output of `whoami` as the
 * default.
 */
function getAuthor() {
  var hasGit = !exec('which git', { silent: true }).code;

  if (!hasGit)
    return exec('whoami').output.trim();

  var name   = exec('git config --get user.name', { silent: true }).output.trim(),
      email  = exec('git config --get user.email', { silent: true }).output.trim(),
      url    = exec('git config --get user.url', { silent: true }).output.trim(),
      author = [];

  if (name) author.push(name);
  if (email) author.push('<' + email + '>');
  if (url) author.push('(' + url + ')');

  return author.join(' ');
}

var defaults = (function () {
    var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        workingDirName = process.cwd().split('/').pop().split('\\').pop(),
        osUserName = homeDir && homeDir.split('/').pop() || 'root',
        configFile = homeDir + '/.gitconfig',
        user = {};
    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }
    return {
        appName: workingDirName,
        userName: format(user.name) || osUserName,
        authorEmail: user.email || ''
    };
})();

gulp.task('default', function (done) {
    var prompts = [{
        name: 'name',
        message: 'What is the name of your project?',
        default: defaults.appName
    }, {
        name: 'appDescription',
        message: 'What is the description?'
    }, {
        name: 'version',
        message: 'What is the version of your project?',
        default: '0.1.0'
    }, {
        type:'input',
        name: 'author',
        message: 'Author:',
        'default': getAuthor()
    }, {
        type:'input',
        name: 'main',
        message: 'Entrypoint:',
        'default': 'index.js'
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Continue?'
    }];
    //Ask
    inquirer.prompt(prompts,
        function (answers) {
            if (!answers.moveon) {
                return done();
            }
            answers.appNameSlug = _.slugify(answers.name);
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(rename(function (file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function () {
                    done();
                });
        });
});
