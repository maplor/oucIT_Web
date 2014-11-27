// JavaScript Document
// Author: Maplor
// Date: 2014-11-27
// Changes(每次修改+1): 27
(function() {
	$.extend({
		focus: function(slid) {
			var $slid = $(slid);
			if ($slid.length > 0) {
				var sWidth = $slid.width(); //获取焦点图的宽度（显示面积）
				var $li = $slid.find("ul li");
				var len = $li.length; //获取焦点图个数
				var index = 0;
				var picTimer;
				var supportTrans = false;
				if (("MozTransform" in document.documentElement.style || "WebkitTransform" in document.documentElement.style || "OTransform" in document.documentElement.style || "transform" in document.documentElement.style) && ("WebkitTransition" in document.documentElement.style || "MozTransition" in document.documentElement.style || "OTransition" in document.documentElement.style || "transition" in document.documentElement.style)) {
					supportTrans = true;//支持CSS3 transform 和 transition 则为true
				}
				
				//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
				//var btn = "<div class='btnBg'></div>";  //带半透明条
				var btn = ""; //"<div class='btn'" +"style='margin-left:-"+ (28*len+20)/2 +"px'></div>";  //不带半透明条
	//			for(var i=0; i < len; i++) {
	//				var ii = i+1;
	//				//btn += "<span>"+ii+"</span>"; //带数字
	//				btn += "<span>" + "</span>"; //不带数字
	//			}
				btn += "<div class='preNext pre'><div class='pre-btn'></div></div><div class='preNext next'><div class='next-btn'></div></div>";
				$slid.append(btn);
				//$slid.find("div.btnBg").css("opacity",0.5);
			
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
				
				//滚动图片作居中处理
				var showH = $li.height();
				$li.find("img").each(function (i, e) {
					$(this).css("margin-top", (showH - $(this).height())/2);
				});
				
				//当页面宽度改变时，相应改变数据，实现响应式
				$(window).resize(function(e) {
					sWidth = $slid.width();
					$li.find("img").each(function (i, e) {
						$(this).css("margin-top", (showH - $(this).height())/2);
					});
				});
		
				//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
				$slid.hover(function() {
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
					if (supportTrans) {
						$(slid+" ul").stop(true,false).css({
							"WebkitTransform": "translate(" + nowLeft + "px,0)",
							"MozTransform": "translate(" + nowLeft + "px,0)",
							"OTransform": "translate(" + nowLeft + "px,0)",
							"transform": "translate(" + nowLeft + "px,0)"
						}); //通过transform调整ul元素滚动到计算出的position
					} else{
						$(slid+" ul").stop(true,false).animate({"left":nowLeft},500); //通过animate()调整ul元素滚动到计算出的position
					}
//					$(slid+" .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
//					$(slid+" .btn span").stop(true,false).animate({"opacity":"0.8"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
				}
			}
		},
		
		cardImg: function (card) {
			var $card = $(card);
			if ($card.length > 0) {
				$card.find("div.card-img").each(function (i, e) {
					var showH = $(this).height();
					if (showH > 1) {
						var imgH = $(this).children("img").height();
						$(this).children("img").css("margin-top", (showH - imgH)/2);
					} else{
						$(this).hide();
					}
				})
				$(window).resize(function() {
					$card.find("div.card-img").each(function (i, e) {
						var showH = $(this).height();
						if (showH > 1) {
							var imgH = $(this).children("img").height();
							$(this).children("img").css("margin-top", (showH - imgH)/2);
						} else{
							$(this).hide();
						}
					})
				});
			}
		},
		
		manNav: function (nav) {
			var $manNav = $(nav);
			$manNav.children(".second").children("a").on("click", function () {
				$(this).next("ul").slideToggle();
				return false;
			})
		}
	});
})(jQuery);

$(document).ready(function () {
	//首页正在加载提示
	var $load = $("#load");
	if ($load.length > 0) {
		var t = 0;
		var timer = setInterval(function () {
			t++;
		}, 1000);
		window.onload = function () {
			$.focus("#focus");
			$.cardImg(".card");
			if (t > 2) {
				$load.fadeOut("400");
			} else {
				setTimeout(function () {
					$load.fadeOut("400");
				}, 1000);
			}
			clearInterval(timer);
		}
	}
	
	// 绑定二级菜单功能
	$("#navigation").find("li.second").hover(function () {
		$(this).children("ul").stop(true,false).slideDown("fast");
	},
	function () {
		$(this).children("ul").stop(true,false).slideUp("fast");
	});

	//绑定侧边栏功能
	var $aside = $("#aside");
	if ($aside.length > 0) {
		//侧边栏固定位置]
		var top = $aside.offset().top;
		$(window).scroll(function() {
			if ($(window).scrollTop() > top) {
				$aside.addClass("fixed");
			} else if ( ($(window).scrollTop() < top) && ($aside.hasClass("fixed")) ) {
				$aside.removeClass("fixed");
			}
		});
		
		//显示所在位置
		var urlRequest = document.location.search;
		if (urlRequest) {
			$aside.find("a").each(function (i, e) {
				if ($(this).attr("href").split("?")[1] == decodeURI(urlRequest).substr(1)) {
					$(this).parent().addClass("active");
				}
			})
		}
	}
	
	//绑定标签页切换功能
	var $tag = $(".tag");
	if($tag.length > 0) {
		$tag.each(function (i,e) {
			$(e).find("ul.tag-nav").children("li").on("click", function () {
				$(this).addClass("active").siblings().removeClass("active");
				var index = $(this).index();
				var ele = $(e).children("div.tag-con")[index];
				$(ele).addClass("active").siblings("div").removeClass("active");
			})
		})
	}
	
	//绑定折叠列表功能
	var $flodList = $(".flod-list");
	if ($flodList.length > 0) {
		$flodList.each(function (i,e) {
			$(e).find("h2").on("click", function () {
				$(this).toggleClass("active").next().slideToggle(400);
			})
		})
		
	}
	
	//绑定回到顶部功能
	var topBtn = document.getElementById('to-top');
	var timer = null;
	var isTop = true;
	//获取页面可视区高度
	var cHeight = document.documentElement.clientHeight;
	//滚动时触发
	window.onscroll = function() {
		//获得已滚动距离
		var top = document.documentElement.scrollTop || document.body.scrollTop;
		if (top >= cHeight) {
			topBtn.style.display = 'block';
		} else {
			topBtn.style.display = 'none';
		}
		
		if (!isTop) {
			clearInterval(timer);
		}
		isTop = false;
	}
	topBtn.onclick = function() {
		//设置定时器
		timer = setInterval(function(){
			//获得已滚动距离
			var top = document.documentElement.scrollTop || document.body.scrollTop;
			//每次滚动的距离
			var speed = Math.floor(-top / 6);
			document.documentElement.scrollTop = document.body.scrollTop = top + speed;
			
			isTop = true;
			
			if (top == 0) {
				clearInterval(timer);
			}
		}, 30);
		return false;
	}
	
	try {
		if (window.console && window.console.log) {
			console.log("%c全心学技术，用心去生活 —— 爱特工作室", "color:red");
			console.log("本网站由 爱特工作室 设计制作\n中国海洋大学 信息学院北楼A502，学生实践中心\n介绍视频：http://v.youku.com/v_show/id_XNzYyMTU2OTg0.html");
			console.log("网站意见反馈：maplor@163.com");
		}
	} catch(e) {}

})
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
