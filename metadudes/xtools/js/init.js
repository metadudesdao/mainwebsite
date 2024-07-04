
/*
 * Copyright (c) 2022 Frenify
 * Author: Frenify
 * This file is made for CURRENT TEMPLATE
*/


// filter array
var MetaPortalFilterArray		= [];
var MetaPortalFilterCondition	= 'and';


(function($){
  "use strict";
	
	var FrenifyPreloader 	= false;
  	var FrenifyTime 		= new Date();
	var FrenifyCounter		= 0;
  
	var FrenifyMetaPortal = {
		
		init: function(){
			FrenifyMetaPortal.ready();
			FrenifyMetaPortal.menuCenter();
			FrenifyMetaPortal.imgToSVG();
			FrenifyMetaPortal.BgImg();
			FrenifyMetaPortal.totopFixer();
			FrenifyMetaPortal.slider();
			FrenifyMetaPortal.headerFixer();
			FrenifyMetaPortal.fn_cs_counter();
			FrenifyMetaPortal.video();
			FrenifyMetaPortal.collection();
			FrenifyMetaPortal.contactForm();
			FrenifyMetaPortal.totopScroll();
			FrenifyMetaPortal.seachSomething();
			FrenifyMetaPortal.walletAndLeftNavOpener();
			FrenifyMetaPortal.resizeWalletAndLeftNav();
			FrenifyMetaPortal.headerAnchor();
			FrenifyMetaPortal.isotope();
			FrenifyMetaPortal.qnt();
			FrenifyMetaPortal.countdown();
			FrenifyMetaPortal.hold();
			FrenifyMetaPortal.filterItems();
			FrenifyMetaPortal.applyFilter();
			FrenifyMetaPortal.navSubMenu();
			FrenifyMetaPortal.roadmapSwiper();
			FrenifyMetaPortal.floww();
			FrenifyMetaPortal.accordion();
			FrenifyMetaPortal.hero4Swiper();
			FrenifyMetaPortal.rippleEffect();
			FrenifyMetaPortal.fullSlider();
		},
			
		
		/* since v4.0 */
		fullSlider: function(){
			var section		= $('.fn_cs_full_slider .swiper-container');
			section.each(function(){
				var element				= $(this);
				var transform 			= 'Y';
				var direction 			= 'horizontal';
				var	interleaveOffset 	= 0.5;
				if(direction === 'horizontal'){
					transform 			= 'X';
				}
				var rate				= 1;
				if($('body').hasClass('rtl')){
					rate = -1;
				}
				// Main Slider
				var mainSliderOptions 	= {
					loop: true,
					speed: 1500,
					autoplay:{
						delay: 5000,
						disableOnInteraction: false,
					},
					navigation: {
						nextEl: element.closest('.fn_cs_full_slider').find('.next'),
						prevEl: element.closest('.fn_cs_full_slider').find('.prev'),
					},
					slidesPerView: 1,
					direction: direction,
					loopAdditionalSlides: 10,
					watchSlidesProgress: true,
					on: {
						init: function(){
							this.autoplay.stop();
						},
						imagesReady: function(){
							this.autoplay.start();
						},
						progress: function(){
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								var slideProgress 	= swiper.slides[i].progress,
								innerOffset 		= swiper.width * interleaveOffset,
								innerTranslate 		= slideProgress * innerOffset * rate;
								$(swiper.slides[i]).find(".abs_img").css({transform: "translate"+transform+"(" + innerTranslate + "px)"});
							}
						},
						touchStart: function() {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = "";
							}
						},
						setTransition: function(speed) {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = speed + "ms";
								swiper.slides[i].querySelector(".abs_img").style.transition =
								speed + "ms";
							}
						}
					}
				};
				new Swiper(element, mainSliderOptions);
			});	
		},
		
		/* since v4.0 */
		rippleEffect: function(){
			if($('#ripple').length){
				$('#ripple').ripples({
					resolution: 500,
					dropRadius: 20,
					perturbance: 0.04
				});
			}	
		},
		
		/* since v4.0 */
		hero4Swiper: function(){
			// slider
			var section		= $('.fn_cs_hero_slider .swiper-container');
			section.each(function(){
				var element				= $(this);
				// Main Slider
				var mainSliderOptions 	= {
					loop: true,
					speed: 1000,
					autoplay:{
						delay: 3000,
						disableOnInteraction: false,
					},
					slidesPerView: 'auto',
					spaceBetween: 50,
					direction: 'horizontal',
					loopAdditionalSlides: 10,
					watchSlidesProgress: true,
				};
				var mySwiper = new Swiper(element, mainSliderOptions);
			});	
		},
		
		/* since v4.0 */
		accordion: function(){
			$('.fn_cs_accordion').each(function(){
				var e = $(this);
				e.find('.active').each(function(){
					$(this).find('.acc_content').slideDown(300);
				});
				e.find('.acc_header').off().on('click',function(){
					var header 	= $(this);
					var item	= header.closest('.acc_item');
					if(item.hasClass('active')){
						item.removeClass('active').find('.acc_content').slideUp(300);
					}else{
						item.siblings('.active').removeClass('active').find('.acc_content').slideUp(300);
						item.addClass('active').find('.acc_content').slideDown(300);
					}
					return false;
				});
			});
		},
		
		/* since v4.0 */
		floww: function(){
			FrenifyMetaPortal.BgImg();
			$('.frenify_cards_gallery').each(function(){
				var element 		= $(this),
					ul				= element.find('ul'),
					children		= ul.children('li'),
					length			= children.length;

				// stop function
				if(length<5){return false;}

				// build gallery slider
				FrenifyMetaPortal.floww_change_slide(1,element);

				// item click function
				children.on('click',function(){
					var el 			= $(this);
					var index		= el.index() + 1;
					FrenifyMetaPortal.floww_change_slide(index,element);
				});
				FrenifyMetaPortal.floww_start_autoplay(ul,element);
			});
		},

		/* since v4.0 */
		floww_start_autoplay: function(ul,element){
			var timeout 		= 5000;
			var time 			= null;
			clearInterval(time);
			time = setInterval(function(){
				var index 		= ul.find('.current').index() + 2;
				FrenifyMetaPortal.floww_change_slide(index,element);
			}, timeout);
		},
		
		/* since v4.0 */
		floww_change_slide: function(index, element){
			var ul 				= element.find('ul'),
				children 		= ul.children('li'),
				length			= children.length;
				index			= (index + length) % length;
			var el 				= children.eq(index-1);

			if(!el.hasClass('current')){
				children.removeClass('current next1 next2 prev1 prev2 next3 prev3');
				el.addClass('current');
				var next1_index = (index + 1) % length;
				var next2_index = (index + 2) % length;
				var next3_index = (index + 3) % length;
				var prev1_index = (index - 1 + length) % length;
				var prev2_index = (index - 2 + length) % length;
				var prev3_index = (index - 3 + length) % length;
				children.eq(next1_index-1).addClass('next1');
				children.eq(next2_index-1).addClass('next2');
				children.eq(prev1_index-1).addClass('prev1');
				children.eq(prev2_index-1).addClass('prev2');
				if(length > 6){
					children.eq(next3_index-1).addClass('next3');
					children.eq(prev3_index-1).addClass('prev3');
				}
				FrenifyMetaPortal.floww_calc_call(element);
			}
		},

		/* since v4.0 */
		flow_calc: function(element){
			var w 				= element.width(),
				initial_width 	= element.data('initial-width'),
				ratio 			= element.data('ratio'),
				padding			= 20;
			padding *= 2;
			var width 			= ((w-padding)/2 > initial_width) ? initial_width : (w-padding) / 2,
				height			= width*ratio + padding,
				ul				= element.find('ul'),
				children		= ul.children('li');

			ul.height(height + 'px');
			children.find('.img_holder img').css({width: width + 'px', height: height - padding + 'px'});
			children.css({width: width + 'px', height: (height) + 'px'});
			var current_left	= w/2 - width/2,
				next1_left		= current_left + width / 2.5,
				next2_left		= next1_left + width / 2.5,
				next3_left		= next2_left + width / 2.5,
				prev1_left		= current_left - width / 2.5,
				prev2_left		= prev1_left - width / 2.5,
				prev3_left		= prev1_left - width / 2.5;
			children.css({left: '50%',transform: 'scale(0)'});
			ul.find('.current').css({left: current_left + 'px',top: 0,transform: 'scale(1) translateZ(0) rotate(0)'});
			ul.find('.next1').css({left: next1_left + 'px',top: '90px',transform: 'scale(1) translateZ(0) rotate(15deg)'});
			ul.find('.next2').css({left: next2_left + 'px',top: '240px',transform: 'scale(1) translateZ(0) rotate(30deg)'});
			ul.find('.prev1').css({left: prev1_left + 'px',top: '90px',transform: 'scale(1) translateZ(0) rotate(-15deg)'});
			ul.find('.prev2').css({left: prev2_left + 'px',top: '240px',transform: 'scale(1) translateZ(0) rotate(-30deg)'});
			
			if(children.length > 6){
				ul.find('.prev3').css({left: prev3_left + 'px',top: '360px',transform: 'scale(1) translateZ(0) rotate(-45deg)'});
				ul.find('.next3').css({left: next3_left + 'px',top: '360px',transform: 'scale(1) translateZ(0) rotate(45deg)'});
			}
		},

		/* since v4.0 */
		floww_calc_call: function(element){
			if(typeof element === 'undefined'){
				$('.frenify_cards_gallery').each(function(){
					element = $(this);
					FrenifyMetaPortal.flow_calc(element);
				});
			}else{
				FrenifyMetaPortal.flow_calc(element);
			}
		},
		
		/* since v3.0 */
		roadmapSwiper: function(){
			// slider
			var section		= $('.fn_cs_roadmap .swiper-container');
			section.each(function(){
				var element				= $(this);
				// Main Slider
				var mainSliderOptions 	= {
					loop: false,
					speed: 1500,
					autoplay:{
						delay: 5000,
						disableOnInteraction: false,
					},
					slidesPerView: 4,
					spaceBetween: 40,
					direction: 'horizontal',
					loopAdditionalSlides: 10,
					watchSlidesProgress: true,
					breakpoints: {
						768: {
							slidesPerView: 1
						},
						1040: {
							slidesPerView: 2
						},
						1200: {
							slidesPerView: 3
						},
						1400: {
							slidesPerView: 4
						}
					}
				};
				var mySwiper = new Swiper(element, mainSliderOptions);
				var slidersCount = mySwiper.params.loop ? mySwiper.slides.length - 2 : mySwiper.slides.length;
				var widthParts = 100 / slidersCount;
				
				var step = element.closest('.fn_cs_roadmap').find('.step_in');
				
				FrenifyMetaPortal.roadmapStep(mySwiper,step,widthParts);
				
				mySwiper.on('slideChange', function () {
					FrenifyMetaPortal.roadmapStep(this,step,widthParts);
				});
			});	
		},
		
		roadmapStep: function(mySwiper,step,widthParts){
			var breakpoint = parseInt(mySwiper.currentBreakpoint);
			var viewBox;
			switch(breakpoint){
				case 1400: viewBox = 4; break;
				case 1200: viewBox = 3; break;
				case 1040: viewBox = 4; break;
				case 768: viewBox = 1; break;
				default: viewBox = 4;
			}

			step.css({width: (mySwiper.activeIndex+viewBox)*widthParts + '%'});
		},
		
		translateVal: function(el) {
			var progress = el.style.transform.match(/translate3d\((.+)px,(.+)px,(.+)px\)/);
			return progress[1];
		},
		
		menuCenter: function(){
			var left 		= $('.header .trigger_logo');
			var right 		= $('.header .wallet');
			var nav 		= $('.header .nav');
			var leftWidth 	= 0;
			var rightWidth 	= 0;
			if(left.length){
				leftWidth 	= parseInt(left.width());
			}
			if(right.length){
				rightWidth 	= parseInt(right.width());
			}
			
			if(leftWidth < rightWidth){
				nav.css({paddingLeft: ((rightWidth - leftWidth)) + 'px'});
			}else{
				nav.css({paddingRight: ((leftWidth - rightWidth)) + 'px'});
			}
			nav.css({opacity: 1});
			
		},
		
		navSubMenu: function(){
			$('.metaportal_fn_leftnav .nav_holder a').off().on('click',function(){
				var e = $(this);
				var s = e.siblings('.sub-menu');
				var svg = $('.metaportal_fn_leftnav .nav_holder .icon').html();
				if(s.length){
					e.parent().siblings().children('a').removeClass('active');
					e.addClass('active');
					FrenifyCounter++;
					if(!s.find('>li>.prev').length){
						s.prepend('<li><a href="#" class="prev"><span class="creative_link">'+svg+e.text()+'</span></a></li>');
					}
					$('.metaportal_fn_leftnav .nav_holder > ul').css({transform: 'translateX(-'+(100*FrenifyCounter)+'%)'});
					FrenifyMetaPortal.previousItems();
					return false;
				}
			});
		},
		
		previousItems: function(){
			$('.metaportal_fn_leftnav .nav_holder .prev').off().on('click',function(){
				FrenifyCounter--;
				$('.metaportal_fn_leftnav .nav_holder > ul').css({transform: 'translateX(-'+(100*FrenifyCounter)+'%)'});
				return false;
			});	
		},
		
		isotopeCollection: function(){
			$('.grid').isotope({
				itemSelector: 'li', // .element-item
				layoutMode: 'fitRows'
			});
		},
		
		
		applyFilter: function(){
			
			// initialization isotope function to our items
			FrenifyMetaPortal.isotopeCollection();
			
			// left filter on click function
			$('.metaportal_fn_filters .checkbox').off().on('click',function(){
				
					// our clicked filter
				var element 	= $(this),
					
					// collection wrapper
					parent		= element.closest('.metaportal_fn_collection'),
					
					// filter result box
					resultBox	= parent.find('.metaportal_fn_result_box'),
					
					// detect selected filter ID
					id 			= element.data('id'),
					
					// get category name
					category 	= element.data('category'),
					
					// get filter name
					filterName	= element.find('.text').text(),
					
					// filter counter wrapper
					filterCount = resultBox.find('.filter_count span');
				
				// if clicked item has clicked first time
				if(!element.hasClass('selected')){
					
					// attach 'selected' class to our filter
					element.addClass('selected');
					
					// add 'clear all' button to our result box if there was no any filters early
					if(resultBox.find('.result_item').length === 0){
						resultBox.append('<a href="#" class="clear_all">Clear All</a><a href="#" class="condition_trigger" data-and-text="'+resultBox.data('and-text')+'" data-or-text="'+resultBox.data('or-text')+'"><span class="text">'+resultBox.data('and-text')+'</span><span class="icon"></span></a>');
					}
					
					// find our 'clear all' button and add our new filter before the button
					resultBox.find('.clear_all').before('<div class="result_item" data-id="'+id+'"><a href="#" title="Remove Filter">' + category + ': '+'<span>' + filterName + '</span>' + '<img src="svg/cancel.svg" alt="" class="fn__svg"></a></div>');
					
					// change selected filter checkbox value into 'checked'
					element.find('input[type="checkbox"]').prop('checked','checked');
					
					// increase filter count and insert into our counter wrapper
					filterCount.text(parseInt(filterCount.text())+1);
					
					// add new filter id into our filters array in order to apply isotope filter for items next
					MetaPortalFilterArray.push(id);
					
					// recall image to svg functions, because we have added new button where has an svg icon
					FrenifyMetaPortal.imgToSVG();
					
					// recall remove filter function, because we have added new filter
					FrenifyMetaPortal.removeFilter();
				}
				// if clicked item has already clicked and clicked second time
				else{
					
					// remove attached 'selected' class
					element.removeClass('selected');
					
					// remove this filter from result box
					parent.find('.result_item[data-id="'+id+'"]').remove();
					
					// remove 'clear all' button if removed filter was the only one (alone)
					if(resultBox.find('.result_item').length === 0){
						resultBox.find('.clear_all').remove();
						resultBox.find('.condition_trigger').remove();
						MetaPortalFilterCondition = 'and';
					}
					
					// change selected filter checkbox value into 'not checked'
					element.find('input[type="checkbox"]').prop('checked','');
					
					// decrease filter count and insert into our counter wrapper
					filterCount.text(parseInt(filterCount.text())-1);
					
					// remove new filter ID from our filters array in order to apply isotope filter for items next
					var index = MetaPortalFilterArray.indexOf(id);
					if(index !== -1){
						MetaPortalFilterArray.splice(index, 1);
					}
				}
				
				
				FrenifyMetaPortal.recallGridAfterFiltering();
				
				return false;
			});
			
			// call remove filter function
			FrenifyMetaPortal.removeFilter();
		},
		
		recallGridAfterFiltering: function(clear){
			var $grid = $('.grid').isotope({
				itemSelector: 'li', // .element-item
				layoutMode: 'fitRows'
			});
			if(clear === 'clear'){
				$grid.isotope({ filter: '*' });
				MetaPortalFilterArray = [];
				MetaPortalFilterCondition = 'and';
				return false;
			}
			
			// selected filters
			var filters = '';

			// if there is no any selected filters
			if(MetaPortalFilterArray.length === 0){
				filters = '*';
			}
			// if there has one or more selected filters
			else{
				if(MetaPortalFilterCondition === 'or'){
					$.each(MetaPortalFilterArray, function(index,value){
						filters += '.id'+value+',';
					});
					filters = filters.slice(0, -1);
				}else{
					$.each(MetaPortalFilterArray, function(index,value){
						filters += '.id'+value;
					});
				}
			}
			// run isotope after filter has been clicked
			$grid.isotope({ filter: filters });
		},
		
		removeFilter: function(){
			$('.metaportal_fn_result_box .result_item a').off().on('click',function(){
				var e 			= $(this),
					parent		= e.closest('.metaportal_fn_collection'),
					resultItem	= e.closest('.result_item'),
					resultBox	= parent.find('.metaportal_fn_result_box'),
					id 			= resultItem.data('id'),
					filterCount = resultBox.find('.filter_count span');
				resultItem.remove();
				parent.find('.metaportal_fn_filters .checkbox[data-id="'+id+'"]').removeClass('selected').find('input[type="checkbox"]').prop('checked','');
				filterCount.text(parseInt(filterCount.text())-1);
				if(resultBox.find('.result_item').length === 0){
					resultBox.find('.clear_all').remove();
					resultBox.find('.condition_trigger').remove();
					MetaPortalFilterCondition = 'and';
				}
				// remove new filter ID from our filters array in order to apply isotope filter for items next
				var index = MetaPortalFilterArray.indexOf(id);
				if(index !== -1){
					MetaPortalFilterArray.splice(index, 1);
				}
				FrenifyMetaPortal.recallGridAfterFiltering();
				return false;
			});
			
			$('.metaportal_fn_result_box .clear_all').off().on('click',function(){
				var e 			= $(this),
					parent		= e.closest('.metaportal_fn_collection'),
					filterBox	= parent.find('.metaportal_fn_filters'),
					resultBox	= parent.find('.metaportal_fn_result_box'),
					filterCount = resultBox.find('.filter_count span');
				filterCount.text(0);
				resultBox.find('.result_item').remove();
				e.remove();
				resultBox.find('.condition_trigger').remove();
				filterBox.find('.checkbox').removeClass('selected').find('input[type="checkbox"]').prop('checked','');
				FrenifyMetaPortal.recallGridAfterFiltering('clear');
				return false;
			});
			
			$('.metaportal_fn_result_box .condition_trigger').off().on('click',function(){
				var e 			= $(this);
				var text		= e.find('.text');
				if(e.hasClass('opened')){
					e.removeClass('opened');
					text.fadeOut(function(){
						text.text(e.data('and-text'));
						text.fadeIn();
					});
					MetaPortalFilterCondition = 'and';
				}else{
					e.addClass('opened');
					text.fadeOut(function(){
						text.text(e.data('or-text'));
						text.fadeIn();
					});
					MetaPortalFilterCondition = 'or';
				}
				
				FrenifyMetaPortal.recallGridAfterFiltering();
				
				return false;
			});
		},
		
		filterItems: function(){
			$('.metaportal_fn_filters .filter_item.opened').each(function(){
				var e = $(this);
				e.find('.filter_item__content').slideDown(300);
			});
			$('.filter_item__header a').off().on('click',function(){
				var parent = $(this).closest('.filter_item');
				if(parent.hasClass('opened')){
					parent.removeClass('opened');
					parent.find('.filter_item__content').slideUp(300);
				}else{
					parent.addClass('opened');
					parent.find('.filter_item__content').slideDown(300);
				}
				return false;
			});
		},
		
		hold: function(){
		var holdable					= $('#social,.metaportal_fn_search');
			var inactivityTime = function () {
				var time;
				window.onload 			= resetTimer;
				document.onmousemove 	= resetTimer;
				document.onkeypress	 	= resetTimer;
				function logout() {
					holdable.addClass('hold');
				}
				function resetTimer() {
					if($(window).scrollTop() > $(window).height()){
						clearTimeout(time);
						time = setTimeout(logout, 2000);
						holdable.removeClass('hold');
					}
				}
			};
			if($(window).scrollTop() < $(window).height()){
				holdable.addClass('hold');
			}
			$(window).on('scroll',function(){
				if($(window).scrollTop() < $(window).height()){
					holdable.addClass('hold');
				}
			});
				
			inactivityTime();
		},
			
		
		
		countdown: function(){
			$('.metaportal_fn_countdown').each(function(){
				var e = $(this),
					t = e.data('type');
				if(t === 'due_date'){
				var countDownDate = new Date(e.data('date')).getTime();
				}else if(t === 'ever'){
					var days 	= parseInt(e.data('days')) * 24 * 3600,
						hours	= parseInt(e.data('hours')) * 3600,
						minutes	= parseInt(e.data('minutes')) * 60,
						seconds	= parseInt(e.data('seconds'));
					var ever	= days + hours + minutes + seconds;
				}
				var p = e.parent();
				if(e.hasClass('boxed')){
					e.after('<div class="metaportal_fn_boxed_countdown"><ul><li class="days"><div class="item"><div class="count"><h3 class="fn__gradient_title"></h3></div><span>Days</span></div></li><li class="hours"><div class="item"><div class="count"><h3 class="fn__gradient_title"></h3></div><span>Hours</span></div></li><li class="minutes"><div class="item"><div class="count"><h3 class="fn__gradient_title"></h3></div><span>Minutes</span></div></li><li class="seconds"><div class="item"><div class="count"><h3 class="fn__gradient_title"></h3></div><span>Seconds</span></div></li></ul></div>');
					e.remove();
				}
				if(t === 'due_date'){
					// Update the count down every 1 second
					setInterval(function() {
						// Get today's date and time
						var now = new Date().getTime();
						
						var utc1 = e.data('utc');
						var difference = 0;
						if(typeof utc1 !== 'undefined' && utc1 !== false){
							utc1 = parseFloat(utc1) * 60;
							var offset = new Date().getTimezoneOffset() * (-1);
							difference = (utc1 - offset)*60*1000;
						}

						// Find the distance between now and the count down date
						var distance = countDownDate - now - difference;

						// Time calculations for days, hours, minutes and seconds
						var days = Math.floor(distance / (1000 * 60 * 60 * 24));
						var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
						var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
						var seconds = Math.floor((distance % (1000 * 60)) / 1000);

						if(e.hasClass('boxed')){
							days = (days < 10 ? '0' + days : days);
							hours = (hours < 10 ? '0' + hours : hours);
							minutes = (minutes < 10 ? '0' + minutes : minutes);
							seconds = (seconds < 10 ? '0' + seconds : seconds);
							p.find('.days h3').text(days);
							p.find('.hours h3').text(hours);
							p.find('.minutes h3').text(minutes);
							p.find('.seconds h3').text(seconds);
						}else{
							var text = '';
							if(days > 0){text += days + 'd: ';}
							text += hours + 'h: ' + minutes + 'm: ' + seconds + 's';
							e.text(text);
						}
						
					}, 1000);
				}else if(t === 'ever'){
					setInterval(function(){
						days 	= Math.floor(ever / 86400);
						hours	= Math.floor((ever % 86400) / 3600);
						minutes	= Math.floor((ever % 3600) / 60);
						seconds	= Math.floor((ever % 60));
							
						if(e.hasClass('boxed')){
							days = (days < 10 ? '0' + days : days);
							hours = (hours < 10 ? '0' + hours : hours);
							minutes = (minutes < 10 ? '0' + minutes : minutes);
							seconds = (seconds < 10 ? '0' + seconds : seconds);
							p.find('.days h3').text(days);
							p.find('.hours h3').text(hours);
							p.find('.minutes h3').text(minutes);
							p.find('.seconds h3').text(seconds);
						}else{
							var text = '';
							if(days > 0){text += days + 'd: ';}
							text += hours + 'h: ' + minutes + 'm: ' + seconds + 's';
							e.text(text);
						}
						ever--;
					}, 1000);
				}
			});
		},
		
		qnt: function(){
			$('.qnt .decrease').off().on('click',function(){
				var e = $(this),
					s = e.closest('.qnt').find('.summ');
				var sVal = parseInt(s.text());
				if(sVal >= 2){sVal--;}
				s.text(sVal);
				var price = sVal * s.data('price');
				s.closest('.mint_list').find('.total_price').html(price);
				return false;
			});
			$('.qnt .increase').off().on('click',function(){
				var e = $(this),
					s = e.closest('.qnt').find('.summ');
				var sVal = parseInt(s.text());
				sVal++;
				s.text(sVal);
				var price = sVal * s.data('price');
				s.closest('.mint_list').find('.total_price').html(price);
				return false;
			});
		},
		isotope: function(){
			$('.fn-isotope').isotope({
				itemSelector: '.isotope-item',
				masonry: {}
			});
		},
		
		headerAnchor: function(){
			$('.header .nav a').on('click',function(){
				var e = $(this);
				if($(e.attr('href')).length){
					$("html, body").animate({ scrollTop: $(e.attr('href')).offset().top }, 1000);
				}
			});
		},
		
		resizeWalletAndLeftNav: function(){
			var walletHeight = $('.metaportal_fn_walletbox').height();
			$('.metaportal_fn_walletbox .walletbox').css({minHeight: walletHeight});
			
			
			var leftnavHeight = $('.metaportal_fn_leftnav').height();
			$('.metaportal_fn_leftnav .navbox').css({minHeight: leftnavHeight});
		},
		
		ready: function(){
			$('.metaportal_fn_walletbox, .metaportal_fn_wallet_closer, .metaportal_fn_leftnav, .metaportal_fn_leftnav_closer').removeClass('ready');
		},
		
		walletAndLeftNavOpener: function(){
			var walletbox 	= $('.metaportal_fn_walletbox');
			var closer		= $('.metaportal_fn_wallet_closer,.metaportal_fn_walletbox .fn__closer');
			$('.wallet_opener').on('click',function(){
				walletbox.addClass('active');
				closer.addClass('active');
				
				return false;
			});
			closer.on('click',function(){
				walletbox.removeClass('active');
				closer.removeClass('active');
				
				return false;
			});
			
			var leftNav 	= $('.metaportal_fn_leftnav');
			var closer2		= $('.metaportal_fn_leftnav_closer,.metaportal_fn_leftnav .fn__closer');
			$('.header .trigger,.metaportal_fn_mobnav .social_trigger .trigger').on('click',function(){
				leftNav.addClass('active');
				closer2.addClass('active');
				
				return false;
			});
			closer2.on('click',function(){
				leftNav.removeClass('active');
				closer2.removeClass('active');
				
				return false;
			});
			var mobOpener 	= $('.metaportal_fn_mobnav .mob_mid .trigger');
			var mobDD		= $('.metaportal_fn_mobnav .mob_bot');
			mobOpener.on('click',function(){
				if(mobOpener.hasClass('active')){
					mobOpener.removeClass('active');
					mobDD.slideUp(300);
				}else{
					mobOpener.addClass('active');
					mobDD.slideDown(300);
				}
				
				return false;
			});
		},
		
		preloader: function(){
			if(FrenifyPreloader){return false;}FrenifyPreloader = true;
  			var date2 			= new Date();
			var difference		= date2-FrenifyTime;
			var waitTime 		= 2000;
			if(difference < waitTime){
				waitTime -= difference;
			}else{
				waitTime = 0;
			}
			setTimeout(function(){
				$('.metaportal_fn_preloader').addClass('ready');
			},waitTime);
		},
		
		seachSomething: function(){
			var searchOpener 	= $('.metaportal_fn_search');
			var searchbox 		= $('.metaportal_fn_searchbox');
			var searchCloser	= $('.metaportal_fn_search_closer');
			var input 			= searchbox.find('input');
			var button 			= searchbox.find('a');
			searchOpener.on('click',function(){
				if(searchbox.hasClass('active')){
					searchbox.removeClass('active');
					searchCloser.removeClass('active');
				}else{
					searchbox.addClass('active');
					searchCloser.addClass('active');
					input.val('');
					setTimeout(function(){
						input[0].focus();
					},100);
				}
				return false;
			});
			searchCloser.on('click',function(){
				searchbox.removeClass('active');
				searchCloser.removeClass('active');
				return false;
			});
			input.on("keypress", function(event) {
				if (event.key === "Enter") {
					event.preventDefault();
					button.trigger('click');
				}
			});
			button.on('click',function(){
				var string = $('.metaportal_fn_searchbox input').val();
				window.find(string);
				searchbox.removeClass('active');
				searchCloser.removeClass('active');
				return false;
			});
		},
		
		totopScroll: function(){
			var minSpeed 		= 500;
			var maxSpeed		= 1500;
			$(".metaportal_fn_totop").off().on('click', function(e) {
				e.preventDefault();
				var speed		= ($(window).scrollTop()-$(window).height())/2;
				if(speed < minSpeed){speed = minSpeed;}
				if(speed > maxSpeed){speed = maxSpeed;}
				$("html, body").animate({ scrollTop: 0 }, speed);
				return false;
			});
		},
		
		contactForm: function(){
			$(".contact_form #send_message").on('click', function(){
				var name 		= $(".contact_form #name").val();
				var email 		= $(".contact_form #email").val();
				var tel 		= $(".contact_form #tel").val();
				var subject 	= $(".contact_form #subject").val();
				var message 	= $(".contact_form #message").val();
				var success     = $(".contact_form .returnmessage").data('success');

				$(".contact_form .returnmessage").empty(); //To empty previous error/success message.
				//checking for blank fields	
				if(name === '' || email === '' || message === ''){
					$('.contact_form .empty_notice').slideDown(500).delay(2000).slideUp(500);
				}
				else{
					// Returns successful data submission message when the entered information is stored in database.
					$.post("modal/contact.php",{ ajax_name: name, ajax_email: email, ajax_subject: subject, ajax_message:message, ajax_tel: tel}, function(data) {

						$(".contact_form .returnmessage").append(data);//Append returned message to message paragraph


						if($(".contact_form .returnmessage span.contact_error").length){
							$(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);		
						}else{
							$(".contact_form .returnmessage").append("<span class='contact_success'>"+ success +"</span>");
							$(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
						}

						if(data===""){
							$("#contact_form")[0].reset();//To reset form fields on success
						}

					});
				}
				return false; 
			});
		},
		
		collection: function(){
			$('.fn_cs_collection').each(function(){
				var collection = $(this);
				var items = collection.find('.item');
				var itemsLength = items.length;
				setInterval(function(){
					var numberOne = Math.floor(Math.random() * itemsLength);
					var numberTwo = Math.floor(Math.random() * itemsLength);

					while(numberTwo === numberOne){
						numberTwo = Math.floor(Math.random() * itemsLength);
					}
					var firstDiv = collection.find('.item').eq(numberOne);
					var secondDiv = collection.find('.item').eq(numberTwo);
					var firstImage = firstDiv.find('input').val();
					var secondImage = secondDiv.find('input').val();
					firstDiv.addClass('ready');	
					secondDiv.addClass('ready');
					setTimeout(function(){
						firstDiv.find('input').val(secondImage);
						firstDiv.find('.abs_img').css({backgroundImage: 'url('+secondImage+')'});
						secondDiv.find('input').val(firstImage);
						secondDiv.find('.abs_img').css({backgroundImage: 'url('+firstImage+')'});
						firstDiv.removeClass('ready');	
						secondDiv.removeClass('ready');
					},500);
				},2000);
			});
		},
		
		video: function(){
			$('.popup-youtube, .popup-vimeo').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					disableOn: 700,
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				});
			});

			$('.popup-soundcloud').magnificPopup({
				type: 'image',
				gallery: {
					enabled: true, 
				},
			});	
		},
		
		fn_cs_counter: function(){
			$('.fn_cs_counter').each(function() {
				var el = $(this);
				el.waypoint({
					handler: function(){
						if(!el.hasClass('stop')){
							el.addClass('stop').countTo({
								refreshInterval: 50,
								formatter: function (value, options) {
									return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, '');
								},	
							});
						}
					},
					offset:'90%'	
				});
			});	
		},
		
		headerFixer: function(){
			var body		= $('body');
			var header		= $('.header');
			var scrollTop 	= $(window).scrollTop();
			if(scrollTop > 10){
				header.addClass('active');
			}else{
				header.removeClass('active');
			}
			if(scrollTop > 300){
				body.addClass('totop-active');
			}else{
				body.removeClass('totop-active');
			}
		},
		
		slider: function(){
			$('.fn_cs_slider').each(function(){
				var slider 			= $(this);
				
				var sliderTop 		= slider.find('.slider_top');
				var sliderBottom 	= slider.find('.slider_content');
				var activeIndex 	= 2;
				var speed			= 6000; // milliseconds
				
				// init slider animation
				var myInterval 		= setInterval(function(){
					activeIndex++;
					activeIndex 	= FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
				},speed);
				
				
				// previous navigation button
				slider.find('.slider_nav .prev').off().on('click',function(){
					clearInterval(myInterval);
					activeIndex--;
					activeIndex 	= FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					myInterval 		= setInterval(function(){
						activeIndex++;
						activeIndex = FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					},speed);
					return false;
				});
				
				// next navigation button
				slider.find('.slider_nav .next').off().on('click',function(){
					clearInterval(myInterval);
					activeIndex++;
					activeIndex 	= FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					myInterval 		= setInterval(function(){
						activeIndex++;
						activeIndex = FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					},speed);
					return false;
				});
				
				// previous and next item
				slider.find('.slider_top li').on('click',function(e){
					var getClass = $(this).attr('class');
					if(getClass === 'next'){
						e.stopPropagation();
						e.preventDefault();
						activeIndex++;
					}else if(getClass === 'prev'){
						e.stopPropagation();
						e.preventDefault();
						activeIndex--;
					}
					if(getClass === 'next' || getClass === 'prev'){
						clearInterval(myInterval);
						activeIndex 	= FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
						myInterval 		= setInterval(function(){
							activeIndex++;
							activeIndex = FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
						},speed);
						return false;
					}
				});
			});
				
		},
		
		sliderDo: function(sliderTop,sliderBottom,activeIndex){
			var topLength	= sliderTop.find('li').length;
			if(activeIndex > topLength){activeIndex-=topLength;}
			var indexPrev	= activeIndex - 1;
			var indexPrev2	= activeIndex - 2;
			var indexNext 	= activeIndex + 1;
			var indexNext2 	= activeIndex + 2;
			if(indexPrev > topLength){indexPrev-=topLength;}
			if(indexPrev2 > topLength){indexPrev2-=topLength;}
			if(indexNext > topLength){indexNext-=topLength;}
			if(indexNext2 > topLength){indexNext2-=topLength;}
			if(indexPrev < 1){indexPrev += topLength;}
			if(indexPrev2 < 1){indexPrev2 += topLength;}
			if(activeIndex < 1){activeIndex += topLength;}
			if(indexNext < 1){indexNext += topLength;}
			if(indexNext2 < 1){indexNext2 += topLength;}
			sliderTop.find('li').removeClass('prev prev2 active next next2');
			sliderTop.find('li[data-index="'+indexPrev2+'"]').addClass('prev2');
			sliderTop.find('li[data-index="'+indexPrev+'"]').addClass('prev');
			sliderTop.find('li[data-index="'+activeIndex+'"]').addClass('active');
			sliderTop.find('li[data-index="'+indexNext+'"]').addClass('next');
			sliderTop.find('li[data-index="'+indexNext2+'"]').addClass('next2');
			return activeIndex;
		},
		
		
		totopFixer: function(){
			var w = $('.metaportal_fn_totop .totop_inner').width();	
			$('.metaportal_fn_totop').css({height: w + 'px'});
		},
		
		imgToSVG: function(){
			$('img.fn__svg').each(function(){
				var img 		= $(this);
				var imgClass	= img.attr('class');
				var imgURL		= img.attr('src');

				$.get(imgURL, function(data) {
					var svg 	= $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						svg 	= svg.attr('class', imgClass+' replaced-svg');
					}
					img.replaceWith(svg);

				}, 'xml');

			});
		},

	  	BgImg: function(){
			var div = $('*[data-bg-img]');
			div.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-bg-img');
				var dataBg	= element.data('bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.css({backgroundImage:'url('+dataBg+')'});
				}
			});
		},
    
  	};
  	
	
	// READY Functions
	$(document).ready(function(){
		FrenifyMetaPortal.init();
		setTimeout(function(){
			FrenifyMetaPortal.isotope();
			FrenifyMetaPortal.isotopeCollection();
		},150);
	});
	
	// RESIZE Functions
	$(window).on('resize',function(){
		FrenifyMetaPortal.floww_calc_call();
		FrenifyMetaPortal.resizeWalletAndLeftNav();
		FrenifyMetaPortal.totopFixer();
		FrenifyMetaPortal.isotope();
		FrenifyMetaPortal.isotopeCollection();
		FrenifyMetaPortal.roadmapSwiper();
	});
	
	// LOAD Functions
	$(window).on('load',function(){
		FrenifyMetaPortal.preloader();
		FrenifyMetaPortal.isotope();
		FrenifyMetaPortal.isotopeCollection();
		
		setTimeout(function(){
			
			FrenifyMetaPortal.isotope();
			FrenifyMetaPortal.isotopeCollection();
		},200);
	});
	
	$(window).on('scroll',function(){
		FrenifyMetaPortal.headerFixer();
	});
	
  	window.addEventListener("load", function(){
		FrenifyMetaPortal.preloader();
	});
	
})(jQuery);



var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 50;
var numStars = 2000;

$('document').ready(function() {
	"use strict";
  	FrenifyRunStars();
});

function FrenifyRunStars(){
	"use strict";
	if(!$('#space').length){return false;}
	// Calculate the screen size
	screenH = $('.canvas_bg').outerHeight();
	screenW = $(window).outerWidth();
	
	// Get the canvas
	canvas = $('#space');
	
	// Fill out the canvas
	canvas.attr('height', screenH);
	canvas.attr('width', screenW);
	context = canvas[0].getContext('2d');
	
	// Create all the stars
	for(var i = 0; i < numStars; i++) {
		var x = Math.round(Math.random() * screenW);
		var y = Math.round(Math.random() * screenH);
		var length = 1 + Math.random() * 2;
		var opacity = Math.random();
		
		// Create a new star and draw
		var star = new Star(x, y, length, opacity);
		
		// Add the the stars array
		stars.push(star);
	}
	
	setInterval(animate, 1000 / fps);
}

/**
 * Animate the canvas
 */
function animate() {
	"use strict";
	context.clearRect(0, 0, screenW, screenH);
	$.each(stars, function() {
		this.draw(context);
	});
}

/**
 * Star
 * 
 * @param int x
 * @param int y
 * @param int length
 * @param opacity
 */
function Star(x, y, length, opacity) {
	"use strict";
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.length = parseInt(length);
	this.opacity = opacity;
	this.factor = 1;
	this.increment = Math.random() * 0.03;
}

/**
 * Draw a star
 * 
 * This function draws a start.
 * You need to give the contaxt as a parameter 
 * 
 * @param context
 */
Star.prototype.draw = function() {
	"use strict";
	context.rotate((Math.PI * 1 / 10));
	
	// Save the context
	context.save();
	
	// move into the middle of the canvas, just to make room
	context.translate(this.x, this.y);
	
	// Change the opacity
	if(this.opacity > 1) {
		this.factor = -1;
	}
	else if(this.opacity <= 0) {
		this.factor = 1;
		
		this.x = Math.round(Math.random() * screenW);
		this.y = Math.round(Math.random() * screenH);
	}
		
	this.opacity += this.increment * this.factor;
	
	context.beginPath();
	for (var i = 5; i--;) {
		context.lineTo(0, this.length);
		context.translate(0, this.length);
		context.rotate((Math.PI * 2 / 10));
		context.lineTo(0, - this.length);
		context.translate(0, - this.length);
		context.rotate(-(Math.PI * 6 / 10));
	}
	context.lineTo(0, this.length);
	context.closePath();
	context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
	context.shadowBlur = 5;
	context.shadowColor = '#ffff33';
	context.fill();
	
	context.restore();
};