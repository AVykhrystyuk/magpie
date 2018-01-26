import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';

import del from 'del';

const paths = {
  scripts: {
    src: 'src/**/*.js',
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
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(gulp.dest(paths.scripts.dest));
}

export function watch() {
  const onFilesChange = (event) => {
    console.log(`File ${event.path} was ${event.type}, running tasks...`);
  };

  gulp.watch(paths.scripts.src, scripts).on('change', onFilesChange);
  gulp.watch(paths.config.src, config).on('change', onFilesChange);
}

export const build = gulp.series(clean, gulp.parallel(config, scripts));

export default build;
