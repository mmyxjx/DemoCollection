;(function(){

	var Carousel = function(main) {
		var self = this;
		this.main = main;
		// console.log(this.main);
		this.mainList = this.main.find("ul.item-container");
		this.mainItems = this.main.find("li.item");	
		this.cloneItem();
		this.newMainItems = this.main.find("li.item");
		this.itemLength = this.newMainItems.size();
		this.prevBtn = this.main.find(".btn.prev-btn");
		
		this.nextBtn = this.main.find(".btn.next-btn");
		this.spanItems = this.main.find(".dots-container span");
		this.initSetting = {
			width: 1000,//可接受像素数值和fullScreen
			height: 500,//可接受像素数值和fullScreen
			speed: 200,
			autoPlay: 3000
		};
		this.setting = $.extend(this.initSetting,this.getSetting());
		// console.log(this.setting);
		this.setSettingValue();
		this.adjustBtn();
		var index = 0;

		var lastIndex = 0;
		//绑定左右切换的事件
		this.prevBtn.click(function(){
			self.spanItems.eq(lastIndex).removeClass("active");
			index == 0 ? index = (self.mainItems.size()-1): index = index - 1;
			self.spanItems.eq(index).addClass("active");
			lastIndex = index;

			self.play("prev");
		});
		this.nextBtn.click(function(){
			self.spanItems.eq(lastIndex).removeClass("active");
			index == (self.mainItems.size()-1) ? index = 0 : index = index + 1;
			self.spanItems.eq(index).addClass("active");
			lastIndex = index;
			self.play("next");
		});
		//绑定圆点索引事件
		this.spanItems.click(function(){
			if (self.mainItems.is("animated")){
				return;
			} else {
				index = $(this).index();
				self.spanItems.eq(lastIndex).removeClass("active");
				self.mainList.animate(
					{left: - self.setting.width * (index+1)},
					self.setting.speed
					);

				self.spanItems.eq(index).addClass("active");
				lastIndex = index;
			}
		});

		//自动播放
		
		// var timer = null;
		// timer = window.setInterval(function(){
		// 			self.nextBtn.click();
		// 		},self.setting.autoPlay);

		// this.main.hover(function(){
		// 	clearInterval(timer);
		// },function(){
		// 	timer = window.setInterval(function(){
		// 			self.nextBtn.click();
		// 		},self.setting.autoPlay);
			
		// })

	};

	Carousel.prototype = {

		cloneItem: function(){
			newFirst = this.mainItems.last().clone();//复制最后一张图片，插入到第一张图片前面
			newFirst.insertBefore(this.mainItems.first());
			newLast = this.mainItems.first().clone(); //复制第一张图片，插入最后一张图片后面
			newLast.insertAfter(this.mainItems.last());

		},
		getSetting: function(){
			var setting = this.main.attr("data-setting");
			if(setting && setting != ''){
				return $.parseJSON(setting);
			} else {
				return {};
			}
		},
		setSettingValue: function(){
			var self = this;
			var setting = this.setting;
			if (setting.width === "fullScreen" ){ //配置为全屏的时候获取浏览器可视窗口宽度
				var winWidth = $(window).width();
				setting.width = winWidth;
			} 
			if (setting.height === "fullScreen" ){ //配置为全屏的时候获取浏览器可视窗口高度
				var winHeight = $(window).height();
				setting.height = winHeight;
			}
			this.main.css({
				width: setting.width,
				height: setting.height
				});
			this.mainList.css({
				width: setting.width * this.itemLength,
				height: setting.height,
				left: -setting.width	
			});
			this.newMainItems.each(function(i){
				$(this).css({
					width: setting.width,
					height: setting.height
				});

			});

		},
		adjustBtn: function(){
			var height = this.setting.height === "fullScreen" ? 
												$(window).height():this.setting.height;

			var btnHeight = parseInt(this.prevBtn.css("height"));//取纯数值
			var btnTop = Math.ceil(height - btnHeight)/2; //取整数
			this.prevBtn.css({'top':btnTop});
			this.nextBtn.css({'top':btnTop});

		},
		play: function(direction){
			var self = this;
			var listLeft = parseInt(this.mainList.css("left"));
			var left; 
			if (self.mainList.is(":animated")){
				return;
			}
			if(direction === "prev") {
				left = listLeft + this.setting.width;
				if (left === 0) {
					self.mainList.animate(
						{left:left},
						this.setting.speed,
						function(){
							self.mainList.css({
								left: - self.setting.width * (self.itemLength - 2)
							});
					});
				} else {
					self.mainList.animate({left:left},this.setting.speed);
				}

			} else {
				left = listLeft - this.setting.width;
				if (left === - this.setting.width * (this.itemLength - 1)) {
					self.mainList.animate(
						{left:left},
						this.setting.speed,
						function(){
							self.mainList.css({
								left: - self.setting.width
							});
					});
				} else {
					self.mainList.animate({left:left},this.setting.speed);
				}

			}
		},
		
	}
	Carousel.init = function(posters){
		var _this= this;

		//将传递进来的节点，根据节点的个数实例化
		posters.each(function(i,ele){
			new _this($(this));
		})

	}


	
	window.Carousel = Carousel;

})(jQuery);