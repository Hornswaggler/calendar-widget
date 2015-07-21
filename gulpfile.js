'use strict';

var gulp = require('gulp');
var config = require('./gulp.config')();

var $ = require("gulp-load-plugins")({
	pattern:['gulp-*','gulp.*', 'main-bower-files', 'browser-sync', 'del'],
	lazy:true
});

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * List npm dependencies auto loaded from package.json
 */
gulp.task('dependencies', function(){
	console.log("Listing gulp-inject project dependencies");
	console.log(Object.getOwnPropertyNames($));
});

/**
 * serve the dev environment
 */
gulp.task('serve-dev',['build-dev'],function(){
	serve(config.env.dev);
});

/**
 * Build the dev environment
 */
gulp.task('build-dev',['bower-dev'], function(){
	
	var sources = gulp.src(['./src/lib/*.js', './src/lib/*.css'],{read:false});
	
	return gulp.src('./src/index.html')
		.pipe($.inject(sources, {ignorePath:['dev','src'], addRootSlash:false}))
		.pipe(gulp.dest('./src'));
});

/**
 *	Copies the dev bower dependencies for dependency injection
 * Note that the js / css dependencies are included
 * in the return statement placing the syncronous dependency on the last task executed
 */
gulp.task('bower-dev', ['bower-dev-fonts', 'bower-dev-js-css']);
 
gulp.task('bower-dev-fonts',function(){
	return gulp.src($.mainBowerFiles())
		.pipe($.filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
		.pipe(gulp.dest('./src/fonts'));
});

gulp.task('bower-dev-js-css',function(){
	return gulp.src($.mainBowerFiles())
		.pipe($.filter(['*.js','*.css']))
		.pipe(gulp.dest('./src/lib'));
});

/**
 * serve the prod environment
 */
 
 gulp.task('serve-prod',['build-prod'],function(){
	serve(config.env.prod);
 });

/**
 * Build the prod environment
 */
 gulp.task('build-prod',['clean-prod','bower-prod'], function(){
		
	var sources = gulp.src(['./dist/lib/*.js', './dist/lib/*.css'],{read:false});
	
	return gulp.src('./src/index.html')
		.pipe($.inject(sources, {ignorePath:['dev','src','dist'], addRootSlash:false}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('clean-prod', function(){
	console.log('Cleaning dist directory');
	
	return $.del(['dist/**/*']);
});

/**
 *	Copies the prod bower dependencies for dependency injection
 * Note that the js / css dependencies are included
 * in the return statement placing the syncronous dependency on the last task executed
 */
gulp.task('bower-prod',['bower-prod-fonts', 'bower-prod-css', 'bower-prod-js']);
 
gulp.task('bower-prod-fonts',function(){
	return gulp.src($.mainBowerFiles())
		.pipe($.filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
		.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('bower-prod-css',function(){
	return	gulp.src($.mainBowerFiles())
		.pipe($.filter('*.css'))
		.pipe($.concat('concat.css'))
		.pipe(gulp.dest('./dist/lib'));
});

gulp.task('bower-prod-js',function(){
	return	gulp.src($.mainBowerFiles())
		.pipe($.filter('*.js'))
		.pipe($.concat('concat.js'))
		.pipe($.uglify())
		.pipe(gulp.dest('./dist/lib'));
});

/**
 * serve the code
 *	code is synchronized  w/ source dir when in dev
 * @param env -- environment configuration from the gulp.config.js
 */
function serve(env){
	$.browserSync.init({
		server:{
			baseDir: env.base
		}
	});
	
	if(env.name === 'dev'){
		gulp.watch(env.base+"/*.html").on("change", $.browserSync.reload);
	}
	
}