var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('build', function () {

});

gulp.task('serve', function () {
    browserSync.init({
        server:{
            baseDir: 'src',
            index: "html/index.html"
        }
    })
});

gulp.task('server', ['build', 'serve'],function(){
    gulp.watch('src/**/*.*', function () {
        browserSync.reload();
    });
});