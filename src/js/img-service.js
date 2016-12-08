/**
*工厂服务，定义一个actionImgShow服务
*在控制器中使用该服务可以简单方便实现图片放大滑动轮播显示功能
*基本用法
*双击图片
*$scope.onDoubleTap = function($index) {
      actionImgShow.show({
        "larImgs":imgs,
        "currentImg":$index,
        imgClose : function() {
            actionImgShow.close();
        }
    });
}
*
*/
;(function(){
angular.module('starter.imgservices', [])
.factory('actionImgShow', function($rootScope,$compile,$ionicBody,$ionicPlatform, $ionicHistory) {
	var obj = {
		element: null,
		backbuttonRegistration: null,
		scope: null
	};
	var fns = {
		showLargeImg: function(opts) {
			var scope = $rootScope.$new(true);
			angular.extend(scope, {
		      larImgs: null,
		      currentImg: null,
		      imgClose: null
		    },opts ||　{});
				
			var	element = scope.element = $compile('<img-slide-large lar-imgs="larImgs" current-img="{{currentImg}}" img-close="imgClose()"></img-slide-large>')(scope);

			$ionicBody.append(element);

    		actionImgShow.imgIsShow = true;

    		obj.element = element;
			obj.scope = scope;
			/**
			*自定义一个硬件返回按钮的注册事件，事件的优先级为102，可以优先关闭图片放大层
			*返回一个注销该后退按钮动作的函数backbuttonRegistration并赋值全局obj变量
			*/
			obj.backbuttonRegistration = $ionicPlatform.registerBackButtonAction(function(e) {
		        e.preventDefault();
		        if(actionImgShow.imgIsShow) {
			          actionImgShow.close(); 
			        }else {
			          if($ionicHistory.backView()) {
			            $ionicHistory.goBack();
			        }
			      }  
		      },102);
		},

		/**
		*关闭图片放大层
		*/
		closeLargeImg: function() {
			this.imgIsShow = false;
			// 销毁作用域
			obj.scope.$destroy();

			obj.element.remove();
			// 执行该注销该后退按钮动作的函数
			if(obj.backbuttonRegistration) {
				obj.backbuttonRegistration();	
			}

			obj = {
				element: null,
				backbuttonRegistration: angular.noop,
				scope: null
			};		
		},
		
	};

	/**
	*返回的服务对象
	*/
	var actionImgShow = {
		// 图片放大服务的活动状态，true表示已弹出图片放大层，false表示关闭状态
		imgIsShow: false,
		// 图片放大层的弹出展示函数
		show: fns.showLargeImg,
		// 图片放大层的关闭函数
		close: fns.closeLargeImg
	};

	return actionImgShow;	
});
})();