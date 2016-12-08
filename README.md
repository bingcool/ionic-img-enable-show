img-enable-show
========================

##Demo
这是基于ionic和angularjs实现的一个图片放大预览的服务组件。

![alt tag](/src/img/demo.gif)
录制时有点问题，出现卡顿

##用法
注意：依赖于hammerjs,可以应用cdn或者自己下载
（1）首先我们需要在index.html文件中引入js文件和css文件
```html
    <link rel="stylesheet" type="text/css" href="path/img-enable-show.css">     
    <script type="text/javascript" src="path/hammer.js"></script>        
    <script type="text/javascript" src="path/img-directive.js"></script>
    <script type="text/javascript" src="path/img-service.js"></script>
```
（2）在app.js的控制器中，加入依赖的'ng-img','starter.imgservices'两个模块
```
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngResource','ngCordova','ng-mfb','ng-img','starter.imgservices'])

```

（3）那么在controller中，引入actionImgShow服务。
```
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

```
（4）实现功能           
a）双击图片放大预览功能，可以滑动轮播显示图片。           
b)双指捏放实现放大图片预览，双指捏放在图片的某一部位，特定对该部位进行放大显示。                
c)模板功能，在放大图片预览的下面可以修改指令中的缓存模板中的footer,可以自定义各种需要再实现的功能，比如在下面增加一个分享的模板或者评论模板。       
d)基于ionic的服务组件形式，图片的预加载功能，方便使用。        







