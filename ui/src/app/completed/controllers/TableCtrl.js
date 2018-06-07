(function(){
  'use strict';
  angular
    .module('app')
    .controller('TableCtrl', [ '$scope', 'ToastService', 'TableService', 'UtilityService', TableCtrl]);

  function TableCtrl($scope, ToastService, TableService, UtilityService) {
    $scope.downloads = [];
    $scope.isGridVisible = false;
    var setSize = function(lst) {
      lst.data.forEach(function(download) {
        download.size = UtilityService.formatBytes(download.size);
      });
      return lst;
    };
    TableService.getCompletedDownloads().then(function (response) {
      response = setSize(response);
      $scope.downloads = response.data;
    }, function(error){
      ToastService.showToast('Oops! Something went wrong fetching data');
    });
    $scope.getImage = function (fileName) {
      var fileExtensionName = getExtension(fileName);
      return "../../../assets/images/file-images/"+fileExtensionName+".png";
    };

    function getExtension(fileName){
      var fileExtension = fileName.split('.');
      var fileExtensionName ;
      if(fileExtension){
        fileExtensionName = fileExtension[fileExtension.length-1];
        if(!isExtensionMatch(fileExtensionName)){
          fileExtensionName = '_page';
        }
      }else{
        fileExtensionName = '_page';
      }
      return fileExtensionName;
    }

    function isExtensionMatch(extensionName) {
      return fileTypeArray.indexOf(extensionName) !== -1;
    }
  }
})();
