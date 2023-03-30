import { Config, createConfig } from '@anmeng/test';

export default {
  ...createConfig(),
  testMatch: ['<rootDir>/packages/*/src/**/*.test.ts'],
  modulePathIgnorePatterns: [],
  transformIgnorePatterns: ['/node_modules/', ''],
  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx}',
    '!**/examples/**/*.{js,jsx,ts,tsx}',
  ],
} as Config.InitialOptions;
