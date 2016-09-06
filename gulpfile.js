'use strict';

var // Modules
	gulp = require('gulp'),
	g = require('gulp-load-plugins')(),

	sh = require('child_process'),
	args = require('yargs').argv,

	fs = require('fs'),
	path = require('path'),
	del = require('del'),
	tmp = require('tmp');

var paths = { // Specific file paths
	pkg: 'package.json',
	less: 'less',
	css: 'src/resources'
};

var pkg = require('./' + paths.pkg); // Package info

var mode = { // Commandline options
	clean: args.c || args.clean, // Clean mode
	dev: args.d || args.dev      // Development mode
};

/**
 * Shortcut Tasks
 */
gulp.task('default', ['build']);
gulp.task('build', ['build:css']);

/**
 * Compile Less into CSS
 */
gulp.task('build:css', function () {
	return gulp.src(paths.less + '/*.less')
		.pipe(g.if(mode.dev, g.sourcemaps.init()))
		.pipe(g.less())
		.pipe(g.cssPurge())
		.pipe(g.autoprefixer('last 2 versions'))
		.pipe(g.if(mode.dev, g.sourcemaps.write()))
		.pipe(g.rename({extname: '.css'}))
		.pipe(gulp.dest(paths.css));
});
