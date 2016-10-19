;(function(window, angular, undefined) {
  'use strict';
  var img = angular.module('ng-img', []);

  img.run(['$templateCache', function($templateCache) {
    $templateCache.put('ng-img-slide-large.html',
      '<div class="action-img-backdrop active" ng-click="imgClose()">'+
          '<div class="img-sheet-wrapper large-img-group">'+
              '<ion-slide-box class="img-slide-box" show-pager="false" active-slide="imgActiveSlide" delegate-handle="slide-imgs-large" on-slide-changed="slideImgChange($index)">'+
              '<ion-slide class="img-slide" img-show ng-repeat="largeImg in larImgs">'+
              '</ion-slide>'+ 
              '</ion-slide-box>'+
          '</div>'+
          '<div class="bar bar-footer img-bar-footer">'+
              '<div class="row">'+
                '<div class="col" style="color:#ffffff">{{currentLargeImg}}/{{imgsNum}}</div>'+
                '<div class="col"></div>'+
                '<div class="col"></div>'+
                '<div class="col" style="color:#ffffff">保存图片</div>'+
              '</div>'+
          '</div>'+             
      '</div>'
    );
           
  }]);

  img.directive('imgShow',function($compile,$timeout) {
    return {
      restrict: 'EA',
      transclude: true,
      replace: false,
      scope:false,
      link:function($scope,$element,$attrs) {
        if($scope.largeImg.imgsrc != undefined) {
          angular.element($element).append('<img src='+$scope.largeImg.imgsrc+'>').css({
            "background-color":"rgba(5, 5, 5, 5.96)"
          });
        }else {
          angular.element($element).append($scope.largeImg).css({
            "background-color":"rgba(5, 5, 5, 5.96)"
          });
        }

        angular.element(document.querySelector('div.img-bar-footer')).css({
          'height':"20%",
          'background-color':"rgb(5, 5, 5)",
          "background-size":'100% 0'
        });
        /**
        *每一个slider的宽度、高度(即图片宽度、高度)
        */
        var slideWidth = $element[0].offsetWidth;
        var slideHeight = $element[0].offsetHeight;
        /**
        *slide-box的宽度、高度
        */
        // var slideBoxWidth = $('.slider-slides').width();
        // var slideBoxHeight = $('.slider-slides').height();
        var slideBoxWidth = document.querySelector('.slider-slides').style.width;
        var slideBoxHeight = document.querySelector('.slider-slides').style.width;
        /**
        *创建一个hammer对象
        */
        var hammer = new Hammer(angular.element($element)[0]);
            hammer.get('pinch').set({ enable: true });
            hammer.add(new Hammer.Pinch());

        /**
        *捏开点监听
        */
        hammer.on("pinchout", function (e) {
            var scale = 2;
            //捏开点
            var pinchX = e.center.x;
            var pinchY = e.center.y;

            var translateX = (pinchX / scale) * -1 + 20;
            var translateY = (pinchY / scale) * -1 + 20;
 
            //为slide-box的宽度添加一个slideWith宽度，防止溢出，因为放大一倍
            if(!angular.element(document.querySelector('.slider-slides')).hasClass('slide-change-width')) {
              angular.element(document.querySelector('.slider-slides')).css({
                "width":slideBoxWidth + slideWidth * (scale - 1)+'px'
              });
              angular.element(document.querySelector('.slider-slides')).addClass('slide-change-width');
            }

            /**
            *放大动画
            */
            $timeout(function() {
              angular.element($element).css({
                "transformOrigin":"0% 0%",
                "-webkit-transform":"scale("+scale+","+scale+") translate("+translateX+"px, "+translateY+"px)",
                "transform":"scale("+scale+","+scale+") translate("+translateX+"px, "+translateY+"px)",
                "transition": "all 200ms ease-out",
              });
            },100);

            // 设置footer透明度等于0.2
            angular.element(document.querySelector('div.img-bar-footer')).css({
              "opacity":"0.2",
            });
        });
        
        /**
        *捏合缩小，回弹原来大小
        */
        hammer.on("pinchin", function (e) {
            angular.element($element).css({
              "transformOrigin":"50% 50%",
              "transform":"scale(0.8,0.8) translate(0,0)",
              "width":slideWidth+'px',
              "transition": "all 200ms ease-in",
            });
            // 设置footer不透明
            angular.element(document.querySelector('div.img-bar-footer')).css({
              "opacity":"1",
            });
        });

      }
    }
  });

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

        // slide的总个数
        $scope.imgsNum = $scope.larImgs.length;

        $scope.slideImgChange = function($index) {
          $scope.currentLargeImg = $index+1;
        }

      }],
    };
  }]);
 
})(window, angular);
