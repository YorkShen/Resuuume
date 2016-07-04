var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var fs = require("fs");
var jade = require('gulp-jade');
var data = require('gulp-data');
var DOMParser = require('xmldom').DOMParser;

gulp.task('jade', function () {
    gulp.src('src/jade/index.jade')
        .pipe(data(function () {
            return JSON.parse(fs.readFileSync('src/data/resume.json'))
        })).pipe(data(function () {
            var mark=new DOMParser().parseFromString(fs.readFileSync('src/res/mark.svg').toString(),'text/xml');
            return {"fs":fs,
                    "mark":mark}
        }))
        .pipe(jade()).pipe(gulp.dest('dist'))
});

gulp.task('build', function () {

});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: 'src',
            index: "html/index.html"
        }
    })
});

gulp.task('server', ['build', 'serve'], function () {
    gulp.watch('src/**/*.*', function () {
        browserSync.reload();
    });
});