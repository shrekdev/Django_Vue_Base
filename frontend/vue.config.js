module.exports = {
  runtimeCompiler: true,
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api*': {
        target: 'http://backend:8000/',
      }
    }
  }
}