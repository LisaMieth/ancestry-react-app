const config = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testEnvironment: 'jsdom',
  transform: { '\\.[j]sx?$': 'babel-jest' },
  testPathIgnorePatterns: ['./node_modules/'],
  extensionsToTreatAsEsm: ['.esm.js'],
}

module.exports = config
