module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    es6: true,
    mocha: true
  },
  globals: {
    App: true,
    Rails: true,
    sinon: true
  },
  rules : {
    'react/no-multi-comp': 0,
    'max-len': [0, 250],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
  plugins: [
    'react'
  ]
};
