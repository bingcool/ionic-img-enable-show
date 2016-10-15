;(function(window, angular, undefined) {

  'use strict';
  /**
  *定义ng-img模块
  */
  var img = angular.module('ng-img', []);

  img.run(['$templateCache', function($templateCache) {
    /**
    *建立模板缓存，可以根据需要自定义模板
    */
    $templateCache.put('ng-img-slide-large.html',
      '<div class="action-img-backdrop active"ng-click="imgClose()">'+
          '<div class="img-sheet-wrapper large-img-group">'+
              '<ion-slide-box class="img-slide-box" show-pager="false" active-slide="imgActiveSlide" delegate-handle="slide-imgs-large" on-slide-changed="slideImgChange($index)">'+
              '<ion-slide class="img-slide" img-show ng-repeat="largeImg in larImgs">'+
              '</ion-slide>'+ 
              '</ion-slide-box>'+
              '<div class="row">'+
                  '<div class="col" style="color:#fff"><span>{{currentLargeImg}}/{{imgsNum}}</span></div>'+
                  '<div class="col"></div>'+
                  '<div class="col"></div>'+
                  '<div class="col"><span style="color:#fff">保存图片</span></div>'+
              '</div>'+
          '</div>'+         
      '</div>'
    );
           
  }]);
  
  /**
  *指令，实现图片放大显示
  */
  img.directive('imgShow',function($compile) {
    return {
      restrict: 'EA',
      transclude: true,
      replace: false,
      scope:false,
      link:function($scope,$element,$attrs) {
        if($scope.largeImg.imgsrc != undefined) {

          angular.element($element).append('<img src='+$scope.largeImg.imgsrc+'>');
        }else {
          angular.element($element).append($scope.largeImg);
        }
      }
    }
  });

  /**
  *图片轮播的指令，对应替换缓存模板
  */
  img.directive('imgSlideLarge', ['$rootScope','$timeout', function($rootScope, $timeout) {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        larImgs: '=',
        currentImg: '@',
        imgClose: '&',
      },
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'ng-img-slide-large.html';
      },
      controller: ['$scope', '$attrs','$timeout','$ionicPlatform', function($scope, $attrs, $timeout, $ionicPlatform) {
        if($scope.currentImg != undefined)  {
          $scope.imgActiveSlide = $scope.currentImg;
          $scope.currentLargeImg = parseInt($scope.currentImg) + 1; 
        }

        $scope.imgsNum = $scope.larImgs.length;

        $scope.slideImgChange = function($index) {
          $scope.currentLargeImg = $index+1;
        }
      }],
      
    };
  }]);
 
})(window, angular);
