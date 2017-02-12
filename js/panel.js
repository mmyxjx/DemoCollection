var ANGLE = 90;
var $panels = $(".wowpanel");
var $content = $(".content");
var colors = ['#4975FB', '#924DE6', '#EF5252', '#F59500'];

$content.each(function(i){
	var $this=$(this);
	$this.css("background-color",colors[i]);
	$this.parent().on("mouseout", function(){
		$this.css("transform","perspective(300px) rotateY(0deg) rotateX(0deg)");

	});
	$this.parent().on("mousemove", function(e){
		/////事件加在父级元素上，因为加在自身元素上的时候，自身元素会旋转，鼠标移动到边角会出现闪烁，所以事件监听的是不形变的父级元素上的鼠标移动
		var w = $this.width();
		var h = $this.height();
		var y = parseInt((e.offsetX - w * 0.5) / w * ANGLE);
		var x = parseInt((1 - (e.offsetY - h * 0.5)) / h * ANGLE);
		var transformString = "perspective(300px)"+" "+"rotateY("+y+"deg)"+" "+"rotateX("+x+"deg)";

		$this.css("transform",transformString);



	});

});
