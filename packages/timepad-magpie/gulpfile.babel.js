/* eslint-disable no-console */
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import _if from 'gulp-if';
import {argv} from 'yargs';
import del from 'del';

const isProduction = argv.production;
const paths = {
  scripts: {
    src: 'src/**/*.{js,js.flow}',
    dest: 'build/',
  },
  config: {
    src: 'src/config/**/*.*',
    dest: 'build/config/',
  },
};

export function lint() {
  return gulp.src(paths.scripts.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

export function clean() {
  return del(['build']);
}

export function config() {
  return gulp.src(paths.config.src)
    .pipe(gulp.dest(paths.config.dest));
}

export function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(_if(isProduction, eslint.failAfterError()))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.scripts.dest));
}

export function watch() {
  const onFilesChange = (path) => {
    console.log(`File '${path}' was changed, running tasks...`);
  };

  gulp.watch(paths.scripts.src, scripts).on('change', onFilesChange);
  gulp.watch(paths.config.src, config).on('change', onFilesChange);
}

export const build = gulp.series(clean, gulp.parallel(config, scripts));

export default build;
