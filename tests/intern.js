define({
  useLoader: {
    'host-node': 'requirejs',
    'host-browser': '/node_modules/requirejs/require.js'
  },
  loader: {
    packages: [
      {
        name: 'hogan',
        location: 'node_modules/hogan.js/dist',
        main: 'hogan-3.0.2.min.amd'
      }
    ],
    paths: {
      'template': 'js/src/template',
      'gallery': 'js/src/gallery',
      'card': 'js/src/card',
      'image': 'js/src/image',
      'caption': 'js/src/caption',
      'author': 'js/src/author',
      'utils': 'js/src/utils'
    }
  },
  suites: ['tests/app'],
  excludeInstrumentation: /^(?:tests|node_modules)\//
});
