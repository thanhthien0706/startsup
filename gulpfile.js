var gulp = require("gulp");
var connect = require("gulp-connect");
var fileinclude = require("gulp-file-include");
var sass = require("gulp-sass");
var prettify = require("gulp-jsbeautifier");
var useref = require("gulp-useref");
var gulpif = require("gulp-if");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-clean-css");
var imagemin = require("gulp-imagemin");
var del = require("del");
var htmlhint = require("gulp-htmlhint");

var babel = require("gulp-babel");
var browserSync = require("browser-sync").create();

gulp.sources = {
  src: "./src",
  dev: "./dist",
  dist: "./dist"
};

// Start server dev
gulp.task("connect:dev", () => {
  connect.server({
    root: [gulp.sources.dev, "./"],
    livereload: true,
    port: 9000,
    host: "0.0.0.0",
    fallback: gulp.sources.dev + "/index.html"
  });
});

// Start server product
gulp.task("connect:prod", () => {
  connect.server({
    root: [gulp.sources.dist],
    livereload: true,
    port: 9090,
    host: "0.0.0.0",
    fallback: gulp.sources.dist + "/index.html"
  });
});

gulp.task("browser-sync", function () {
  browserSync.init({
    proxy: "127.0.0.1:9000",
    port: 4000
  });
});

// Watch
gulp.task("stream", () => {
  gulp.watch(
    gulp.sources.src + "/views/**/*.html",
    gulp.series("fileincludedev")
  );
  gulp.watch(gulp.sources.src + "/image/**/*.*", gulp.series("imagedev"));
  gulp.watch(gulp.sources.src + "/styles/**/*.scss", gulp.series("sass"));
  gulp.watch(gulp.sources.src + "/scripts/**/*.js", gulp.series("scripts_dev"));
});

// Remove dist, tmp
gulp.task("clean", (done) => {
  del.sync(gulp.sources.dev, gulp.sources.dist);
  done();
});

// Include HTML
gulp.task("fileincludedev", () => {
  return gulp
    .src([gulp.sources.src + "/views/pages/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest(gulp.sources.dev))
    .pipe(connect.reload());
});
gulp.task("fileinclude", () => {
  return gulp
    .src([gulp.sources.src + "/views/pages/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest(gulp.sources.dist))
    .pipe(connect.reload());
});

//Scripts
gulp.task("scripts_dev", function () {
  return gulp
    .src([
      "node_modules/babel-polyfill/dist/polyfill.js",
      gulp.sources.src + "/scripts/*.js"
    ])
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(gulp.dest(gulp.sources.dev + "/js"));
});
gulp.task("scripts_prod", function () {
  return gulp
    .src(
      [
        "node_modules/babel-polyfill/dist/polyfill.js",
        gulp.sources.src + "/scripts/*.js"
      ],
      {allowEmpty: true}
    )
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(gulp.dest(gulp.sources.dist + "/js"));
});

// Minify CSS, JS
gulp.task("minify", () => {
  return gulp
    .src(gulp.sources.dist + "/*.*")
    .pipe(useref())
    .pipe(gulpif("*.js", uglify()))
    .pipe(
      gulpif(
        "*.css",
        minifyCss({
          keepSpecialComments: 0,
          compatibility: "ie8"
        })
      )
    )
    .pipe(gulp.dest(gulp.sources.dist));
});

// Sass

gulp.task(
  "sass",
  gulp.series(function () {
    return gulp
      .src(gulp.sources.src + "/styles/**/*.scss")
      .pipe(sass.sync().on("error", sass.logError))
      .pipe(gulp.dest(gulp.sources.dev + "/css"))
      .pipe(connect.reload());
  })
);

gulp.task("build-sass", function () {
  return gulp
    .src(gulp.sources.src + "/styles/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest(gulp.sources.dist + "/css"))
    .pipe(connect.reload());
});

// Minify images
gulp.task("imagemin", () => {
  return gulp
    .src(gulp.sources.src + "/images/**/*")
    .pipe(
      imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      })
    )
    .pipe(gulp.dest(gulp.sources.dist + "/images"));
});

// Minify images
gulp.task("imagedev", () => {
  return gulp
    .src(gulp.sources.src + "/images/**/*")
    .pipe(
      imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      })
    )
    .pipe(gulp.dest(gulp.sources.dev + "/images"));
});

// Include HTML
gulp.task(
  "htmlhint",
  gulp.series("fileinclude", function () {
    return gulp
      .src(gulp.sources.src + "/*.html")
      .pipe(htmlhint())
      .pipe(htmlhint.failReporter())
      .pipe(connect.reload());
  })
);

// Copy fonts
gulp.task("copy:fonts", () => {
  return gulp
    .src(gulp.sources.src + "/fonts/**/*")
    .pipe(gulp.dest(gulp.sources.dist + "/fonts"));
});
gulp.task("copy:fonts_dev", () => {
  return gulp
    .src(gulp.sources.src + "/fonts/**/*")
    .pipe(gulp.dest(gulp.sources.dev + "/fonts"));
});

// HTML beautify

gulp.task(
  "prettify",
  gulp.parallel("copy:fonts", function () {
    return gulp
      .src([gulp.sources.dist + "/*.html"])
      .pipe(
        prettify({
          indent_char: " ",
          indent_size: 2
        })
      )
      .pipe(gulp.dest(gulp.sources.dist));
  })
);

// Build source
gulp.task("build", function (done) {
  return gulp.series(
    "clean",
    "fileinclude",
    "htmlhint",
    "build-sass",
    "scripts_prod",
    "minify",
    "imagemin",
    "copy:fonts",
    "prettify"
  )(done);
});

// Start development server
gulp.task("run:dev", () => {
  gulp.series("clean")(
    gulp.parallel(
      [
        "connect:dev",
        "imagedev",
        "fileincludedev",
        "scripts_dev",
        "sass",
        "stream",
        "copy:fonts_dev"
      ],
      "browser-sync",
      () => {
        // eslint-disable-next-line no-console
        console.log("Development version is running...");
      }
    )
  );
});

// Start product server
gulp.task(
  "run:prod",
  gulp.series(
    // 'clean',
    "fileinclude",
    "htmlhint",
    "scripts_prod",
    "build-sass",
    "minify",
    "imagemin",
    "copy:fonts",
    "connect:prod",
    () => {
      // eslint-disable-next-line no-console
      console.log("Production version is running...");
    }
  )
);
