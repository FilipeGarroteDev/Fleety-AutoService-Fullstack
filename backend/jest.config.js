module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  testMatch: ["<rootDir>/tests/**/*.(test|spec).ts"],
  setupFiles: ["<rootDir>/tests/setup-envs.ts"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/tests/$1",
    "axios": "axios/dist/node/axios.cjs"
  },
  restoreMocks: true,
};
