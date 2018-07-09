const gulp = require('gulp');
const webpack = require('webpack');
const del = require('del');

const WEBPACK_CONFIG = require('./webpack.config');

const CONFIG = {
  del: './dist',
  config: './src/config.json'
};

gulp.task('clean', () => del(CONFIG.del));
gulp.task('config', () => gulp.src(CONFIG.config).pipe(gulp.dest(CONFIG.del)));
gulp.task('watch', () => gulp.watch(CONFIG.config, gulp.series('config')));

gulp.task('webpack', () => {
  const compiler = webpack(WEBPACK_CONFIG);
  compiler.watch({
    aggregateTimeout: 300,
    poll: true
  }, (err, stats) => {
    console.log(err ? err : stats.toString('minimal'));
  });
});

gulp.task(
  'default',
  gulp.series(
    'clean',
    gulp.parallel(
      gulp.series('config', 'watch'),
      'webpack'
    )
  )
);
