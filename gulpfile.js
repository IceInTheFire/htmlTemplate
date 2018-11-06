const gulp = require('gulp');
const less = require('gulp-less')
const cleanCss = require('gulp-clean-css');
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const rev = require('./lib/gulp-rev/index');            //生成hash文件   自己更改了源码
const revReplace = require("gulp-rev-replace");
const gulpSequence = require('gulp-sequence')
const clean = require('gulp-clean');


gulp.task('less', function () {
    return gulp.src([
        'src/css/**.less',
        'src/css/**/**.less',
        '!src/css/common/**.less'
    ])
    .pipe(less())
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'));
});
gulp.task("uglify", function() {
    return gulp.src([
        'src/js/**.js',
        'src/js/**/**.js',
        '!src/js/common/**.js'
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
})
gulp.task('concatJs', function() {
    return gulp.src([
        'src/js/common/rem.js',
        'src/js/common/**.js'
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('common.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
gulp.task("cleanhtml", function() {
    return gulp.src("dist/views/**/**")
    .pipe(clean())
});
gulp.task('imgmin', function() {
    // gulp.src(['gulpDemo(Test)/img/*.jpg', 'gulpDemo(Test)/img/*.png'])
    return gulp.src("src/content/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content/images'))
});
gulp.task('move', function() {
    gulp.src([
        "src/content/**",
        "!src/content/images/*"
    ])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/content'))

    gulp.src([
        "src/lib/**"
    ])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/lib'))
});
gulp.task('rev',['less', 'uglify', 'concatJs','clean-md5'],function() {
    return gulp.src([
        'dist/css/**/**',
        'dist/js/**/**',
    ])
    .pipe(rev())
    // .pipe(gulp.dest('dist/rev'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev'))
});
gulp.task("clean-md5", function() {
    return gulp.src([
        'dist/rev/*.json'
    ])
    .pipe(clean())
})
gulp.task("htmlmin-watch", function(){
    const bundle = gulp.src("src/views/**/**")
    .pipe(htmlmin(
        {
            collapseWhitespace: true,    //去掉空格
            removeComments:true,    //删除html里的注释
            minifyCSS:true,    //压缩html里的style里的css样式
            minifyJS:true,    //压缩html里的script里的js代码
        }
    ))
    .pipe(gulp.dest('dist/views'));
    return bundle;
});
gulp.task("htmlmin",gulpSequence('rev', function(){
    const manifest = gulp.src([
        'dist/rev/rev-manifest.json',
    ]);
    const bundle = gulp.src("src/views/**/**")
    .pipe(htmlmin(
        {
            collapseWhitespace: true,    //去掉空格
            removeComments:true,    //删除html里的注释
            minifyCSS:true,    //压缩html里的style里的css样式
            minifyJS:true,    //压缩html里的script里的js代码
        }
    ))
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('dist/views'));
    return bundle;
}));


gulp.task('watch', function () {
    var cssWatcher = gulp.watch([
        'src/css/**.less',
        'src/css/**/**.less',
        '!src/css/common/**.less'
    ]   , ['less']);
    cssWatcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var jsConcatWatcher = gulp.watch([
        'src/js/common/**.js'], ['concatJs']);
    jsConcatWatcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var jsWatcher = gulp.watch([
        'src/js/**.js',
        'src/js/**/**.js',
        '!src/js/common/**.js'], ['uglify']);
    jsWatcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    var htmlWatcher = gulp.watch([
        'src/views/**.html',
        'src/views/**/**.html'
    ]   , ['htmlmin-watch']);
    htmlWatcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    //因为图片太多，导致gulp watch卡顿，所以，注释掉
    // var imgWatcher = gulp.watch([
    //     'src/content/images/*'
    // ]   , ['imgmin']);
    // imgWatcher.on('change', function (event) {
    //     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    // });
    //因为文件太多，导致gulp watch卡顿，所以，注释掉
    // var contentWatcher = gulp.watch([
    //     "src/content/**",
    //     "!src/content/images/*",
    //     "src/lib/**"
    // ], ['move']);
    contentWatcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
gulp.task("default",['htmlmin']);
gulp.task("lib",['move','imgmin']);
gulp.task('build',['htmlmin','move','imgmin']);