const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      
      /* 
        InjectManifest is Workbox's build tool for project integration which. 
        It is flexible in the sense that you can inject a custom service worker manually, 
        so that you can support pre-caching files with complex caching or routing mechanisms.
        It also allows for using other APIs in your server worker like WebPush 
        Source: https://developer.chrome.com/docs/workbox/the-ways-of-workbox/
      */

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      
      /*
      The runtime uses the manifest to resolve and load modules once they've been bundled and shipped to the browser. 
      All the Import or Require statements become __webpack_require__ methods that point to module identifiers, 
      so that the runtime is able to find out where to retrieve the modules behind the identifiers.
      */
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'text-editor',
        short_name: 'JATE',
        description: 'Just Another Text Editor!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          // CSS loaders
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          // Adding Babel loader to the list of modules. The Babel loader package "allows transpiling JavaScript files using Babel and webpack."
          // Source: https://www.npmjs.com/package/babel-loader
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            },
          },
        },
      ],
    },
  };
};
