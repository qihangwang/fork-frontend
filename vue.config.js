const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  outputDir: 'fork',
  lintOnSave: true,
  assetsDir: process.env.NODE_ENV !== 'development' ? 'assets' : 'dev-assets',
  indexPath: 'index.html',
  filenameHashing: true,
  productionSourceMap: false,
  pages: {
    web: {
      entry: './src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  // css: {
  //   loaderOptions: {
  //     less:{
  //       // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
  //       // `primary` is global variables fields name
  //       globalVars: {
  //         primary: '#fff'
  //       }
  //     }
  //   },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true, //生产环境自动删除console
            },
            warnings: false,
          },
          sourceMap: false,
          parallel: true, //使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
        }),
      );
    }
    const plugins = [];
    const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
    plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]', //目标资源名称
        algorithm: 'gzip',
        test: productionGzipExtensions, //处理所有匹配此 {RegExp} 的资源
        threshold: 10240, //只处理比这个值大的资源。按字节计算(楼主设置10K以上进行压缩)
        minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
      }),
    );

    config.plugins = [...config.plugins, ...plugins];
    config.externals = {
      web3: 'Web3',
    };
  },
  //允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
    // 切包
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          priority: -10,
          chunks: 'initial',
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
      },
    });
    if (process.env.use_analyzer) {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  },

  devServer: {
    hot: true,
    port: 8080,
    disableHostCheck: true,
  },
};

// 注入全局less变量
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/less/common.less')],
    });
}

// location /fork {
//   alias  /data/www/test-contract/fork;
//   index  index.html;
//   try_files $uri $uri/ /fork/index.html;
// }
// location /fork/ {
//   proxy_pass http://test-contract.learn-go.com:8082/;
//   proxy_redirect        default;
// }
