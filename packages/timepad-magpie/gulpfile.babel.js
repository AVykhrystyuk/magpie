/* eslint-disable no-console */
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import _if from 'gulp-if';
import notify from 'gulp-notify';
import del from 'del';

const argv = process.argv.slice(2);
const isProduction = argv.includes('--production');
const hasFixFlag = argv.includes('--fix');

console.log('isProduction:', isProduction);
console.log('hasFixFlag:', hasFixFlag);

const paths = {
  javascript: {
    src: 'src/**/*.{js,js.flow}',
    dest: 'build/',
    fixDest: 'src',
  },
  config: {
    src: 'src/api/impl/config/**/*.*',
    dest: 'build/api/impl/config/',
  },
};

const isFileFixed = file => file.eslint != null && file.eslint.fixed;
const isFileNotFixed = file => !isFileFixed(file);

export function lint() {
  return gulp
    .src(paths.javascript.src)
    .pipe(
      eslint({
        fix: hasFixFlag,
      })
    )
    .pipe(eslint.format())
    .pipe(_if(isFileNotFixed, eslint.failAfterError()))
    .pipe(_if(isFileFixed, gulp.dest(paths.javascript.fixDest)));
}

export function clean() {
  return del(['build']);
}

export function config() {
  return gulp.src(paths.config.src).pipe(gulp.dest(paths.config.dest));
}

export function javascript() {
  return gulp
    .src(paths.javascript.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(_if(isProduction, eslint.failAfterError()))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.javascript.dest))
    .pipe(
      notify({
        onLast: true,
        title: 'Build Notification',
        message: 'JavaScript is built successfully',
      })
    );
}

export function watch() {
  const onFilesChange = path => {
    console.log(`File '${path}' was changed, running tasks...`);
  };

  gulp.watch(paths.javascript.src, javascript).on('change', onFilesChange);
  gulp.watch(paths.config.src, config).on('change', onFilesChange);
}

export const build = gulp.series(clean, gulp.parallel(config, javascript));

export default build;
