module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    es6: true,
    mocha: true,
    jquery: true
  },
  globals: {
    App: true,
    Rails: true,
    sinon: true,
    dataLayer: true
  },
  rules : {
    'react/no-multi-comp': 0,
    'max-len': [0, 250],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/require-default-props": [0, { "forbidDefaultForRequired": true }],
    "react/no-render-return-value": 0,
  },
  plugins: [
    'react'
  ]
};
