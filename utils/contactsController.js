app.controller('contactsController', function($state, $scope, $timeout) {
  $scope.partners = [
    {
      vorname: "Hans",
      name: "Peter",
      job: "Bauer",
      source: "sources/mock/ansprechpartnerBilder/bauer.jpg"
    },
    {
      vorname: "Guido",
      name: "Hip",
      job: "Barkeeper",
      source: "sources/mock/ansprechpartnerBilder/hipster.jpg"
    },
    {
      vorname: "Hubert",
      name: "Schmitz",
      job: "Filialleiter EDEKA",
      source: "sources/mock/ansprechpartnerBilder/filialleiter.jpg"
    }
  ];

  $scope.loading = false;

  $scope.searchPressed = function() {
    $scope.loading = true;
    $state.go('contacts-search-result');
  };

});
