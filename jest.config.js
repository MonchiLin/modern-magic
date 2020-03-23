const path = require("path")

module.exports = {
    preset: 'ts-jest',
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    testEnvironment: 'node',
    rootDir: __dirname,
    testMatch: [
        '<rootDir>/projects/**/__tests__/**/*spec.[jt]s?(x)',
        '<rootDir>/projects/Daily-Interview-Question/**/*.ts',
        '<rootDir>/projects/leetcode/**/*.ts',
        '<rootDir>/blog/**/*.[jt]s?(x)',
    ],
    globals: {
        'ts-jest': {
            // 通过这段代码可以判断 tsconfig 与 jest 某些配置冲突了, 待详细检查
            // https://github.com/kulshekhar/ts-jest/issues/937
            tsConfig: path.join(__dirname, 'tsconfig.spec.json')
        }
    }
};
