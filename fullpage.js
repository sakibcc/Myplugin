;(function (window,$) {
	$.fn.fullpage = function (options) {
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

		$(window).keydown(function(event) {
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

		return this;
	}
}(window,jQuery))