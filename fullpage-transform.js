;(function (window,$) {
	$.fn.fullpage = function (options) {
		//pageClass : 子页面的类名
		//maxPage ： 子页面的总数
		options = $.extend({
			pageClass : "pages",
			maxPage : 5
		},options);
		
		var tag = 0,
			current_Y = 0,
			_this = $(this);

		//配置关键样式
		$('body').css('overflow', 'hidden');
		_this .css({
			position: 'relative',
			transform : 'translate3d(0,0,0)',
			top: '0'
		});
		var $sections = _this .children('.'+options.pageClass);
		$sections.css('width', '100%');
		$sections.css('height', window.innerHeight+'px');

		//绑定resize事件
		$(window).resize(function(event) {
	        $sections.css('height', window.innerHeight+'px');
	        _this.css({
                        transition: 'transform 0s ease',
                        transform: 'translateY('+(-window.innerHeight * tag)+'px)'
                    });
        	current_Y  = -window.innerHeight * tag;
   		 });
		//绑定keydowm事件
	    $(window).on(
	    	'keydown' , function(event) {
		    	 if(event.keyCode == 40) {
		            if(tag !== options.maxPage - 1){
		                if(!_this .is(":animated")){
		                    tag += 1;
		                    _this.css({
		                        transition : 'transform 1s ease',
		                        transform : function () {
		                            current_Y  -= $sections[0].offsetHeight;
		                            return 'translateY('+ current_Y +'px)';
                        		}
                   			 });
		                }
		            }
		       	 }else if(event.keyCode == 38) {
		           if(tag !== 0){         
		                if(!_this .is(":animated")){
		                    tag -= 1;
		                    _this.css({
		                        transition : 'transform 1s ease',
		                        transform : function () {
                            		current_Y  += $sections[0].offsetHeight;
                            		return 'translateY('+current_Y +'px)';
                        		}
                    		});
		                }
		            }
		         }
	   		 });
	    //绑定滚轮事件
	    $(window).on('mousewheel DOMMouseScroll', function(event) {
	    	//兼容firefox
	    	var delta = event.originalEvent.detail !== 0 ? -event.originalEvent.detail : event.originalEvent.wheelDelta;
	    	if(delta < 0) {
	    		if(tag !== options.maxPage - 1){
	    		    if(!_this .is(":animated")){
	    		        tag += 1;
	    		        _this.css({
	                        transition : 'transform 1s ease',
	                        transform : function () {
	                            current_Y  -= $sections[0].offsetHeight;
	                            return 'translateY('+ current_Y +'px)';
                    		}
                   		});
	    		    }
	    		}
	    	}else if(delta > 0) {
	    		if(tag !== 0){         
	    		       if(!_this .is(":animated")){
	    		           tag -= 1;
	    		           _this.css({
		                        transition : 'transform 1s ease',
		                        transform : function () {
                            		current_Y  += $sections[0].offsetHeight;
                            		return 'translateY('+current_Y +'px)';
                        		}
                    		});
	    		       }
	    		 }
	    	}
	    });
	}
	return this;
}(window,jQuery))