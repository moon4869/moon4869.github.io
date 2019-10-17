/**
 * Main js for hexo-theme-Annie.
 *
 * @Author   Sariay
 * @DateTime 2019-08-26
 */
jQuery(document).ready(function($) {

	"use strict";

	/**
	 * Some global variables.
	 */
	var scrollLimitG = 500,
		scrollSpeedG = 500,
		delayTimeG = 500,
		headerH = $('header').outerHeight(),
		headerAId = '#navigation-show a, #logo a',
		postContentH = $('#article-content').outerHeight(),
		mainH = $("main").outerHeight(),
		investmentContainerH = $(".investment-container").outerHeight(),
		postPageId = '.layout-post',
		postCoverId = '#current-post-cover',
		postTocId = '#catelog-list',
		paginationId = '#pagination a',
		paginationContainer = '#layout-cart, #layout-pure';
	// loadAnimation：Loading animation for 'fun Annie_LoadPost()' & 'fun Annie_QueryPostsByTag()'
	var loadAnimation = '<div class = "transition"><div class = "three-bounce1"> </div> <div class = "three-bounce2"> </div> <div class = "three-bounce3"> </div> </div> ';

	/**
	 * Preloader for html page. If the background image of header is loaded, it will remove the mask layer immediately, or else after 10 seconds at most!
	 *
	 * @method   Annie_Preloader
	 */
	var Annie_Preloader = function() {
		var mode = $('header').attr('data-img-mode'),
			curImgSrc = ' ',
			randomMax = $('header').attr('data-random-max'),
			randomNum = 0;

		if($(postPageId).length && $(postCoverId).length) {
			mode = 'post';
		}

		switch(mode) {
			case 'random':
				{
					var imgList = new Array("https://ae01.alicdn.com/kf/Hdee5739fbd244817b9bbad1560b006dcr.jpg", "https://ae01.alicdn.com/kf/H1e0ec59915a2487185605a44ee5281459.jpg", "https://ae01.alicdn.com/kf/Hd1e694ce46bb4b6085c316b6c2aacf1bJ.jpg", "https://ae01.alicdn.com/kf/He3fcb2352b3b4d07a3d15fa28ded1b5dQ.jpg", "https://ae01.alicdn.com/kf/H89aa7175381745bfa98d13dfb2c927b3p.jpg", "https://ae01.alicdn.com/kf/H2d738f0821ac498c93dd1dc39b0a018bD.jpg", "https://ae01.alicdn.com/kf/H34fab529da9d468bafb88b04fe7bcd618.jpg", "https://ae01.alicdn.com/kf/Hc7132045364a41109d0c5bc718ac5203r.jpg", "https://ae01.alicdn.com/kf/H061c8aa26c6e4b3e83e0b9b1aa29ea5eI.jpg", "https://ae01.alicdn.com/kf/Hdb0c2dae2bd3409cb7b8b6a72e70a721f.jpg", "https://ae01.alicdn.com/kf/H424cec5d7fe143baa40c37843ae5de2aI.jpg", "https://ae01.alicdn.com/kf/H019e114d64ea497c8f4cece704dd41aeW.jpg", "https://ae01.alicdn.com/kf/Hdafe57b3691f4660a2e24305e1681b3ec.jpg", "https://ae01.alicdn.com/kf/H2ccb3e08419d4b22988c4dd587028496D.jpg", "https://ae01.alicdn.com/kf/Hf81534aaacd24cb184519237c8006e27x.jpg", "https://ae01.alicdn.com/kf/Hfcbf1664e33c456fb4e869265a0f1e3c4.jpg", "https://ae01.alicdn.com/kf/He2e4a511fd9f4735a154e1d09efd816f3.jpg", "https://ae01.alicdn.com/kf/Hbb811d5cd1884b67aab3a806f5419236c.jpg", "https://ae01.alicdn.com/kf/Hb7291929c99d45e2b081e836ba13fe21K.jpg", "https://ae01.alicdn.com/kf/H391cbc388fcb4a63b787d3ddb47985b0e.jpg", "https://ae01.alicdn.com/kf/H11ed375698984fadb8424a7461dd69d2Q.jpg", "https://ae01.alicdn.com/kf/H14534d26c404409e9000a5b569a2734fG.jpg", "https://ae01.alicdn.com/kf/H7ea3c59116aa4f5b8e7ce16f28e49863w.jpg", "https://ae01.alicdn.com/kf/Hd1e694ce46bb4b6085c316b6c2aacf1bJ.jpg", "https://ae01.alicdn.com/kf/He079ec139178494cb92d435d0326993e9.jpg", "https://ae01.alicdn.com/kf/H848d963c55da4008bed77dc130ba9279m.jpg", "https://ae01.alicdn.com/kf/He774ee3c947047aeac4c7b657793a573t.jpg", "https://ae01.alicdn.com/kf/Hb5465ca9cb964f91853464d72d3e38d8U.jpg", "https://ae01.alicdn.com/kf/Hee2285376dbd4f5781548b03b609b469E.jpg", "https://ae01.alicdn.com/kf/Hbf392bc8c780494e862f5ee6fcc6950ab.jpg", "https://ae01.alicdn.com/kf/H983eac629a264382a6ab7b74c701a848W.png", "https://ae01.alicdn.com/kf/Hed97afd01b87404b9d38f1737577c583R.jpg", "https://ae01.alicdn.com/kf/Hfd6112408288477789783d48a8979b8ck.jpg", "https://ae01.alicdn.com/kf/H17bfcc4ba6a74089a42e3a87c3ce8385U.jpg", "https://ae01.alicdn.com/kf/Ha530ee1b55d345a2b136233ddfdb607er.jpg", "https://ae01.alicdn.com/kf/H0a9a63526a2d4f218e75919e540415589.jpg", "https://ae01.alicdn.com/kf/H15e28d9c9c3c469a8fc6315cc9793bceb.jpg", "https://ae01.alicdn.com/kf/H0df2baed7f7a4e9f86d0203eb3d4ddc95.jpg", "https://ae01.alicdn.com/kf/H6db2a0a2adb644038f184ec27b8c1000W.jpg", "https://ae01.alicdn.com/kf/Hb85c1130ef6749628e555e021d605e1dZ.jpg", "https://ae01.alicdn.com/kf/Hf4ce3a20e14546e287547e99daa0a10c4.jpg", "https://ae01.alicdn.com/kf/H6425f0f865604d0f9ccff1f12be27d21f.jpg", "https://ae01.alicdn.com/kf/He1e0dab9006942daa273b31702532eb83.jpg", "https://ae01.alicdn.com/kf/Hc9b95795b3d249a2b903dc87ea1e49c9z.jpg", "https://ae01.alicdn.com/kf/H93948e38e0e84080be40f43491119754M.jpg", "https://ae01.alicdn.com/kf/H9b319f4cfe49479b8e79b58027f65bccV.jpg", "https://ae01.alicdn.com/kf/H239b240023e449ac9572b9ef4bb0682cn.jpg", "https://ae01.alicdn.com/kf/H12c4d5dbdd1b47e099e76ea8d8c51763F.jpg", "https://ae01.alicdn.com/kf/Hb1a79aab85194511926a967c86e083c0P.jpg", "https://ae01.alicdn.com/kf/H1b21a7b4143e47a79b7c28fad9c421f4D.jpg");
					randomNum = Math.floor(Math.random() * 50);
					curImgSrc = imgList[randomNum]
					// 原主题默认随机模式选取封面图片代码
					// randomNum = Math.floor(Math.random() * (randomMax - 1) + 1);
					// curImgSrc = $('header').attr('data-random-src') + randomNum + '.jpg';
				}
				break;
			case 'normal':
				{
					curImgSrc = $('header').attr('data-normal-src');
				}
				break;
			case 'post':
				{
					curImgSrc = $(postCoverId).attr('data-scr');
				}
				break;
			default:
				{
					//TODO: Maybe, it loads slowly!
					curImgSrc = 'https://source.unsplash.com/collection/954550/1920x1080';
				}
				break;
		}

		/**
		 * Html page scroll down to the height for header!
		 *
		 * @method   Annie_Scroll
		 */
		function Annie_Scroll() {
			$('html, body').delay(delayTimeG * 2).animate({
				scrollTop: headerH + 2
			}, delayTimeG * 3);
		}

		/**
		 * Set & then remove the mask layer for html page!
		 *
		 * @method   Annie_Transition
		 */
		function Annie_Transition() {
			$('#status').fadeOut();
			$('#preloader').delay(delayTimeG).fadeOut('slow');
			$('body').delay(delayTimeG);
			
			// delayTime = delayTimeG = 500, make the html page can be scrolled.
			setTimeout(function() {
				$('html').removeClass('html-loading');
			}, delayTimeG);
		}

		/**
		 * 背景图片加载完成后，设置header的背景
		 *
		 * @method   Annie_SetBg
		 * @param    {[type]}    imgSrc [description]
		 */
		function Annie_SetBg(imgSrc) {
			var backgroundImg = 'url(' + imgSrc + ')';
			$('header').css('background-image', backgroundImg);

			Annie_Transition();

			if($(postPageId).length) {
				Annie_Scroll()
			}
		}

		/**
		 * header背景图片主色提取，根据主色设置导航菜单项、motto的颜色（黑或白)。
		 * PLUGIN：plugin/vibrant/vibrant.js
		 * WARNING：背景主色提取可能影响页面加载速度 or 引起CROS bug！
		 * TODO：重构header模块
		 *
		 * @method   Annie_ColorExtraction
		 * @param    {[type]}              img [description]
		 */
		function Annie_ColorExtraction(img) {
			var vibrant = new Vibrant(img),
				swatches = vibrant.swatches(),
				mainColor = '',
				mainRgb = [],
				mainVibrant = swatches['Vibrant'];
			if(mainVibrant) {
				mainColor = mainVibrant.getBodyTextColor();
				mainRgb = mainVibrant.getRgb();
			}

			var fontColor = ' ', //mainColor
				grayLevel = mainRgb[0] * 0.299 + mainRgb[1] * 0.587 + mainRgb[2] * 0.114;
			if(grayLevel >= 192) {
				// 若为浅色，把文字设置为黑色
				fontColor = '#000';
			} else {
				// 若为深色，把文字设置为白色
				fontColor = '#fff';
			}

			// set motto color
			$('.motto, #read-more').css({
				'color': fontColor || mainColor
			});

			// set header nav color
			$(headerAId).css({
				'color': fontColor || mainColor
			});

			$(headerAId).each(function() {
				$(this).hover(
					function() {
						$(this).css({
							'color': 'darkgoldenrod'
						});
					},
					function() {
						$(this).css({
							'color': fontColor || mainColor
						});
					}

				)
			});
		}

		/**
		 * 根据背景图片的加载状况，调用不同的方法
		 * TODO：We can use "https://github.com/desandro/imagesloaded plugin" to check img.load status!
		 */
		var img = new Image(),
			stop = setTimeout(function() {
				function timeoutCalled() {
					console.log('timeout');
					Annie_Transition();
					Annie_Scroll();
				}
				return timeoutCalled();
			}, delayTimeG * 10); // delayTime = delayTimeG * 20 = 10s

		img.crossOrigin = "Anonymous"; // TODO: CROS bug!
		img.src = curImgSrc;

		img.onerror = function() {
			if(stop) {
				clearTimeout(stop);
			}

			Annie_Transition();
			Annie_Scroll();
			console.log("Header background imgSrc:" + img.src);
			console.log('Failed to load & set background img for header!');
		}

		img.onload = function() {
			if(stop) {
				clearTimeout(stop);
			}

			Annie_SetBg(img.src);

			Annie_ColorExtraction(img);
		}
		//The following code may have a bug when using img.src 'https://source.unsplash.com/collection/954550/1920x1080' in Fixfox...( because of cache)!
		//		if( img.complete || img.height ){
		//			if ( stop ) {
		//				clearTimeout( stop );
		//			}			
		//			Annie_SetBg( img.src );	
		//		} else {
		//			img.onload = function() {
		//				if ( stop ) {
		//					clearTimeout( stop );
		//				}				
		//				Annie_SetBg( img.src );
		//			}				
		//		}
	};

	/**
	 * Nav set for theme.
	 *
	 * @method   Annie_Nav
	 */
	var Annie_Nav = function() {
		//open navigation
		$('.nav-trigger').on('click', function(event) {
			event.preventDefault();
			toggleNav(true);
			$('body').addClass('body-fixed');
		});

		//close navigation
		$('.nav-close').on('click', function(event) {
			event.preventDefault();
			toggleNav(false);
			$('body').removeClass('body-fixed');
		});

		function toggleNav(bool) {
			$('.nav-container').toggleClass('is-visible', bool);
		}

		function currentNavStatus() {
			//some operation
			var urlStr = location.href,
				urlSta = false,
				homePage = paginationContainer;

			$('#navigation-show a').each(function() {
				var currentUrl = $(this).attr('class');
				currentUrl = currentUrl.substr(10);

				if(urlStr.indexOf(currentUrl) > -1 && $(this).attr('href') != '') {
					$(this).addClass('active');
					urlSta = true;
				} else {
					$(this).removeClass('active');
				}
			});

			if(!urlSta && ($(homePage).length)) {
				$("#navigation-show a").eq(0).addClass('active');
			}
		}

		currentNavStatus();
	};

	/**
	 * Progress for page & post.
	 *
	 * @method   Annie_Progress
	 */
	var Annie_Progress = function() {
		var navBarId = "#navigation-hide",
			navBarHeight = $(navBarId).outerHeight();

		var postTitleH = $(".article-title").outerHeight(),
			postMetaH = $(".article-meta").outerHeight();

		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop(),
				docHeight = $(document).height(),
				windowHeight = $(window).height(),
				scrollPercent = 0;

			if($(postPageId).length) {
				// 80 = div.layout-post的padding-top
				scrollPercent = ((scrollTop - headerH) / (postContentH + postTitleH + postMetaH + 80 - windowHeight)) * 100;
			} else {
				scrollPercent = (scrollTop / (docHeight - windowHeight)) * 100;
			}

			scrollPercent = scrollPercent.toFixed(1);

			if(scrollPercent > 100 || scrollPercent < 0) {
				scrollPercent = 100;
			}

			$('#progress-percentage h1').text(scrollPercent + "%");

			$("#progress-bar").attr("style", "width: " + (scrollPercent) + "%; display: block;");

			if(scrollTop >= ((scrollLimitG > headerH) ? scrollLimitG : headerH)) {
				$(navBarId).css({
					top: '0'
				}).show();
				$('.nav-trigger').show();
			} else {
				$(navBarId).css({
					top: '-' + navBarHeight + 'px'
				}).hide();
				$('.nav-trigger').hide();
			}

			//Current post or page title
			if(scrollTop >= headerH + 300) {
				$('#navigation-hide p').show();
			} else {
				$('#navigation-hide p').hide();
			}
		}).trigger('scroll');
	};

	/**
	 * Toc for post.
	 *
	 * @method   Annie_Toc
	 */
	var Annie_Toc = function() {
		var scrollSpeed = scrollSpeedG,
			upperLimit1 = headerH,
			upperLimit2 = mainH - investmentContainerH;
		var tocSwitchButton = ".switch-button";

		function fixedAndShowTocId() {
			$(window).scroll(function() {
				var scrollTop = $(document).scrollTop();

				if((scrollTop >= upperLimit1) && (scrollTop < upperLimit2)) {
					//屏幕宽度<=1024px时应隐藏
					$(postTocId).css('position', 'fixed').show().fadeIn(delayTimeG);

				} else {
					$(postTocId).hide().fadeOut(delayTimeG);
				}
			});
		}

		function generateToclist() {
			var katelogIns = new katelog({
				contentEl: 'article-content',
				catelogEl: 'catelog-list',
				linkClass: 'k-catelog-link',
				linkActiveClass: 'k-catelog-link-active',
				selector: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
				supplyTop: 20,
				active: function(el) {}
			});
			//TODO: 添加目录标题、层级标题
			//var tocTitle = $( postTocId ).attr('data-title'), htmlText = '<h2>' + tocTitle + '</h2>';	
		}

		function adjustTocContainer() {
			var clickCount = 1;

			$(tocSwitchButton).on("click", function() {

				$(this).toggleClass("toc-switch-button-active");

				if(clickCount == 1) {
					$('main').toggleClass("inline-flex");
					$('#layout-toc').toggleClass("show").fadeToggle();
					clickCount = 2;
				} else {
					$('#layout-toc').toggleClass("show").fadeToggle();
					setTimeout(function() {
						$('main').toggleClass("inline-flex");
					}, delayTimeG / 2); //delayTimeG = 500ms
					clickCount = 1;
				}
			});
		}

		if($(postPageId).length) {
			fixedAndShowTocId();
		}

		if($(postTocId).length) {
			generateToclist();
		}

		if($(postPageId).length && $(postTocId).length) {
			$(tocSwitchButton).show();

			adjustTocContainer();
		} else {
			$(tocSwitchButton).hide();
		}
	};

	/**
	 * Anchor for toTop and readMore.
	 *
	 * @method   Annie_ToAnchor
	 */
	var Annie_ToAnchor = function() {
		var scrollSpeed = scrollSpeedG,
			upperLimit = scrollLimitG,
			toTop = $('#totop'),
			readMore = $('#read-more');

		toTop.hide();

		$(window).scroll(function() {
			var scrollTop = $(document).scrollTop();

			if(scrollTop > upperLimit) {
				$(toTop).stop().fadeTo(delayTimeG, 1);
			} else {
				$(toTop).stop().fadeTo(delayTimeG, 0);
			}
		});

		$(toTop).click(function() {
			$('html, body').animate({
				scrollTop: 0
			}, scrollSpeed);
			return false;
		});

		$(readMore).click(function() {
			$('html, body').animate({
				scrollTop: $('main').offset().top + 2
			}, scrollSpeed);
			return false;
		});
	};

	/**
	 * Archive by year.
	 *
	 * @method   Annie_Archive
	 */
	var Annie_Archive = function() {
		if(window.location.pathname.indexOf("archive") == -1) {
			return;
		}
		var currentYear = "",
			Newy = "";
		$("#layout-archive-year  ul li").each(function(i) {
			var year = $(this).find("em").attr("year");
			if(year < currentYear || currentYear == "") {
				currentYear = year;
				if(Newy == "") {
					Newy = year
				}
				$(this).before("<h3 class='" + currentYear + "'>" + currentYear + "<em>(" + $("[year='" + currentYear + "']").length + "篇)</em></h3>");
			}
			$(this).attr("year", currentYear);
		});

		$("#layout-archive-year h3").each(function() {
			$("#layout-archive-year ul li[year='" + $(this).attr("class") + "'").wrapAll("<div year='" + $(this).attr("class") + "'></div>");
			$("h3." + $(this).attr("class")).click(function() {
				$(this).toggleClass("title-bg").next().slideToggle(300);

			})
		});
		$("#layout-archive-year ul div[year!='" + Newy + "']").hide();
		$("h3." + Newy).addClass("title-bg");
		//TODO: Archive by month
	};

	/**
	 * InfiniteLoading to load more posts for index page！
	 *
	 * @method   Annie_LoadPost
	 */
	var Annie_LoadPost = function() {
		$('body').on('click', paginationId, function() {
			$(paginationId).text(" ").append(loadAnimation);

			$.ajax({
				type: "get",
				url: $(this).attr("href"),
				async: true,
				timeout: delayTimeG * 20, //10s
				error: function(request) {
					//TODO: error				
				},
				success: function(data) {
					var result = $(data).find("#post"),
						newhref = $(data).find(paginationId).attr("href");

					$(paginationContainer).append(result.fadeIn(delayTimeG).addClass('annie-animation-zoom'));

					$(paginationId).empty().text($(paginationId).attr('data-title'));

					if(newhref != undefined) {
						$(paginationId).attr("href", newhref);
					} else {
						$("#pagination").html("<span>" + $(paginationId).attr('data-status') + "</span>");
					}
				},
				complete: function() {
					// TODO
				}
			});

			return false;
		});
	};

	/**
	 * Tab to switch 'relate' or 'comment' module
	 *
	 * @method   Annie_Tab
	 */
	var Annie_Tab = function() {
		function tabs(tabTit, on, tabCon) {
			$(tabCon).each(function() {
				$(this).children().eq(0).show();
			});

			$(tabTit).each(function() {
				$(this).children().eq(0).addClass(on);
			});

			$(tabTit).children().click(function() {
				$(this).addClass(on).siblings().removeClass(on);
				var index = $(tabTit).children().index(this);
				$(tabCon).children().eq(index).show().siblings().hide();
			});
		}
		tabs(".investment-title-1", "on", ".investment-content");
	};

	/**
	 * Query the posts which have specified tag or category!
	 * TODO: We can use "Content filtering plugin" to instead this function!
	 *
	 * @method   Annie_QueryPostsByTag
	 */
	var Annie_QueryPostsByTag = function() {
		$('.tags a, .category a').click(function() {
			$("#TCP-title").text("查询结果");
			//添加查询结果之前，清除容器中的内容
			$("#TCP-content").text("").append(loadAnimation);
			var href = $(this).attr("href");
			if(href != undefined) {
				$.ajax({
					url: href,
					type: "get",
					async: true,
					error: function(request) {
						//TODO: erro
					},
					success: function(data) {
						$("#TCP-content").empty();

						var result = $(data).find(".layout-archive");
						$('#TCP-content').append(result.fadeIn(delayTimeG).addClass('annie-animation-zoom'));
						$(".layout-archive").css({
							'paddingTop': '0'
						});
						$(".layout-archive i").css({
							'marginTop': '5px',
							'marginBottom': '30px'
						});
					},
					complete: function() {
						// TODO
					}
				});
			}
			return false;
		});
	};

	/**
	 * PLUGIN: plugin/chinese/chinese.js
	 *
	 * @method   Annie_LanguageSet
	 */
	var Annie_LanguageSet = function() {
		zh_init();
	};

	/**
	 * PLUGIN: plugin/imgLazyLoader/yall.min.js
	 *
	 * @method   Annie_ImageLazyLoad
	 */
	var Annie_ImageLazyLoad = function() {
		yall({
			observeChanges: true
		});
	};

	/**
	 * Resize image to parent.
	 * PLUGIN: plugin/imgResize/jquery.resizeimagetoparent.min.js
	 * 
	 * @method   Annie_ImageResize
	 */
	var Annie_ImageResize = function() {		
		$('.post-cover img, .relate-post-cover img').resizeToParent({
			parent: '.post-cover, .relate-post-cover'
		});
	};

	/**
	 * Adjust the browser scroll bar for 'html body', 'code bloack'.
	 * PLUGIN: plugin/nicescroll/jquery.nicescroll.js
	 *
	 * @method   Annie_NiceScroll
	 */
	var Annie_NiceScroll = function() {
		var niceScrollId = 'body, .highlight',
			niceScrollSetting = $(niceScrollId).niceScroll({
					cursorborder: "none",					
					autohidemode: true
			});	
			
		// PLUGIN: js/resizediv.js
		$(niceScrollId).resize(function(event) {
			setTimeout(function() {
				niceScrollSetting.resize();
			}, 2);	
		});		
	};

	/**
	 * Other js functions. An function example might be as follows:
	 */
	/*  
		var Annie_XXX = function(argument) {
			// body...
		};
	*/

	/* Initialize */
	(function Annie_Init() {
		Annie_Preloader();
		Annie_Nav();
		Annie_Progress();
		Annie_Toc();
		Annie_ToAnchor();
		Annie_Archive();
		Annie_LoadPost();
		Annie_Tab();
		Annie_QueryPostsByTag();
		Annie_LanguageSet();
		Annie_ImageLazyLoad();
		Annie_ImageResize();
		Annie_NiceScroll();
	})();
});