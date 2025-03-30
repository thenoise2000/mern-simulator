module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        '/node_modules/(?!axios)/',
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
};