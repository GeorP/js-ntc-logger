const gulp = require('gulp');
const ts = require("gulp-typescript");
const tsProject = ts.createProject('tsconfig.json');
const uglify = require('gulp-uglify');
// const babel = require("gulp-babel");

gulp.task('node', function() {
	gulp.src(['core/**.ts', 'filters/**.ts', 'formatters/**.ts', 'writers/**.ts'])
		.pipe(ts(tsProject))
		.pipe(gulp.dest("dist/node"));
});


gulp.task('browser', function() {
	gulp.src(['core/**.ts'])
		.pipe(ts({
			"module": "system",
			"target": "es5",
			noImplicitAny: true,
			out: "logger.min.js"
		}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/browser"));
});