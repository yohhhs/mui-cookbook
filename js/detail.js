mui.init()
(function(){
	var detailId = "",
	dom = {
		loaderWrap: document.getElementById("loaderWrap"),
		title: document.getElementById("title"),
		foodName: document.getElementById("foodName"),
		foodSummary: document.getElementById("foodSummary"),
		foodImg: document.getElementById("foodImg"),
		foodIngredients: document.getElementById("foodIngredients"),
		method: document.getElementById("method")
	}
	mui.plusReady(function(){
		var self = plus.webview.currentWebview();
		detailId = self.detailId;
		getList();
	})
	function getList(){
		mui.get("http://apicloud.mob.com/v1/cook/menu/query?key=206b871665840&id=" + detailId,function(res){
  			res = JSON.parse(res);
      		if(res.retCode == 200){
      			render(res.result);
      		}
      	})
	}
	function render(data){
		var recipe = data.recipe;
		title.innerText = data.name;
		foodName.innerText = recipe.title;
		foodSummary.innerText = recipe.sumary;
		recipe.img ? foodImg.src = recipe.img : foodImg.style.display = "none";
		recipe.ingredients ? foodIngredients.innerText = "食材：" + recipe.ingredients : foodIngredients.style.display = "none";
		if(!recipe.method){
			method.style.display = "none";
			return false;
		}
		var methodCont = "";
		JSON.parse(recipe.method).forEach(function(item){
			item.img && (methodCont += "<img src='"+item.img+"'>");
			item.step && (methodCont += "<p>"+item.step+"</p>");
		});
		method.innerHTML = methodCont;
		loaderWrap.style.display = "none";
	}
}())