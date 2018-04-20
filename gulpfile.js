const gulp = require('gulp')
const ts = require('gulp-typescript')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const path = require('path')

const pathDefs = {
  Base: __dirname,
  Api: {
    Dist: path.join(__dirname, 'dist/api'),
    Src: path.join(__dirname, 'src/api'),
    Ts: path.join(__dirname, 'src', 'api', '**', '*.ts'),
  },
  Db: {
    Dist: path.join(__dirname, 'dist/db'),
    Src: path.join(__dirname, 'src/db'),
    Ts: path.join(__dirname, 'src', 'db', '**', '*.ts'),
  },
  Libs: {
    Dist: path.join(__dirname, 'dist/libs'),
    Src: path.join(__dirname, 'src/libs'),
    Ts: path.join(__dirname, 'src', 'libs', '**', '*.ts'),
  },
  Tsconfig: path.join(__dirname, 'src', 'tsconfig.json'),
}



gulp.task('api', () => {
  const tsProject = ts.createProject(pathDefs.Tsconfig)
  return gulp.src(pathDefs.Api.Ts)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(babel())
    .pipe(rename(path => path.extname = '.js'))
    .pipe(sourcemaps.write('.', {
      sourceRoot: function (file) { return file.cwd + '/src' }
    }))
    .pipe(gulp.dest(pathDefs.Api.Dist))
})

gulp.task('db', () => {
  const tsProject = ts.createProject(pathDefs.Tsconfig)
  return gulp.src(pathDefs.Db.Ts)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(babel())
    .pipe(rename(path => path.extname = '.js'))
    .pipe(sourcemaps.write('.', {
      sourceRoot: function (file) { return file.cwd + '/src' }
    }))
    .pipe(gulp.dest(pathDefs.Db.Dist))
})

gulp.task('libs', () => {
  const tsProject = ts.createProject(pathDefs.Tsconfig)
  return gulp.src(pathDefs.Libs.Ts)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(babel())
    .pipe(rename(path => path.extname = '.js'))
    .pipe(sourcemaps.write('.', {
      sourceRoot: function (file) { return file.cwd + '/src' }
    }))
    .pipe(gulp.dest(pathDefs.Libs.Dist))
})

gulp.task('watch:all', () => {
  gulp.watch(pathDefs.Api.Ts, gulp.parallel('api'))
  gulp.watch(pathDefs.Db.Ts, gulp.parallel('db'))
  gulp.watch(pathDefs.Libs.Ts, gulp.parallel('libs'))
})

gulp.task('default', gulp.series('libs', 'db', 'api', 'watch:all'))