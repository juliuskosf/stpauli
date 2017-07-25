app.controller('contactsController', function($state, $scope, $timeout, contactService) {
  $scope.contacts = contactService.getAllContacts();
  $scope.itemPressed = function (contactId) {
    // functionalty is a total mock up, need to replace everything in here!
    // we will handover the id as stateparameter
    // https://stackoverflow.com/questions/20632255/angularjs-pass-an-object-into-a-state-using-ui-router
    contactService.setSelectedContact(contactId);
    $state.go('contacts-detail');
  };

  $scope.loading = false;

  $scope.searchPressed = function() {
    $scope.loading = true;
    $state.go('contacts-search-result');
  };
});

app.controller('contactDetailCtrl', function($state, $scope, contactService) {

  $scope.notes = [{
    text: "Das ist eine Notiz",
    author: "Benedikt",
    createdOn: "05.06.2017"
  },
  {
    text: "Das ist eine weitere Notiz!",
    author: "Jemand Anderes",
    createdOn: "10.07.2017"
  }];

  $scope.conversations = [{
    type: 'mail',
    info: 'Angebot bestätigt',
    createdOn: '01.05.2017',
    author: 'Benedikt',
    src: 'sources/img/icons/mail.svg'
  },
  {
    type: 'note',
    info: 'Hat Interesse',
    author: 'Ansgar',
    createdOn: '20.03.2017',
    src: 'sources/img/icons/note.svg'
  },
  {
    type: 'call',
    info: '',
    author: 'Tim',
    createdOn: '18.03.2017',
    src: 'sources/img/icons/call.svg'
  },
  {
    type: 'mail',
    info: 'Initiale Akquise',
    author: 'Benedikt',
    createdOn: '15.03.2017',
    src: 'sources/img/icons/mail.svg'
  }];

  $scope.backPressed = function() {
    contactService.clearSelectedContact();
    $state.go('contacts-search-result');
  };


  $scope.selectedContact = contactService.getSelectedContact();
});

app.controller('contactsCreateCtrl', function($scope) {
  $scope.createPressed = function() {
    // $scope.newContact contains the binded values of all fields from the person-info-component
    // just get it from $scope.newContact
    // that's data binding ;)
    console.log($scope.newContact);
  };

});
