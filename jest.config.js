// You can learn more about each option below in the Jest docs: https://jestjs.io/docs/configuration.

module.exports = {
  roots: ["<rootDir>"],
  testEnvironment: "jest-environment-jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>[/\\\\](node_modules|.next)[/\\\\]",
    "<rootDir>/.jest/test-utils.tsx",
    "__mock__",
    "__mocks__",
  ],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx,json}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>[/\\\\](node_modules|.next)[/\\\\]",
    "<rootDir>/.jest/test-utils.tsx",
    "__mock__",
    "__mocks__",
  ],

  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  watchPlugins: ["jest-watch-typeahead/filename"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    // "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    // "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$": `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases
    "^@Actions": "<rootDir>/src/Actions",
    "^@Components/(.*)$": "<rootDir>/src/components/$1",
    "^@Definitions": "<rootDir>/src/Definitions",
    "^@Pages/(.*)$": "<rootDir>/pages/$1",
    "^@/lib(.*)$": "<rootDir>/src/lib$1",
    "^@Hooks(.*)$": "<rootDir>/src/Hooks$1",
    "^@/mocks(.*)$": "<rootDir>/__mocks__$1",
    "^@Services": "<rootDir>/src/Services",
    "^@Redux/(.*)$": "<rootDir>/src/Redux/$1",
    "^@Containers/(.*)$": "<rootDir>/src/Containers/$1",
    "^@Tests/(.*)$": "<rootDir>/.jest/$1",
    "^helpers/(.*)$": "<rootDir>/helpers/$1",
    "^Utils/(.*)$": "<rootDir>/Utils/$1",
    "^@Mocks/(.*)$": "<rootDir>/__mocks__/$1",
    "^@Reducers(.*)$": "<rootDir>/src/Redux/Reducers$1",
  },
};
