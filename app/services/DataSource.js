var dataSource = {};
var content = {};

var getSource = function (source) {
  'use strict';

  return dataSource;
};

var setContent = function (obj) {
  'use strict';

  content = obj;
};

var getContent = function() {
  'use strict';

  return content;
};

module.exports = {
  getSource: getSource,
  getContent: getContent,
  setContent: setContent
};

