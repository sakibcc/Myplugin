;(function (window,$) {
	$.fn.fullpage = function (options) {
		//pageClass : 子页面的类名
		//maxPage ： 子页面的总数
		options = $.extend({
			pageClass : "pages",
			maxPage : 5
		},options);
		
		var tag = 0,
			_this = $(this);

		//配置关键样式
		$('body').css('overflow', 'hidden');
		_this .css({
			position: 'relative',
			top: '0'
		});
		var $sections = _this .children('.'+options.pageClass);
		$sections.css('width', '100%');
		$sections.css('height', window.innerHeight+'px');

		//绑定resize事件
		$(window).resize(function(event) {
	        $sections.css('height', window.innerHeight+'px');
	        _this .css('top', '-'+ window.innerHeight * tag +'px');
   		 });
		//绑定keydowm事件
	    $(window).on(
	    	'keydown' , function(event) {
		    	 if(event.keyCode == 40) {
		            if(tag !== options.maxPage - 1){
		                if(!_this .is(":animated")){
		                    tag += 1;
		                    _this .animate({top : "-="+$sections[0].offsetHeight}, 1000)
		                }
		            }
		       	 }else if(event.keyCode == 38) {
		           if(tag !== 0){         
		                if(!_this .is(":animated")){
		                    tag -= 1;
		                    _this .animate({top : "+="+$sections[0].offsetHeight}, 1000)
		                }
		            }
		         }
	   		 });
	    //绑定滚轮事件
	    $(window).on('mousewheel DOMMouseScroll', function(event) {
	    	var delta = event.originalEvent.detail !== 0 ? -event.originalEvent.detail : event.originalEvent.wheelDelta;
	    	if(delta < 0) {
	    		if(tag !== options.maxPage - 1){
	    		    if(!_this .is(":animated")){
	    		        tag += 1;
	    		        _this .animate({top : "-="+$sections[0].offsetHeight}, 1000)
	    		    }
	    		}
	    	}else if(delta > 0) {
	    		if(tag !== 0){         
	    		       if(!_this .is(":animated")){
	    		           tag -= 1;
	    		           _this .animate({top : "+="+$sections[0].offsetHeight}, 1000)
	    		       }
	    		 }
	    	}
	    });
	}
	return this;
}(window,jQuery))