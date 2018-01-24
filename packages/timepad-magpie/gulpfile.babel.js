import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

const paths = {
    scripts: {
        src: 'src/**/*.js',
        dest: 'build/'
    },
    config: {
        src: 'src/config/**/*.*',
        dest: 'build/config/'
    }
};

export function clean() {
    return del(['build']);
}

export function config() {
    return gulp.src(paths.config.src)
        .pipe(gulp.dest(paths.config.dest));
}

export function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
        .pipe(babel())
        .pipe(gulp.dest(paths.scripts.dest));
}

export function watch() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.config.src, config);
}

export const build = gulp.series(clean, gulp.parallel(config, scripts));

export default build;