var gulp = require('gulp');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var notify = require('gulp-notify');
var typescript = require('gulp-typescript');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
require('./clean');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
var typescriptCompiler = typescriptCompiler || null;
gulp.task('build-system', function () {
  if (!typescriptCompiler) {
    typescriptCompiler = typescript.createProject('tsconfig.json', {
      "typescript": require('typescript')
    });
  }

  return gulp.src(paths.dtsSrc.concat(paths.source))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(changed(paths.output, { extension: '.ts' }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(typescriptCompiler())
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: './' }))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(changed(paths.output, { extension: '.html' }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.output));
});

// copies changed css files to the output directory
gulp.task('build-scss', function () {
  return gulp.src(paths.scss)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(changed(paths.output, { extension: '.scss' }))
    .pipe(sass())
    .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('build-system', 'build-html', 'build-scss'))
);