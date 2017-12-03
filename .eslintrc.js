module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    es6: true,
    mocha: true
  },
  globals: {
    App: true,
    Rails: true
  },
  rules : {
    'react/no-multi-comp': 0,
    'max-len': [0, 250],
  },
  plugins: [
    'react'
  ]
};
