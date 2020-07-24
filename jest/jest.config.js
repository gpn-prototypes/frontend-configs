const path = require('path');

module.exports = ({ setupFilesAfterEnv }) => ({
  verbose: true,
  setupFilesAfterEnv: [setupFilesAfterEnv],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.join(
      __dirname,
      './mocks/file-mock.js',
    ),
    '\\.(css|less)$': path.join(__dirname, './mocks/style-mock.js'),
  },
  testMatch: ['**/*.test.{ts,tsx}'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/types/'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.stories.tsx'],
});
