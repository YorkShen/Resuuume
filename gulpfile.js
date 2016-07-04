var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var fs = require("fs");
var jade = require('gulp-jade');
var data = require('gulp-data');
var DOMParser = require('xmldom').DOMParser;
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');

gulp.task('jade', function () {
    gulp.src('src/jade/index.jade')
        .pipe(data(function () {
            return JSON.parse(fs.readFileSync('resume.json'))
        })).pipe(data(function () {
            var mark=new DOMParser().parseFromString(fs.readFileSync('src/res/mark.svg').toString(),'text/xml');
            return {"fs":fs,
                    "mark":mark}
        })).pipe(jade()).pipe(gulp.dest('dist'))
});

gulp.task('build', ['jade'], function () {

});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: 'dist',
            index: "index.html"
        }
    })
});

gulp.task('server', ['build', 'serve'], function () {
    gulp.watch(['src/**/*.+(jade|html|js|css|svg)','resume.json'],['jade']);
    gulp.watch('dist/**/*.*', function () {
        browserSync.reload();
    });
});