import * as gulp from 'gulp';
import * as del from 'del';
import { pluginMarkup } from './process-markup';
import { pluginCSS } from './process-css';
import { pluginJson } from './process-json';
import { buildPluginJavaScript } from './transpile';
import { CLIOptions } from 'aurelia-cli';

function clean() {
  return del('dist');
}

let build = gulp.series(
  gulp.parallel(
    pluginMarkup('dist'),
    pluginCSS('dist'),
    pluginJson('dist'),
    buildPluginJavaScript('dist', 'commonjs'),
  ), (done) => {
    console.log('Finish building Aurelia plugin to dist.');
    done();
  }
);

let main;
if (CLIOptions.hasFlag('watch')) {
  main = gulp.series(
    clean,
    () => {
      console.log('Watching plugin sources for changes ...');
      return gulp.watch('src/**/*', { ignoreInitial: false }, build);
    }
  );
} else {
  main = gulp.series(
    clean,
    build
  );
}

export { main as default };
