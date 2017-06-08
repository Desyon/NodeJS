'use strict';
/**
 * Created by Desyon on 12.05.2017.
 */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const tplCache = require('gulp-angular-templatecache');
const inject = require('gulp-inject');
const ngConst = require('gulp-ng-constant');
const path = require('path');
const pump = require('pump');
const del = require('del');

const targetDir = 'build';
const clientTarget = targetDir + '/client';
const serverTarget = targetDir + '/server';

const files = {
  serverSrc: [
    'src/server/**/*.js',
  ],
  clientSrc: [
    'src/client/**/*.js',
  ],
  clientIndex: [
    'src/client/index.html',
  ],
  clientStyle: [
    'src/client/styles/main.less',
  ],
  clientTemplates: [
    'src/client/**/*.tpl.html',
  ],
  clientConst: [
    'src/client/app/config.json',
  ],
  vendorScripts: [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    'node_modules/angular-ui-notification/dist/angular-ui-notification.min.js',
    'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
  ],
  vendorAssets: [
    'node_modules/bootstrap/fonts/*',
  ],
};

function clean() {
  return del([targetDir]);
}

// Linting
function lintServer() {
  return gulp
  .src(files.serverSrc)
  .pipe(eslint({configFile: '.eslintrc.json'}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
}

function lintClient() {
  return gulp.src(files.clientSrc)
  .pipe(eslint({configFile: '.eslintrc.json'}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
}

function lintGulpfile() {
  return gulp
  .src('gulpfile.js')
  .pipe(eslint({configFile: '.eslintrc.json'}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
}

/* Server */
function copyServerFiles() {
  return gulp
  .src(files.serverSrc)
  .pipe(gulp.dest(serverTarget));
}

/* Client */
// Assets
function copyFonts() {
  return gulp
  .src(files.vendorAssets)
  .pipe(gulp.dest(clientTarget + '/fonts'));
}

function copyFrameworkScripts() {
  return gulp
  .src(files.vendorScripts)
  .pipe(gulp.dest(clientTarget + '/assets/scripts'));
}

function compileCSS() {
  return gulp
  .src(files.clientStyle)
  .pipe(less())
  .pipe(cssmin())
  .pipe(gulp.dest(clientTarget + '/assets'));
}

// Source Files
function uglifyClientJS(ret) {
  return pump([
        gulp.src(files.clientSrc),
        babel({presets: ['es2015']}),
        uglify(),
        gulp.dest(clientTarget),
      ], ret
  );
}

function compileTemplates() {
  return gulp
  .src(files.clientTemplates)
  .pipe(tplCache({
    module: 'ngCalendarApp.templates',
    standalone: true,
  }))
  .pipe(gulp.dest(clientTarget + '/app'));
}

function configureIndex() {
  let injectFiles = gulp.src(['./**/*.js', './assets/**/*.css'],
      {read: false, cwd: path.join(__dirname, clientTarget)});

  return gulp
  .src(files.clientIndex)
  .pipe(inject(injectFiles, {addRootSlash: false, removeTags: true}))
  .pipe(gulp.dest(clientTarget));
}

function constants() {
  return gulp
  .src(files.clientConst)
  .pipe(ngConst({
    name: 'ngCalendarApp.config',
    deps: [],
    wrap: false,
  }))
  .pipe(gulp
      .dest(clientTarget + '/app')
  );
}

/* Task collections */
const getClientAssets = gulp.parallel(
    copyFonts,
    copyFrameworkScripts,
    compileCSS,
    compileTemplates,
    uglifyClientJS
);

/**
 * Gulp tasks
 */

gulp.task('clean', gulp.series(
    clean
));

gulp.task('lint', gulp.parallel(
    lintServer,
    lintClient,
    lintGulpfile
));

gulp.task('build',
    gulp.series(
        clean,
        gulp.parallel(
            getClientAssets,
            copyServerFiles),
        constants,
        configureIndex
    )
);
