module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
    moduleNameMapper: {
        "@src\\/(.*)": "<rootDir>/src/$1",
        "\\.(css|less)$": "identity-obj-proxy",
    },
    "reporters": [
        "default",
        "jest-summary-reporter"
    ],
};