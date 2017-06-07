/**
 * Created by Desyon on 12.05.2017.
 */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');

const files = {
  serverSrc: [
    'src/server/**/*.js',
  ],
  clientSrc: [
    'src/client/*.js',
    'src/client/views/**/*.js',
  ],
  clientStylesheets: [
    'src/client/*.less',
  ],
  bootstrapStylesheets: [
    'node_modules/bootstrap/dist/**/*.css',
  ],
  gulpSrc: [
    'gulpfile.js',
  ],
};

/**
 * Validates all files specified as sources above using eslint and the
 * .eslinrc.json configuration.
 */
gulp.task('lint', function () {
  return gulp.src(files.serverSrc)
  .pipe(eslint({configFile: '.eslintrc.json'}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

/**
 * Validates the gulpfile.js using eslint and the .eslinrc.json configuration.
 */
gulp.task('lintGulpfile', function () {
  return gulp.src(files.gulpSrc)
  .pipe(eslint({configFile: '.eslintrc.json'}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('uglify', function () {
  console.log(stuff);
});

/**
 * Default build task. Runs source and gulpfile validation in parallel.
 */
gulp.task('default', function (callback) {
  runSequence(['lint', 'lintGulpfile'], callback);
});
