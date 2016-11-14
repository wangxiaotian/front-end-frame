var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var fileinclude = require('gulp-file-include');
var del = require('del');

//	开启预览服务
//	任务顺序不影响任务之间的调用
gulp.task('server',['watch','default'],function(){
	browserSync.init({
		server:'./'
	})
})

//	编译html文件
gulp.task('html',function(){
	/*src的引用可以是个数组*/
	gulp.src('./src/pages/main/*.html')
		.pipe(fileinclude({
			prefix : '@@'
		}))
		.pipe(gulp.dest('./dist/pages/'))
		.pipe(reload({
			stream:true
		}));
		/*reload实现热加载*/
})
//	图片打包，只是复制文件？
gulp.task('img',function(){
	gulp.src('./src/images/**/*.@(png|jpg|gif)')
		.pipe(gulp.dest('./dist/images/'));
	console.log('图片打包');
})
//	清理文件，什么情况下会用到呢
gulp.task('clean',function(cb){
	del('./dist/images/*.@(png|jpg|gif)');
	cb();
})
//	这个任务并没有因为名字的特殊而特殊
gulp.task('default',['html','img']);

//	监控文件
gulp.task('watch',function(){
	gulp.watch(['./src/pages/**/*.html'],['html']);
})


