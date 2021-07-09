const gulp = require('gulp');
const del = require('del');
const zip = require('gulp-zip');
const run  = require('gulp-run-command').default;

function clean() {
    return del('dist/**', {force: true});
}

function copyFolder(folder) {
    return gulp
        .src([
            `${folder}/**/*`,
        ])
        .pipe(gulp.dest(`dist/${folder}`))
}

const copyApi = () => copyFolder('api');
const copyVendor = () => copyFolder('vendor');
const copyBuild = () => copyFolder('build');

function copyFiles() {
    return gulp
        .src([
            "*.php",
        ])
        .pipe(gulp.dest("dist"))
}

function createZip() {
    return gulp
        .src('dist/**/*')
        .pipe(zip('fdtk-wordpress.zip'))
        .pipe(gulp.dest('dist'));
}

gulp.task('buildTask', run('npm run build-wp'));

gulp.task('build', gulp.series(
    clean,
    'buildTask',
    copyFiles,
    copyApi,
    copyVendor,
    copyBuild,
    createZip
))
