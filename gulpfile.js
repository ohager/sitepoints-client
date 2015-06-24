var gulp = require('gulp');
var sequence = require('gulp-sequence');
var jshint = require('gulp-jshint');
var jsstylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var inject = require('gulp-inject');


gulp.task('release', function() {
    return gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jsstylish))
        .pipe(concat('spc.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('inject', function () {
    var target = gulp.src('./example/index.html');
    var sources = gulp.src(['./js/**/*.js', '!./js/spc.js'], {read: false});
    return  target.pipe(inject(sources,{relative: true}))
                    .pipe(gulp.dest('./example'));
});

gulp.task('validate', function () {
    return  gulp.src(['./js/**/*.js'])
                .pipe(jshint())
                .pipe(jshint.reporter(jsstylish))
                .pipe(gulp.dest('./js'));
});

gulp.task('default', sequence('validate', 'inject'));


