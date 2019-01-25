//timeline组件
//使用方法 var timeline = new OpTimeLine({el:"op-timeline"});
//参数：
//el :挂载元素id(必传)
//color :时间轴颜色，默认#fe8a25
//dateFormat :时间格式化字符串，默认yyyy-MM-dd HH:mm
//side :时间展示位置,"left"：左侧展示,"top":顶部展示
//list :数据，格式如下,[{date : "",(时间戳)title : "",detail : []}]
//
//方法：
//timeline.updated(data)：data为更新后的数据,会重新渲染时间轴
;(function(){
  "use strict";
  var _global;
  //对象合并
	function _extend(obj,opt,cover) {
		for(var key in opt) {
			if(opt.hasOwnProperty(key) && !obj.hasOwnProperty(key) || cover){
				obj[key] = opt[key];
			}
		}
		return obj;
	}
  //时间格式
  Date.prototype._Format = function (fmt) { //author: meizz
    var o = {
       "M+": this.getMonth() + 1, //月份
       "d+": this.getDate(), //日
       "D+": this.getDate(), //日
       "h+": this.getHours(), //小时
       "H+": this.getHours(), //小时
       "m+": this.getMinutes(), //分
       "s+": this.getSeconds(), //秒
       "q+": Math.floor((this.getMonth() + 3) / 3), //季度
       "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
       if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
       return fmt;
  };

  function format(dt,fmd){
		if(typeof dt === 'string') dt = dt.replace(/-/g, "/");
		return dt ? new Date(dt)._Format(fmd||"yyyy-MM-dd HH:mm") : "暂无时间";
	}

  //组件内容
	function OpTimeLine(config) {
		this.initial(config);
    this._createLine(this.el);
	}
  OpTimeLine.prototype = {
    constructor : this,
    //参数初始化
    initial : function(config){
      var def = {
        el : undefined,//需要挂载的dom元素id(必传)
        color: "#fe8a25",//时间轴颜色
        dateFormat : "yyyy-MM-dd HH:mm",//时间格式化
        side : "left",//时间展示位置
        list : [],//数据
      };
      this.def = _extend(def,config,true);
      this.el = document.getElementById(this.def.el);
      if(!this.el) throw new Error("找不到挂载元素")
      //数据更新
      this.updated = function fn(data){
        this.def.list = data;
        this.el.children[0].remove();
        this._createLine(this.el);
      };
    },
    _createElement : function(dom,className,text){
      var _dom = document.createElement(dom);
      if(className) _dom.classList.add(className);
      if(text) _dom.innerHTML = text;
      return _dom;
    },
    //渲染数据
    _createLine : function(dom){
      var container = this._createElement("div","op-container");
      for(var i = 0,len = this.def.list.length ;i<len;i++){
        var elem = this.def.list[i];
        var _block = this._createElement("div","op-timeline-block");
        //时间
        var _date = this._createElement("div","op-date",format(elem.date,this.def.dateFormat));
        //时间轴
        var _timeLineIMG = this._createElement("div","op-timeline-img");
        _timeLineIMG.setAttribute("style","color:"+this.def.color);
        //标题
        var _title = this._createElement("div","op-timeline-title",elem.title);
        //内容
        var _content = this._createElement("div","op-timeline-content");
        if(this.def.side === "top"){
          _date.classList.add("top");
          _content.append(_date);
        }
        _content.append(_title);
        if(elem.detail){
          for(var j=0,subLen = elem.detail.length;j<subLen;j++){
            var _detail = this._createElement("div",undefined,elem.detail[j]);
            _content.append(_detail);
          }
        }
        if(this.def.side === "left") _block.append(_date);
        _block.append(_timeLineIMG);
        _block.append(_content);
        container.append(_block);
      };
      dom.append(container);
    }
  }

  _global = (function () {return this || (0,eval)('this');}());
	 !('OpTimeLine' in _global) && (_global.OpTimeLine = OpTimeLine);
}())
