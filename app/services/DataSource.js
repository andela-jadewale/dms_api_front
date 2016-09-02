var dataSource = {};
var content = {};
var userData = {};
var documentData = {};
var password = '';

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

var setUserData = function (obj) {
  'use strict';

  userData = obj;
};

var getUserData = function () {
  'use strict';

  return userData;
};

var setDocData = function (obj) {
  'use strict';

  documentData.data = obj;
};

var getDocData = function () {
  'use strict';

  return documentData.data;
};

var setPassword = function (obj) {
  'use strict';

  password = obj;
};

var getPassword = function () {
  'use strict';

  return password;
};

module.exports = {
  getSource: getSource,
  getContent: getContent,
  setContent: setContent,
  setUserData: setUserData,
  getUserData: getUserData,
  setDocData: setDocData,
  getDocData: getDocData,
  setPassword: setPassword,
  getPassword: getPassword
};

