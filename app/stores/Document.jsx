var dispatcher = require('../dispatcher/dispatcher.js'),
  self = null,
  docComp = null,
  Storage = require('../services/LocalStorageSet.js'),
  DataSource = require('../services/DataSource.js'),
  UserHelper = require('../services/Users.js'),
  roleUrl = '/api/v1/roles/',
  TinyMCE = {},
  docUrl = '/api/v1/documents/',
  docUser = '/api/v1/users/',
  data = '',
  browserHistory = require('react-router').browserHistory,
  AddDocComponent = '';

function Documents() {
  var documents = {},
      listeners = [],
      AutoComplete = {},
      ownerConfig = {
        plugins: 'link image code textcolor advlist',
        toolbar: 'forecolor backcolor | undo redo | bold italic | alignleft aligncenter alignright | code',
        advlist_number_styles: 'lower-alpha',
        advlist_bullet_styles: 'square"'
      },
      notConfig = {
        plugins: 'link image code textcolor advlist',
        toolbar: 'forecolor backcolor | undo redo | bold italic | alignleft aligncenter alignright | code',
        advlist_number_styles: 'lower-alpha',
        advlist_bullet_styles: 'square"',
        readonly: 1
      };

  function getSelf() {
    return self;
  }

  function setDocComp(obj) {
    docComp = obj;
  }

  function getDocComp() {
    return docComp;
  }

  function setSelf(obj) {
    self = obj;
  }

  function onChange(listener) {
    listeners.push(listener);
  }

  function setAutoComplete(obj) {
    AutoComplete = obj
  }

  function getAutoComplete() {
    return AutoComplete;
  }

  function triggerListeners() {
    listeners.forEach(function(listener) {
      listener(documents);
    })
  }

  function search(obj) {
    obj.setState({show: false});
    obj.setState({filter: getAutoComplete().caseInsensitiveFilter});
    processSearch(obj);
  }

  function save(obj) {
    if((data.content) || (data.title) || (data.role)) {
      if(getSelf().props.update) {
        var id = getSelf().props.id;
        UserHelper.sendRequest(docUrl + id , 'PUT', data, saveDoc);
      }
      else{
        if((data.content) && (data.title)) {
          data.id = DataSource.getUserData()._id || localStorage.getItem('id');
          UserHelper.sendRequest(docUrl, 'POST', data, saveDoc);
        }
      }
      data = null;
      data = '';
    }
    else {
       if(getSelf().props.update) {
         getSelf().setState({snack: true});
         documents.view = 'doc updated';
       }
       else{
        getSelf().setState({snackError: true});
        getSelf().setState({snack: true});
        documents.view = 'Error creating doc';
       }
      triggerListeners();
    }
  }

  function setTinyMce(obj) {
    TinyMCE = obj;
  }

  function setData(obj) {
    data = obj;
  }

  function getData() {
    return data;
  }

  function tinyMce() {
    return TinyMCE;
  }

  function cancel(obj) {
    obj.setState({open: false});
  }

  function confirmDelete(obj) {
    var id = obj.id.split(' ')[obj.id.split(' ').length - 1];
    sendDeleteToServer(id);
    obj.self.setState({delBox: false});

  }

  function sendDeleteToServer(id) {
    var userId = DataSource.getUserData()._id;
    UserHelper.sendRequest(docUrl + id, 'DELETE', {'id': userId}, processDelete);
  }

  function processDelete(obj) {
    var userId = DataSource.getUserData()._id;
    getDocView(docUser + userId+ '/documents/', 'GET', viewDoc);
  }

  function cancelDelete(obj) {
    obj.setState({delBox: false});
  }

  function saveDoc(obj) {
    (obj.doc || obj.document) ? getSelf().setState({snack: true})
      : getSelf().setState({snackError: true});

    var userId = DataSource.getUserData()._id || localStorage.getItem('id');

    getDocView(docUser + userId+ '/documents/', 'GET', viewDoc);
  }

  function getDocument(obj) {
    try {
      obj.url ? getDocView(obj.url, 'GET', viewDoc) :
        getDocView(docUser + obj+ '/documents/', 'GET', viewDoc)
      } catch(e) {
        browserHistory.push('/');
      }

  }

  function getDocView(url, type, cb) {
    UserHelper.sendRequest(url, type, null, cb);
  }


  function viewDoc(obj) {
    if(obj.data) {
      documents = {'data': obj.data, 'view': 'documents'};

      obj.data.forEach(function (object) {
        DataSource.getSource[object.title] = {'content': object.content, 'id': object._id,
          'ownerId': object.ownerId, 'access': object.access};
      })
    }
    else {
      documents = {'data': obj, 'view': 'documents'};

      if(!obj.length) {
        console.log('wow')
        browserHistory.push('/');
        return;
      }
      obj.forEach(function (object) {
        DataSource.getSource[object.title] = {'content': object.content, 'id': object._id,
          'ownerId': object.ownerId, 'access': object.access};
      })
    }
    triggerListeners();
  }

  function inDataSource(obj) {
    var userId = DataSource.getSource[obj.value].id;

    obj.data.setState({id: userId});
    obj.data.setState({open: true});
    documents.view = 'search';
    triggerListeners();
  }

  function init() {
    UserHelper.sendRequest(roleUrl, 'GET', null, proccess);
  }

  function proccess(data) {
    getSelf().setState({roles: data.role});
    if(getSelf().props.update) {
      var id = getSelf().props.id;
      UserHelper.sendRequest(docUrl + id, 'GET', null, processDoc);
    }
  }

  function processDoc(obj) {
    if(obj.data.ownerId === DataSource.getUserData()._id
      || localStorage.getItem('id')) {
      getSelf().setState({owner: true});
      getSelf().setState({config: ownerConfig})
    }
    else{
      if(obj.data.access.indexOf(DataSource.getUserData().role
        || localStorage.getItem('role')) !== -1) {
        getSelf().setState({rights: true});
        getSelf().setState({config: ownerConfig})
      }
      else{
        getSelf().setState({owner: false});
        getSelf().setState({config: notConfig})
      }
    }
    documents.view = 'Add docs';
    getSelf().setState({title: obj.data.title});
    getSelf().setState({documentText: obj.data.content});
    getSelf().setState({access: obj.data.access[0]});
    tinyMce().get('text').setContent(obj.data.content);
    triggerListeners();
  }

  function notInDataSource(obj) {
    var search = [];

    for (var key in DataSource.getSource) {
      if( DataSource.getSource[key].content.indexOf(obj.value) !== -1 ) {
        search.push(key);
      }
    }
    obj.data.setState({filter: AutoComplete.noFilter});
    obj.data.setState({show: true});
    obj.data.setState({dataSource: search});
    documents.view = 'search not found';
    triggerListeners();
  }

  function add(obj) {
     obj.setState({open: true});
  }

  function find(obj) {
    (DataSource.getSource[obj.value]) ? inDataSource(obj) :
      notInDataSource(obj);
  }

  function processSearch(obj) {
    var search = [];

    for (var key in DataSource.getSource) {
      search.push(key);
    }
     obj.setState({dataSource: search});
     documents.view = 'search';
     triggerListeners();
  }

  function deleteDocument(obj) {
     getDocComp().setState({snack: false});
     getDocComp().setState({delBox: true});
     getDocComp().setState({deleteTitle: 'Save changes to delete document '+ obj});
     documents.view = 'delete document';
     triggerListeners();
  }

  function noAccess(obj) {
    getDocComp().setState({snack: true});
  }

  function show(obj) {
    getDocComp().setState({id: obj});
    getDocComp().setState({open: true});
    getDocComp().setState({owner: true});
  }

  function hide(obj) {
    getDocComp().setState({id: obj});
    getDocComp().setState({open: true});
  }

  function showDoc(obj) {
    this.setState({id: this.props.data[e.target.id]._id});
    this.setState({open: true});
    this.setState({owner: true});
  }

  function sendRequest(obj) {
    switch(obj.type) {
      case 'search': search(obj.data);
      break;
      case 'add': add(obj.data);
      break;
      case 'show': show(obj.data);
      break;
      case 'hide': hide(obj.data);
      break;
      case 'get': getDocument(obj.data);
      break;
      case 'save': save(obj.data);
      break;
      case 'delete': deleteDocument(obj.data);
      break;
      case 'delError': noAccess(obj.data);
      break;
      case 'cancel': cancel(obj.data);
      break;
      case 'cancelDelete': cancelDelete(obj.data);
      break;
      case 'find': find(obj.data);
      break;
      case 'init': init();
      break;
      case 'confirm': confirmDelete(obj.data);
      break;
    }
  }

  dispatcher.register(function (e) {
    var split = e.type.split(':');
    if(split[0] === 'docMan') {
      switch(split[1]) {
        case 'Search': sendRequest({'data': e.payload, 'type': 'search'});
        break;
        case 'Add': sendRequest({'data': e.payload, 'type': 'add'});
        break;
        case 'Get': sendRequest({'data': e.payload, 'type': 'get'});
        break;
        case 'Show': sendRequest({'data': e.payload, 'type': 'show'});
        break;
        case 'Hide': sendRequest({'data': e.payload, 'type': 'hide'});
        break;
        case 'Delete': sendRequest({'data': e.payload, 'type': 'delete'});
        break;
        case 'Save': sendRequest({'data': e.payload, 'type': 'save'});
        break;
        case 'Cancel': sendRequest({'data': e.payload, 'type': 'cancel'});
        break;
        case 'Find': sendRequest({'data': e.payload, 'type': 'find'});
        break;
        case 'Init': sendRequest({'data': e.payload, 'type': 'init'});
        break;
        case 'Confirm': sendRequest({'data': e.payload, 'type': 'confirm'});
        break;
        case 'CancelDelete': sendRequest({'data': e.payload, 'type': 'cancelDelete'});
        break;
        case 'DeleteError': sendRequest({'data': e.payload, 'type': 'delError'});
        break;

      }
    }
  })

  return {
    setSelf: setSelf,
    onChange: onChange,
    getSelf: getSelf,
    setAutoComplete: setAutoComplete,
    setTinyMce: setTinyMce,
    setData: setData,
    setDocComp: setDocComp,
  }

}

module.exports = new Documents();