const gulp = require('gulp');
const webserver = require('gulp-webserver'); // 启服务
const babel = require('gulp-babel'); // babel
const rename = require('gulp-rename'); // 改名
const sass = require('gulp-sass'); // 编译sass
const autoprefixer = require('gulp-autoprefixer'); //添加前缀
const mincss = require('gulp-clean-css'); // 压缩CSS
const uglify = require('gulp-uglify'); // 压缩JS
const minhtml = require('gulp-htmlmin'); // 压缩HTML
const concat = require('gulp-concat'); // 合并


// 编译sass，添加前缀，压缩,改名,合并CSS任务
gulp.task('devCSS', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        // .pipe(autoprefixer())
        // .pipe(mincss())
        // .pipe(rename(function(path) {
        //     path.basename += "-min"
        // }))
        .pipe(gulp.dest('./src/css'))
});

// 合并CSS文件
gulp.task('concatCSS', () => {
    return gulp.src('./dist/css/**/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./src/css'))
});

// 启服务
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 8888,
            proxies: [{
                source: '/users/login',
                target: 'http://localhost:3000/users/login'
            }]
        }))
});


// babel,uglify编译及压缩JS
gulp.task('devJS', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./src/js'));
});

// 监听CSS及JS
gulp.task('watching', () => {
    return gulp.watch(['./src/scss/**/*.scss'], gulp.series('devCSS'));
});

// 管理任务
gulp.task('default', gulp.series('devCSS', 'concatCSS', 'server', 'watching'));