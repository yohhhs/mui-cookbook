mui.init();
(function(){
	mui.plusReady(function(){
		plus.navigator.setStatusBarBackground('#F2970B'); // 设置系统状态栏区域背景颜色
	})
	var loaderWrap = document.getElementById("loaderWrap");
	function getCook(){
  		mui.get("http://apicloud.mob.com/v1/cook/category/query?key=206b871665840",function(res){
  			res = JSON.parse(res);
      		if(res.retCode == 200){
      			render(res.result.childs);
      		}
      	})
  	}
  	function render(data){
  		var sectionCode = returnSectionCode(data);
  		document.getElementById("content").innerHTML = sectionCode;
  		loaderWrap.style.display = "none";
  	}
  	function returnSectionCode(data){
  		var sectionCode = "",
  			liCode = "";
  		data.forEach(function(item){
  			liCode = returnLiCode(item.childs);
  			sectionCode += '<section class="menu">'+
						    	'<h1 class="menu-title">'+item.categoryInfo.name+'</h1>'+
						    	'<ul class="menu-cont">'+liCode+'</ul>'+
						    '</section>'
  		})
  		return sectionCode;
  	}
  	function returnLiCode(data){
  		var liCode = "";
  		data.forEach(function(item){
  			liCode += '<li class="menu-item">'+
			    			'<span class="menu-item-text" data-id="'+item.categoryInfo.ctgId+'">'+item.categoryInfo.name+'</span>'+
			    		'</li>'
  		})
  		return liCode;
  	}
  	mui("#content").on("tap",".menu-item-text",function(){
  		var self = this;
  		var vegetablesId = self.dataset.id;
  		var vegetablesName = self.innerText;
  		mui.openWindow({
  			url: "page/vegetableslist.html",
  			id: "page/vegetableslist.html",
  			waiting: {
  				autoShow: false // 禁止默认转场loading
  			},
  			extras:{ // 传递菜谱id和名称
  				vegetablesId: vegetablesId, 
  				vegetablesName: vegetablesName 
		    }
  		})
  	})
  	getCook();
}())