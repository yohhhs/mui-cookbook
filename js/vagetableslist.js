mui.init()
(function(){
	var cid = "",
		pageNo = 1,
		dom = {
			noResult: document.getElementById("noresult"),
			loaderWrap: document.getElementById("loaderWrap"),
			listWrap: document.getElementById("listWrap"),
			vegetablesName: document.getElementById("vegetablesName")
		},
		load = PullUp();
	load.loadMore(getList);
	mui.plusReady(function(){
		var self = plus.webview.currentWebview();
		cid = self.vegetablesId;
		vegetablesName.innerText = self.vegetablesName;
		getList();
	})
	function getList(){
		mui.get("http://apicloud.mob.com/v1/cook/menu/search?key=206b871665840&cid="+cid+"&page="+pageNo+"&size=20",function(res){
  			res = JSON.parse(res);
      		if(res.retCode == 200){
      			render(res.result.list);
      		}else{
      			loaderWrap.style.display = "none";
      			noResult.style.display = "block";
      		}
      	})
	}
	function render(data){
		if(data.length == 0){
			load.endLoadMore(true);
			return;
		};
		load.endLoadMore();
		var liCode = returnLiCode(data);
		if(pageNo != 1){
			listWrap.innerHTML += liCode;
		}else{
			loaderWrap.style.display = "none";
			listWrap.innerHTML = liCode;
			lazy();
		}
		pageNo++;
	}
	function returnLiCode(data){
		var liCode = "";
		data.forEach(function(item){
			var spanCode = returnSpanCode(item.ctgTitles);
			liCode += '<li class="list-item" data-id="'+item.menuId+'">'+
			    		'<div class="img-wrap">'+
			    			'<img class="item-img lazy-img" src="../img/lazyimg.png" data-src="'+item.thumbnail+'" />'+
			    		'</div>'+
			    		'<div class="list-box">'+
			    			'<h2 class="item-title">'+item.name+'</h2>'+
			    			'<div class="tag-wrap">'+spanCode+'</div>'+
			    		'</div>'+
			    	'</li>'
		})
		return liCode;
	}
	function returnSpanCode(data){
		var _spanCode = "";
		data.split(",").forEach(function(item){
			_spanCode += '<span class="tag">'+item+'</span>'
		})
		return _spanCode;
	}
	function lazy(){
		var i = 0,
			imgList = mui(".lazy-img[data-src]"),
			len = imgList.length;
		if(len === 0){
			return false;
		};
		for(; i < len; i++){
			if(isInViewport(imgList[i])){
				imgList[i].src = imgList[i].getAttribute("data-src");
				imgList[i].removeAttribute("data-src");
			};
		};
	}
	function isInViewport(img){
		var rect = img.getBoundingClientRect();
		return rect.top >= 0 && rect.bottom <= window.innerHeight;
	}
	window.addEventListener("scroll",lazy);
	mui("#listWrap").on("tap",".list-item",function(){
		var detailId = this.dataset.id;
		mui.openWindow({
  			url: "detail.html",
  			id: "detail.html",
  			waiting: {
  				autoShow: false
  			},
  			extras:{
  				detailId: detailId
		    },
  			styles:{
				scrollIndicator:"none"
			}
  		})
	})
}());