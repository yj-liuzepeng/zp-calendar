/*
 * @Description:
 * @Author: lzp
 * @Date: 2021-06-25 13:40:05
 * @LastEditTime: 2021-06-25 13:40:34
 * @LastEditors: xxx
 */
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  css: {
    extract: false, //强制使用内联样式，这样打包出的插件样式会内置在js中，不需要单独引入
  },
}
