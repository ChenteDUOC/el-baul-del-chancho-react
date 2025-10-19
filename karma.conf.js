// karma.conf.js
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    // Mantén separados los tests de Karma (spec) y los de Jest (test)
    files: [
        //{ pattern: 'src/**/*.spec.js', watched: false }
      // Si prefieres correr *.test.js con Karma, cambia el patrón
        { pattern: 'src/**/*.test.js', watched: false }
    ],
    exclude: [],

    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                // No dependemos de .babelrc; presets explícitos aquí
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          // para imágenes/fontos si tu código las importa:
          { test: /\.(png|jpe?g|gif|svg|ico|woff2?|ttf|eot)$/i, type: 'asset/resource' }
        ]
      },
      resolve: { extensions: ['.js', '.jsx'] },
      devtool: 'inline-source-map'
    },

    reporters: ['progress', 'kjhtml'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-jasmine-html-reporter')
    ],
    client: { clearContext: false },

    browsers: ['ChromeHeadless'], // usa 'Chrome' si quieres ventana
    singleRun: true,
    autoWatch: false,
    concurrency: Infinity,

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
