const config = {
  verbose: true,
  modulePaths: ['../../lib/nodejs/node_modules'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
};

module.exports = config;