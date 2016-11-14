const gulp = require('gulp');
const webpack = require('gulp-webpack');
const webpackConfig = require('./webpack.config.js');

gulp.task('dev', function () {
	gulp.src(['./src/**/*.ts'])
			.pipe(webpack(webpackConfig))
			.pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
	gulp.watch(['./src/**/*.ts'], ['dev']);
});

gulp.task('default', ['dev', 'watch']);
