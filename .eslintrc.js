module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    es6: true
  },
  globals: {
    App: true
  },
  rules : {
    'react/no-multi-comp': 0
  },
  plugins: [
    'react'
  ]
};
