// JavaScript Document
(function() {
	jQuery.focus = function(slid) {
		var sWidth = $(slid).width(); //获取焦点图的宽度（显示面积）
		var $li = $(slid).find("ul li");
		var len = $li.length; //获取焦点图个数
		var index = 0;
		var picTimer;
		
		//滚动图片作居中处理
		var showW = $li.width();
		var showH = $li.height();
		$li.find("img").each(function (i, e) {
			$(this).css({
				"margin-left": -Math.abs(showW - $(this).width())/2,
				"margin-top": -Math.abs(showH - $(this).height())/2
			})
		})
		
		//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
		//var btn = "<div class='btnBg'></div><div class='btn'>";  //带半透明条
		var btn = "<div class='btn'" +"style='margin-left:-"+ (28*len+20)/2 +"px'>";  //不带半透明条
		for(var i=0; i < len; i++) {
			var ii = i+1;
			//btn += "<span>"+ii+"</span>"; //带数字
			btn += "<span>" + "</span>"; //不带数字
		}
		btn += "</div><div class='preNext pre'><div class='pre-btn'></div></div><div class='preNext next'><div class='next-btn'></div></div>";
		$(slid).append(btn);
		//$(slid).find("div.btnBg").css("opacity",0.5);
	
		//为小按钮添加鼠标滑入事件，以显示相应的内容
		$(slid+" div.btn span").css("opacity",0.8).mouseenter(function() {
			index = $(slid+" .btn span").index(this);
			showPics(index);
		}).eq(0).trigger("mouseenter");
	
		//上一页、下一页按钮透明度处理
		$(slid+" .preNext").css("opacity",0.6).hover(function() {
			$(this).stop(true,false).animate({"opacity":"0.8"},200);
		},function() {
			$(this).stop(true,false).animate({"opacity":"0.6"},200);
		});
	
		//上一页按钮
		$(slid+" .pre").click(function() {
			index -= 1;
			if(index == -1) {index = len - 1;}
			showPics(index);
		});
	
		//下一页按钮
		$(slid+" .next").click(function() {
			index += 1;
			if(index == len) {index = 0;}
			showPics(index);
		});
	
		//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
		//$(slid+" ul").css("width",sWidth * (len));

		//当页面宽度改变时，相应改变数据，实现响应式
//		$(window).resize(function(e) {
//			sWidth = $(slid).width();
//			len = $(slid).find("ul li").length;
//		});

		//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
		$(slid).hover(function() {
			clearInterval(picTimer);
		},function() {
			picTimer = setInterval(function() {
				showPics(index);
				index++;
				if(index == len) {index = 0;}
			},5000); //此4000代表自动播放的间隔，单位：毫秒
		}).trigger("mouseleave");
		
		//显示图片函数，根据接收的index值显示相应的内容
		function showPics(index) { //普通切换
			var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
			$(slid+" ul").stop(true,false).animate({"left":nowLeft},500); //通过animate()调整ul元素滚动到计算出的position
			$(slid+" .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
			$(slid+" .btn span").stop(true,false).animate({"opacity":"0.8"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
		}
	};
	
	//绑定标签页切换功能
	jQuery.tagSelect = function (tag) {
		var $tag = $(tag);
		$tag.each(function (i,e) {
			$(e).find("ul.tag-nav").children("li").on("click", function () {
				$(this).addClass("active").siblings().removeClass("active");
				var index = $(this).index();
				var ele = $(e).children("div.tag-con")[index];
				$(ele).addClass("active").siblings("div").removeClass("active");
			})
		})
	}
//	$.fn.hoverDelay = function(options){
//      var defaults = {
//          hoverDuring: 100,
//          outDuring: 100,
//          hoverEvent: function(){
//              $.noop();
//          },
//          outEvent: function(){
//              $.noop();    
//          }
//      };
//      var sets = $.extend(defaults,options || {});
//      var hoverTimer, outTimer;
//      return $(this).each(function(){
//          $(this).hover(function(){
//              clearTimeout(outTimer);
//              hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
//          },function(){
//              clearTimeout(hoverTimer);
//              outTimer = setTimeout(sets.outEvent, sets.outDuring);
//          });    
//      });
//  }      
	
	jQuery.manNav = function (nav) {
		var $manNav = $(nav);
		$manNav.children(".second").children("a").on("click", function () {
			$(this).next("ul").slideToggle();
			return false;
		})
	}
})(jQuery);

$(document).ready(function () {
	// 绑定二级菜单功能
	$("#navigation").find("li.second").hover(function () {
		$(this).children("ul").stop(true,false).slideToggle("fast");
	});
//	$("#navigation").delegate("li.second", "click", function () {
//		$(this).children("ul").slideToggle();
//	});

	//绑定侧边栏
	var $aside = $("#aside");
	if ($aside.length > 0) {
		var top = $aside.offset().top;
		$(window).scroll(function() {
			if ($(window).scrollTop() > top) {
				$aside.addClass("fixed");
			} else if ( ($(window).scrollTop() < top) && ($aside.hasClass("fixed")) ) {
				$aside.removeClass("fixed");
			}
		});
	}
	
})

function indexLoad () {
	window.onload = function () {
		$("#load").fadeOut("400");
	}
}
