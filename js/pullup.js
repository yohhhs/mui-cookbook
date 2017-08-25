/*
*上拉加载更多组件
*作者 : youhuahaohaoshuo
*/
(function(doc, win){
	var config = {
		loadTxt: "上拉加载更多",
		loadingWrap: "<div class='loader'></div>",
		endTxt: "已经到底了，别扯了"
	}
	var loadMoreEnd = false,
		isRefresh = false,
		wrapStyle = "position: relative;padding: 12px;height:50px;line-height:30px;text-align:center;font-size:14px;color:#9E9E9E;display:none;";
	function PullUp(options){
		if(this instanceof PullUp){
			this.extend(config, options);
		}else{
			return new PullUp(options);
		}
	}
	PullUp.prototype = {
		constructor: PullUp,
		extend: function(){
			var len = arguments.length,
				i = 0;
			for(; i < len; i++){
				for(var k in arguments[i]){
					this[k] = arguments[i][k];
				}
			}
		},
		loadMore: function(fn){
			var self = this;
			var wrap = doc.getElementById("loadMore");
			if(!wrap){
				wrap = doc.createElement("div");
				wrap.setAttribute("id", "loadMore");
				wrap.style.cssText = wrapStyle;
				wrap.innerHTML = self.loadTxt;
				doc.body.appendChild(wrap);
			}
			var timer = null;
			window.addEventListener('scroll', function(){
				if(isRefresh || loadMoreEnd){
					return false;
				}
				if(getComputedStyle(wrap).display == "none"){
					wrap.style.display = "block";
				}
				if(timer != null){
					clearTimeout(timer);
				}
				timer = setTimeout(function(){
					var scrollTop = doc.body.scrollTop,
						offsetTop = wrap.offsetTop,
						winHeight = win.innerHeight;
					if(offsetTop + 10 < scrollTop + winHeight){
						isRefresh = true;
						wrap.innerHTML = self.loadingWrap;
						fn();
					}
				},200);
			});
		},
		endLoadMore: function(isEnd){
			var self = this;
			var wrap = doc.getElementById("loadMore");
			if(isEnd){
				wrap.innerHTML = this.endTxt;
				loadMoreEnd = true;
			}
			isRefresh = false;
		},
		resetLoadMore: function(){
			var self = this;
			var wrap = doc.getElementById("loadMore");
			loadMoreEnd = false;
			wrap.innerHTML = self.loadTxt;
			wrap.style.display = "none";
		}
	}
	win.PullUp = PullUp;
}(document, window))
