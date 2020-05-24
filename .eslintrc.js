module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/vue',
  ],
  env: {
    // 这里填入你的项目用到的环境
    // 它们预定义了不同环境的全局变量，比如：
    //
    browser: true,
    node: true,
    // mocha: true,
    jest: true,
    // jquery: true
  },
  globals: {
    // 这里填入你的项目需要的全局变量
    // false 表示这个全局变量不允许被重新赋值，比如：
    //
    // myGlobal: false
  },
  rules: {
    'no-debugger': "warn",

    // 这里填入你的项目需要的个性化配置
    'no-invalid-this': "off",

    "no-undef": "off",

    "no-unused-vars": "warn",

    "vue/component-tags-order": "off"
  }
};
