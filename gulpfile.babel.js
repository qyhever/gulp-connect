/**
 * gulp配置文件
 */
const gulp = require('gulp');
const connect = require('gulp-connect');
const autoprefixer = require('gulp-autoprefixer');
const less = require('gulp-less');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('connect', function() {
    connect.server({
        port: '8888',
        root: 'src',
        livereload: true
    });
});
gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(connect.reload());
});

gulp.task('less', function() {
    return gulp.src(['./src/style/*.less', './src/style/**/*.less'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 20 versions', '>1%', 'Firefox <= 20', 'ie 6', 'Opera <= 20'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: false //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('src/style'));
});

gulp.task('scss', function() {
    return gulp.src(['./src/style/*.scss', './src/style/**/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 20 versions', '>1%', 'Firefox <= 20', 'ie 6', 'Opera <= 20'],
            cascade: true,
            remove: false
        }))
        .pipe(gulp.dest('src/style'));
});

gulp.task('js', function() {
    return gulp.src(['./src/js/*.js', './src/js/**/*'])
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('mywatch', function() {
    gulp.watch(['./src/index.html', './src/views/*.html'], ['html']);
    gulp.watch(['./src/style/*.less', './src/style/**/*.less'], ['less', 'html']);
    gulp.watch(['./src/style/*.scss', './src/style/**/*.scss'], ['scss', 'html']);
    gulp.watch(['./src/js/*.js', './src/js/**/*'], ['js', 'html']);
});

gulp.task('all', function() {
    return gulp.start(['less', 'scss','js', 'html']);
});
gulp.task('run', ['connect', 'mywatch']);