/**
 * Created by Desyon on 12.05.2017.
 */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');

const files = {
  projectSrc: [
    'src/**/*.js',
  ],
  gulpSrc: [
    'gulpfile.js',
  ],
};

/**
 * Validates all files specified as sources above using eslint and the
 * .eslinrc.json configuration.
 */
gulp.task('validateSources', function () {
  return gulp.src(files.projectSrc)
  .pipe(eslint({configFile: '.eslintrc.json'}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

/**
 * Validates the gulpfile.js using eslint and the .eslinrc.json configuration.
 */
gulp.task('validateGulpfile', function () {
  return gulp.src(files.gulpSrc)
  .pipe(eslint({configFile: '.eslintrc.json'}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

/**
 * Default build task. Runs source and gulpfile validation in parallel.
 */
gulp.task('default', function(callback) {
  runSequence(['validateSources', 'validateGulpfile'], callback);
});
