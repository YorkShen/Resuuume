var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var fs = require("graceful-fs");
var pug = require('gulp-pug');
var data = require('gulp-data');
var DOMParser = require('xmldom').DOMParser;
var minifyInline = require('gulp-minify-inline');
var htmlmin = require('gulp-htmlmin');
var svgmin = require('gulp-svgmin');
var del = require('del');

gulp.task('clean', gulp.series(function () {
    return del('dist');
}));

gulp.task('pug', gulp.series(function () {
    return gulp.src('src/jade/index.pug')
        .pipe(data(function () {
            return JSON.parse(fs.readFileSync('resume.json'))
        })).pipe(data(function () {
            var mark = new DOMParser().parseFromString(fs.readFileSync('dist/res/mark.svg').toString(), 'text/xml');
            return {
                "fs": fs,
                "mark": mark
            }
        })).pipe(pug()).pipe(gulp.dest('dist')).pipe(browserSync.reload({
            stream: true
        }));
}));

gulp.task('minify', gulp.series(function () {
    return gulp.src('dist/*.html')
        .pipe(minifyInline())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'));
}));

gulp.task('min-images', gulp.series(function () {
    return gulp.src('src/res/*.svg')
        .pipe(svgmin({
            plugins: [{
                cleanupIDs: false
            }]
        }))
        .pipe(gulp.dest('dist/res'));
}));

gulp.task('build', gulp.series('min-images', 'pug', 'minify'));

gulp.task('default', gulp.series('clean', 'build'));

function reload(done) {
    browserSync.reload();
    done();
}

function serve(done){
    browserSync.init({
        server: {
            baseDir: 'dist',
            index: "index.html"
        }
    });
    done();
}

function watchfile(){
    gulp.watch(['src/**/*.+(jade|js|css|svg)', 'resume.json'], gulp.series('build', reload));
}


gulp.task('dev', gulp.series('default', gulp.parallel(serve, watchfile)));