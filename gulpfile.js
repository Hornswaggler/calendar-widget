'use strict';

var gulp = require('gulp');
var config = require('./gulp.config')();

var $ = require("gulp-load-plugins")({
	pattern:['gulp-*','gulp.*', 'main-bower-files', 'browser-sync', 'del', 'event-stream'],
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
gulp.task('build-dev',['bower-copy'], function(){
    return injectDev();
});

/**
 * Inject development dependencies
 * Injects library dependencies first, then angular dependencies
 */
function injectDev(){
     var sources =   $.eventStream.merge(
            gulp.src(['./src/lib/**/*.js', './src/lib/**/*.css','./src/css/**/*.css']), 
            gulp.src(['./src/app/**/*.js']).pipe($.angularFilesort()));
	
    return gulp.src('./src/index.html')
        .pipe($.inject(sources,{ignorePath:['dev','src'], addRootSlash:false}))
		.pipe(gulp.dest('./src'));
}
 
/**
 *	Copies the dev bower dependencies from the bower_components dir for dependency injection
 * Note that the js / css dependencies are included
 * in the return statement placing the synchronous dependency on the last task executed
 */
gulp.task('bower-copy', ['bower-fonts', 'bower-js-css']);
 
gulp.task('bower-fonts',function(){
	return gulp.src($.mainBowerFiles())
		.pipe($.filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
		.pipe(gulp.dest('./src/fonts'));
});

gulp.task('bower-js-css',function(){
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
 gulp.task('build-prod',['clean-prod', 'copy-prod', 'minify-concat'], function(){
     return injectProd();
});

/**
 * Inject production dependencies
 * Injects library dependencies first, then concatenates, injects and minifies angular dependencies
 */
function injectProd(){
	var sources = gulp.src(['./dist/lib/**/*'],{read:false});
	
	return gulp.src('./src/index.html')
		.pipe($.inject(sources, {ignorePath:['dist'], addRootSlash:false}))
        .pipe($.minifyHtml())
		.pipe(gulp.dest('./dist'));
}

/**
 * cleans the dist dir
 */
gulp.task('clean-prod', function(){
	console.log('Cleaning dist directory');
	
	return $.del(['dist/**/*']);
});

gulp.task('copy-prod',['bower-copy'], function(){
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
});

/**
 * Minify and concatenate all css and javascript resources
 */
gulp.task('minify-concat', ['minify-concat-js','minify-concat-css']);

gulp.task('minify-concat-js',function(){
    return $.eventStream.merge(
            gulp.src('./src/lib/**/*.js'), 
            gulp.src(['./src/app/**/*.js']).pipe($.angularFilesort()))
        .pipe($.concat('app.js'))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(gulp.dest('./dist/lib'));       
});

gulp.task('minify-concat-css', function(){
    return gulp.src('./src/lib/**/*.css')
        .pipe($.concat('app.css'))
        .pipe($.minifyCss())
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
		gulp.watch([env.base+"/*.html"]).on("change", $.browserSync.reload);
        gulp.watch([env.base+"/app/**/*.js",env.base+"/css/**/*.css"])
            .on("change", function(){injectDev(); $.browserSync.reload();});
	}
	
}