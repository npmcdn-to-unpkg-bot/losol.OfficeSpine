/// <binding AfterBuild='ts' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    ts = require('gulp-typescript'),
    gulp = require('gulp'),
    clean = require('gulp-clean');

var webroot = "./wwwroot/";

var paths = {
    js: webroot + "js/**/*.js",
    minJs: webroot + "js/**/*.min.js",
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/site.min.js",
    concatCssDest: webroot + "css/site.min.css",
    lib: webroot + "lib/"
};

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

//Copys scripts to wwwroot/lib folder
// Thanks MITHUN PATTANKAR for idea for the two tasks below http://www.mithunvp.com/angular-2-in-asp-net-5-typescript-visual-studio-2015/
gulp.task("CopyScripts", () => {
    gulp.src([
            'core-js/client/shim.min.js',
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'jquery/dist/jquery.*js',
            'bootstrap/dist/js/bootstrap*.js'
    ], {
        cwd: "node_modules/**"
    })
        .pipe(gulp.dest("./wwwroot/lib"));
});


// Compile typescript
var tsProject = ts.createProject('scripts/tsconfig.json');
gulp.task('ts', function (done) {
    //var tsResult = tsProject.src()
    var tsResult = gulp.src([
            "scripts/*.ts"
    ])
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest('./wwwroot/app'));
});
