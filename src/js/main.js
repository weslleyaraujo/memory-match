/*
 * Main file for global configs
 *
 * */
requirejs.config({
  baseUrl: 'src/js',
  paths: {
    jquery: 'vendor/jquery/dist/jquery'
  }
});


requirejs(['app']);
