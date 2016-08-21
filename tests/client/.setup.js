
require('babel-register')();

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];
global.document = jsdom('');
global.window = document.defaultView;
global.window.localStorage = {'getItem': function () {
  'use strict';
  return null;
}};
global.window.tinyMCE = {};
Object.keys(document.defaultView).forEach(function(property) {
  'use strict';
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};


documentRef = document;