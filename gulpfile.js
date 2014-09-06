var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');


gulp.task('clean', [], function() {
  console.log("Clean all files in build folder");
  gulp.src("build/**.*")
      .pipe(clean());
});


var jsValidate = require('gulp-jsvalidate');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');

gulp.task('javascript', function () {
  console.log("Validate all the javascript files in the content/javascript folder");

  return gulp.src(["content/javascripts/**.js"])
      .pipe(jsValidate())
      .pipe(uglify())
      .pipe(concat('main.js'))
      .pipe(gulp.dest('build/javascripts'))
      .on("error", notify.onError(function(error) {
        return error.message;
      }))
});

var jasmine = require("gulp-jasmine");

gulp.task('test', function () {
    gulp.src('content/specs/**.js')
        .pipe(jasmine());
});

var markdown = require('gulp-markdown');
var tap = require('gulp-tap')
var Handlebars = require('Handlebars')

gulp.task('generate_pages', ['handlebars'], function() {
  return gulp.src(["content/templates/pages.hbs"])
    .pipe(tap(function(file) {
      var template = Handlebars.compile(file.contents.toString())

      gulp.src(["content/pages/**.md"])
        .pipe(markdown())
        .pipe(tap(function(file) {
          var data = {
            content: file.contents.toString()
          }
          var html = template(data)
          file.contents = new Buffer(html, "utf-8")
        }))
        .pipe(gulp.dest('build/pages'));
    }))
});

var rename = require('gulp-rename')

gulp.task('homepage', ['clean'], function() {
  gulp.src("content/templates/index.hbs")
    .pipe(tap(function(file, t) {
      var template = Handlebars.compile(file.contents.toString())
      var html = template({ title: "Gulp + Handlebars is easy"})
      file.contents = new Buffer(html, "utf-8")
    }))
    .pipe(rename(function(path) {
      path.extname = ".html"
    }))
    .pipe(gulp.dest("build"))
})

gulp.task('handlebars', function() {
  gulp.src("/templates/**.hbs")
    .pipe(tap(function(file, t) {
      var template = file.contents.toString()
      var templateName = Path.basename(file.path).replace(".hbs", "")
      Handlebars.registerPartial(templateName, template)
    }))
})

gulp.task('test-watch', function () {
    gulp.watch(['content/specs/**.js', 'content/javascripts/**.js'], ['test'])
});

gulp.task('watch', [], function() {
  return gulp.watch(['styles/**.*', 'content/**/**.*'], ['default', 'homepage']);
})

gulp.task('default', ["clean"], function() {
  console.log("Moving all the css files in styles folder");
  gulp.src("styles/**.css")
      .pipe(concat('main.css'))
      .pipe(gulp.dest('build/styles'));
});
