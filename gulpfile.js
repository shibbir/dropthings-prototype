var gulp         = require("gulp"),
    del          = require("del"),
    uglify       = require("gulp-uglify"),
    concat       = require("gulp-concat"),
    rename       = require("gulp-rename"),
    minifycss    = require("gulp-minify-css"),
    autoprefixer = require("gulp-autoprefixer");

var paths = {
    css: [
        "client/bower_components/bootstrap/dist/css/bootstrap.css",
        "client/bower_components/toastr/toastr.css",
        "client/bower_components/font-awesome/css/font-awesome.css",
        "client/css/site.css"
    ],
    scripts: {
        libs: [
            "client/bower_components/jquery/dist/jquery.js",
            "client/bower_components/angular/angular.js",
            "client/bower_components/bootstrap/dist/js/bootstrap.js",
            "client/bower_components/toastr/toastr.js",
            "client/bower_components/lodash/dist/lodash.js"
        ],
        apps: [
            "client/js/app.js",

            "client/js/services/apiService.js",
            "client/js/services/notifierService.js",
            "client/js/services/widgetService.js",
            "client/js/services/widgetHtmlBuilderService.js",

            "client/js/directives/onFinishRenderDirective.js",

            "client/js/controllers/baseCtrl.js",
            "client/js/controllers/dashboardCtrl.js"
        ]
    },
    fonts: [
        "client/bower_components/font-awesome/fonts/FontAwesome.otf",
        "client/bower_components/font-awesome/fonts/fontawesome-webfont.eot",
        "client/bower_components/font-awesome/fonts/fontawesome-webfont.svg",
        "client/bower_components/font-awesome/fonts/fontawesome-webfont.ttf",
        "client/bower_components/font-awesome/fonts/fontawesome-webfont.woff"
    ]
};

gulp.task("clean", function(cb) {
    del(["client/build"], cb);
});

gulp.task("fonts", ["clean"], function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest("client/build/fonts"));
});

gulp.task("css", ["clean"], function() {
    return gulp.src(paths.css)
        .pipe(autoprefixer("last 10 version"))
        .pipe(concat("all.css"))
        .pipe(gulp.dest("client/build/css"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(minifycss())
        .pipe(gulp.dest("client/build/css"));
});

gulp.task("scripts", ["clean"], function() {
    return gulp.src(paths.scripts.libs)
        .pipe(concat("all.js"))
        .pipe(gulp.dest("client/build/js"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(gulp.dest("client/build/js"));
});

gulp.task("watch", function() {
    //gulp.watch(paths.scripts, ["scripts"]);
    gulp.watch(paths.css, ["css", "fonts"]);
});

gulp.task("default", ["watch", "css", "fonts", "scripts"]);