/**
 * Created by Desyon on 12.05.2017.
 */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const del = require('del');
const runSequence = require('run-sequence');

const targetDir = 'build';

const files = {
  serverSrc: [
    'src/server/**/*.js',
  ],
  clientSrc: [
    'src/client/**/*.js',
  ],
  clientStyle: [
    'src/client/styles/main.less',
  ],
  clientTemplates: [
    'src/client/**/*.hmtl',
  ],
  vendorScripts: [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    'node_modules/angular-ui-notification/dist/angular-ui-notification.min.js',
  ],
  vendorAssets: [
    'node_modules/bootstrap/fonts/*',
  ],
};

gulp.task('clean', function () {
  return del([targetDir]);
});

/**
 * Validates all files specified as sources above using eslint and the
 * .eslinrc.json configuration.
 */
gulp.task('lintServer', function () {
  return gulp.src(files.serverSrc)
  .pipe(eslint({configFile: '.eslintrc.json'}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('lintClient', function () {
  return gulp.src(files.clientSrc)
  .pipe(eslint({configFile: '.eslintrc.json'}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('lintGulpfile', function () {
  return gulp.src('gulpfile.js')
  .pipe(eslint({configFile: '.eslintrc.json'}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

/**
 * Default build task. Runs source and gulpfile validation in parallel.
 */

gulp.task('lint', function (ret) {
  runSequence(['lintServer', 'lintClient', 'lintGulpfile'], ret);
});

gulp.task('default', function (ret) {
  runSequence('clean', 'lint', ret);
});
