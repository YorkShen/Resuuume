var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var fs = require("fs");
var jade = require('gulp-jade');
var data = require('gulp-data');
var DOMParser = require('xmldom').DOMParser;
var minifyInline = require('gulp-minify-inline');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');

gulp.task('jade', function () {
    return gulp.src('src/jade/index.jade')
        .pipe(data(function () {
            return JSON.parse(fs.readFileSync('resume.json'))
        })).pipe(data(function () {
            var mark=new DOMParser().parseFromString(fs.readFileSync('src/res/mark.svg').toString(),'text/xml');
            return {"fs":fs,
                    "mark":mark}
        })).pipe(jade()).pipe(gulp.dest('dist'));
});

gulp.task('minify', function() {
    gulp.src('dist/*.html')
        .pipe(minifyInline())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', function () {
    return runSequence('jade','minify');
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
    gulp.watch(['src/**/*.+(jade|js|css|svg)','resume.json'],['build']);
    gulp.watch('dist/**/*.*', function () {
        browserSync.reload();
    });
});