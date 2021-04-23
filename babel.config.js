module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: name => `${name}/style/less`,
      },
      'vant',
    ],
  ],
  env: { test: { plugins: ['transform-es2015-modules-commonjs', 'dynamic-import-node'] } },
};
