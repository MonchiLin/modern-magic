// 用于欺骗 IDEA，从而实现 path alias import
// IDEA 配置，打开 File | Settings | Languages & Frameworks | JavaScript | Webpack
// 选择该文件

const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js', ".ts", '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../'),
      '~': path.resolve(__dirname, '../')
    }
  }
}
