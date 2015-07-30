/*
 * Main file for global configs
 *
 * */
requirejs.config({
  baseUrl: 'src/js',
  paths: {
    jquery: 'vendor/jquery/dist/jquery',
    konami: 'vendor/konami-js/konami',
    fastclick: 'vendor/fastclick/lib/fastclick',
  }
});


requirejs(['app']);
