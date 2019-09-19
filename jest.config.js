module.exports = {
  preset: 'ts-jest',
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Adding this line solved the issue
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      // 通过这段代码可以判断 tsconfig 与 jest 某些配置冲突了, 待详细检查
      // https://github.com/kulshekhar/ts-jest/issues/937
      tsConfig: false
    }
  }
};
