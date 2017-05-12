var gulp = require('gulp');
// sass plugins
var sass = require('gulp-sass');
// server plugins
var browserSync = require('browser-sync').create();
// minifies plugins
var useref = require('gulp-useref');
var guilpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
// clean plugins
var del = require('del');
// run tasks in sequence plugins
var runSequence = require('run-sequence');
/*
*	Start development mode
*/
gulp.task('dev',['watch']);

/*
*	Watch scss, html and js files after browserSync and sass tasks
*/
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
  	// Reloads the browser whenever HTML or JS files change
	gulp.watch('app/index.html', browserSync.reload); 
	gulp.watch('app/views/**/*.html', browserSync.reload); 
  	gulp.watch('app/app.js', browserSync.reload); 
  	gulp.watch('app/js/**/*.js', browserSync.reload); 
})

/*
*	Convert sass to css
*/
gulp.task("sass", function () {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
})

/*
*	Start server
*/
gulp.task('browserSync', function() {
	browserSync.init({
		server : {
			baseDir: 'app'
		}
	})
})

/*
*	Minifies html, css and js files to dist
*/
gulp.task('useref', function() {
	return gulp.src('app/*.html')
		.pipe(useref())
		// Minifies if js file
		.pipe(guilpIf('js/*.js', uglify()))
		// Minifies if css file
		.pipe(guilpIf('css/*.css', cssnano()))
		.pipe(gulp.dest('dist'))
})

/*
*	Minifies image files to dist
*/
gulp.task('images', function(){
  	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
	  	.pipe(imagemin())
	  	.pipe(gulp.dest('dist/images'))
})

/*
*	Copy app fonts to dist
*/
gulp.task('fonts', function() {
 	return gulp.src('app/fonts/**/*')
  		.pipe(gulp.dest('dist/fonts'))
})

/*
*	Clean dist
*/
gulp.task('clean:dist', function() {
	return del.sync('dist');
})

/*
*	Building production version into dist 
*	OBS: The callback is used to tell gulp.js that the task is done. 
*		This is important for asynchronous tasks which may past the duration 
*		of the task functions itself.
*/
gulp.task('build', function (callback) {
	runSequence('clean:dist', 
		['sass', 'useref', 'images', 'fonts'],
		callback
	)
})
gulp.task('build', [`clean`, `sass`, `useref`, `images`, `fonts`], function (){
	console.log('Building files');
})