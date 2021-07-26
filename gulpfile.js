const argv = require('yargs').argv;
const gulp = require('gulp');
const del = require('del');
const zip = require('gulp-zip');
const run = require('gulp-run-command').default;
const concat = require('gulp-concat');
const browserSync = require('browser-sync');

const port = argv.port || 3000;

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

function copyFilesToTemp() {
    return gulp
        .src(['../../themes/focusblog/style.css', '../../themes/focusblog-child/style.css'])
        .pipe(gulp.dest('temp/'));
}

function createZip() {
    return gulp
        .src('dist/**/*')
        .pipe(zip('fdtk-wordpress.zip'))
        .pipe(gulp.dest('dist'));
}

function browserSyncTask() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        ui: {
            port: port + 1
        },
        port: port
    });
}

function watchFiles() {
    gulp.watch('build/**/*.css').on('all', () => browserSync.reload("*.css"));
    gulp.watch('build/**/*.js').on('all', () => browserSync.reload("*.js"));
    gulp.watch('./*.html', cb => {
        browserSync.reload();
        cb();
    })
}

gulp.task('dev', gulp.series(
    copyFilesToTemp,
    gulp.parallel(
        run('npm start'),
        browserSyncTask,
        watchFiles
    )
));

gulp.task('buildTask', run('npm run build-wp'));

gulp.task('build', gulp.series(
    clean,
    'buildTask',
    copyFiles,
    copyApi,
    copyVendor,
    copyBuild,
    createZip
));

