let gulp = require('gulp'),
    uglify = require('gulp-uglifyes'),
    jshint = require('gulp-jshint');


gulp.task('default', () => {

    gulp.src(['config/*.js','persistencia/*.js','routes/*.js' ])
    .pipe(uglify({ 
        mangle: false, 
        ecma: 6 
     }))
    .pipe(gulp.dest('dist/js'));

    // gulp.src(['condig/*.js', 'persistencia/*.js'])
    // .pipe(jshint())
    // .pipe(jshint.reporter('jshint-stylish'))
    // .pipe(jshint.reporter('fail'));


});
