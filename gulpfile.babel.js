/**
 * gulp配置文件
 */
const gulp = require('gulp');
const connect = require('gulp-connect');
const autoprefixer = require('gulp-autoprefixer');
const less = require('gulp-less');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const proxy = require('http-proxy-middleware');

gulp.task('connect', function() {
    connect.server({
        port: '5000',
        root: 'dev',
        livereload: true,
        middleware: function(connect, opt) {
            return [
                proxy('/douban',  {
                    target: 'http://api.douban.com/v2/movie',
                    changeOrigin:true
                })
            ]
        }
    });
});

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(connect.reload())
        .pipe(gulp.dest('dev'));
});

gulp.task('css', function() {
    return gulp.src(['src/style/*.css', 'src/style/**/*.css'])
        .pipe(autoprefixer({
            browsers: ['last 20 versions', '>1%', 'Firefox <= 20', 'ie 6', 'Opera <= 20'],
            cascade: true,
            remove: false
        }))
        .pipe(gulp.dest('dev/style'));
});

gulp.task('less', function() {
    return gulp.src(['src/style/*.less', 'src/style/**/*.less'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 20 versions', '>1%', 'Firefox <= 20', 'ie 6', 'Opera <= 20'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: false //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dev/style'));
});

gulp.task('scss', function() {
    return gulp.src(['src/style/*.scss', 'src/style/**/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 20 versions', '>1%', 'Firefox <= 20', 'ie 6', 'Opera <= 20'],
            cascade: true,
            remove: false
        }))
        .pipe(gulp.dest('dev/style'));
});

gulp.task('js', function() {
    return gulp.src(['src/js/*.js', 'src/js/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dev/js'));
});

gulp.task('img', function(){
    return gulp.src(['src/images/*','src/images/**/*'])
    .pipe(gulp.dest('dev/images'));
});

gulp.task('lib', function(){
    return gulp.src(['src/lib/*','src/lib/**/*'])
    .pipe(gulp.dest('dev/lib'));
});

gulp.task('mywatch', function() {
    gulp.watch(['src/index.html', 'src/views/*.html'], ['html']);
    gulp.watch(['src/style/*.css', 'src/style/**/*.css'], ['css', 'html']);
    gulp.watch(['src/style/*.less', 'src/style/**/*.less'], ['less', 'html']);
    gulp.watch(['src/style/*.scss', 'src/style/**/*.scss'], ['scss', 'html']);
    gulp.watch(['src/js/*.js', 'src/js/**/*.js'], ['js', 'html']);
    gulp.watch(['src/images/*', 'src/images/**/*'], ['img', 'html']);
    gulp.watch(['src/lib/*', 'src/lib/**/*'], ['lib', 'html']);
});

gulp.task('all', function() {
    return gulp.start(['html', 'css','less', 'scss','js','lib','img']);
});
gulp.task('dev', ['all','connect', 'mywatch']);