const { JSDOM } = require('jsdom');

var exposedProperties = ['window', 'navigator', 'document'];

global.document = new JSDOM('');
global.window = document.window;
Object.keys(document.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.window[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.sinon = require('sinon');
global.React = require('react');
