const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  verbose: true,
  clearMocks: true,
  detectOpenHandles: true,
  logHeapUsage: true,
  runInBand: true,
  preset: "ts-jest",
  rootDir: ".",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ["<rootDir>"],
  moduleFileExtensions: ["ts", "js", "json"],
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  testPathIgnorePatterns: [".yarn-cache", "node_modules", "dist"],
  modulePathIgnorePatterns: ["dist"],
};
