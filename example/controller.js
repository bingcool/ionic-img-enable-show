/**
仅是测试即演示用例
*/
.controller('SlideCtrl', function($scope, $rootScope,actionImgShow)
// 现在定义一些图片数组
var allimgs = [
      {
        imgsrc: '/img/mike.png'
      },
      {
        imgsrc: '/img/ben.png'
      },
      {
        imgsrc: '/img/adam.jpg'
      },
      {
        imgsrc: '/img/perry.png'
      }

    ];

    //绑定至前端的初始显示，点击之后将会触发下面的onDoubleTap事件。
    $scope.imgs = allimgs;

    /**
    *图片预加载
    */
    var arrImgs = new Array();
    for(var i=0; i<allimgs.length; i++) {

      var img = new Image();

      img.src = allimgs[i].imgsrc;

      img.onload = function(i) {
        arrImgs[i] = img;
      }(i);
      
    }

    /**
    *双击触发事件
    *$index表示是第几张图片的索引，直接从该图片放大显示。
    */
    $scope.onDoubleTap = function($index) {
      actionImgShow.show({
        "larImgs": arrImgs,
        //"larImgs": allimgs,配置成这个也是可以的，只是图片没有预加载，每次放大预览都需要重新加载图片 
        "currentImg": $index,
        imgClose : function() {
          actionImgShow.close();
        }
    });
}