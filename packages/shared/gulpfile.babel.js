/* eslint-disable no-console */
import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import _if from 'gulp-if';
import rimraf from 'rimraf';

function getEnvOptions() {
  const argv = process.argv.slice(2);
  const isProduction = argv.includes('--production');
  const hasFixFlag = argv.includes('--fix');
  return {
    failAfterError: isProduction,
    eslintFix: hasFixFlag,
    sourcemaps: !isProduction,
  };
}

function getPaths() {
  const commonDest = 'dist/';
  const preparedFlowFiles = 'src/prepared-flow-files/*.{js,js.flow}';

  return {
    dest: commonDest,
    javascript: {
      src: [
        'src/**/*.{js,js.flow}',
        '!src/**/*.spec.js', // skip test files
        `!${preparedFlowFiles}`, // skip prepated flow files
      ],
      dest: commonDest,
      fixDest: 'src',
    },
    preparedFlowFiles: {
      src: preparedFlowFiles,
      dest: commonDest,
    },
  };
}

const envOptions = getEnvOptions();
const paths = getPaths();

console.log('envOptions:', envOptions);

export function lint() {
  const isFileFixed = file => file.eslint != null && file.eslint.fixed;
  const isFileNotFixed = file => !isFileFixed(file);

  return gulp
    .src(paths.javascript.src)
    .pipe(
      eslint({
        fix: envOptions.eslintFix,
      })
    )
    .pipe(eslint.format())
    .pipe(_if(isFileNotFixed, eslint.failAfterError()))
    .pipe(_if(isFileFixed, gulp.dest(paths.javascript.fixDest)));
}

export function clean(callback) {
  return rimraf(paths.dest, callback);
}

export function buildJavaScript() {
  return gulp
    .src(paths.javascript.src, { sourcemaps: envOptions.sourcemaps })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(_if(envOptions.failAfterError, eslint.failAfterError()))
    .pipe(babel())
    .pipe(gulp.dest(paths.javascript.dest, { sourcemaps: envOptions.sourcemaps ? './.maps' : false }));
}

export function copyPreparedFlowFiles() {
  return gulp
    .src(paths.preparedFlowFiles.src)
    .pipe(gulp.dest(paths.preparedFlowFiles.dest));
}

export function watch() {
  const onFilesChange = path => {
    console.log(`File '${path}' was changed, running tasks...`);
  };

  gulp.watch(paths.javascript.src, buildJavaScript).on('change', onFilesChange);
}

export const build = gulp.series(clean, gulp.parallel([buildJavaScript, copyPreparedFlowFiles]));

export default build;
