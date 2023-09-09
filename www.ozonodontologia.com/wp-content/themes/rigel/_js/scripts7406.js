/* Custom Scripts */
// setting the viewport width
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y }
}
var viewport = updateViewportDimensions();

function loadGravatars() {
	// set the viewport using the function above
	viewport = updateViewportDimensions();
	// if the viewport is tablet or larger, we load in the gravatars
	if (viewport.width >= 768) {
		jQuery('.comment img[data-gravatar]').each(function(){
			jQuery(this).attr('src',jQuery(this).attr('data-gravatar'));
		});
	}
} // end function

(function($){
	'use strict';

	String.prototype.decodeHTML = function() {
		return $("<div>", {html: "" + this}).html();
	};

	//WOO DROP DOWN
	var $main = $("#wrapper"),
		$mainCon = $("#main-wrapper"),
		responsive_viewport = $(window).width(),
		contentNode = $main.get(0),

	woo_drop_down = function (){
		/* WOO COMMERCE Cart */
		var $cartBtn = $('.cart-trigger'),
			$cartDropdown = $('.cart-trigger').find('.woo-cart-dropdown');

		if($cartBtn.length > 0 && $cartDropdown.length > 0){

			$cartBtn.mouseover(function(){
				$(this).find('.woo-cart-dropdown').stop().fadeIn();
			}).mouseout(function(){
				$(this).find('.woo-cart-dropdown').stop().fadeOut();
			});

		}
	},

	preloaderShow = function (e) {

		if( $(this).parent().hasClass( 'current-menu-item' ) ) {
			e.preventDefault();
			return;
		}

		if ( ( e.shiftKey || e.ctrlKey || e.metaKey || '_blank' == $.trim( $(this).attr('target') ) ) ) { 
			return;
		}

		$('#preloader-con').fadeIn(function(){
			$('body').height( $(window).height() + 200 );
		});

	},

	customScroll = function (event){
		
		var $window = $(window),
			isTweening = false,
			delta = 0;
		
		if (!event){
			event = window.event;
		}
		
		if (event.wheelDelta) {
			delta = event.wheelDelta/120;
		} else if(event.detail) {
			delta = -event.detail/3;
		}
		
		if ( !$(event.target).parents('.mobile-menu-nav.moved').length && !$(event.target).parents('.left-main-menu').length ) {
			if (delta){
				
				//console.log(isTweening);
				
				//if(!isTweening){
					
					//isTweening = true;
					
					var scrollTop = $window.scrollTop();
					var finScroll = scrollTop - parseInt( delta * 100 ) * 3 ;

					TweenLite.to($window, 0.5, {
						scrollTo : { y: finScroll, autoKill:true },
						ease: Power1.easeOut,
						autoKill: true,
						overwrite: 5,
						onComplete: function(){ 
							//console.log(isTweening);
							//isTweening = false; 
						}
					   });
					
			   //}
			}
			
			if (event.preventDefault){
				event.preventDefault();
			}
			
			event.returnValue = false;
		}	
		
	},

	init = function() {

		if( $('body').hasClass('pix-preloader-enabled') ){
			$('body').height( $(window).height() + 200 );
		}

		loadGravatars();

		/* Smooth Page Scroll */
		if($('body').hasClass('custom-scroll')) {
			if( !navigator.userAgent.match(/IEMobile/i) && !$('html').hasClass('touch') ){			
			
				document.onmousewheel = function(){ customScroll(); }
				if(document.addEventListener){
					document.addEventListener('DOMMouseScroll', customScroll, false);
				}
				
			}
		}

		/* getting viewport width */
		var responsive_viewport = $(window).width();

		/* WMPL Language Menu */
		var $langBtn = $('#lang-list.lang-dropdown.translated');

		if($langBtn.length > 0){

			$langBtn.mouseover(function(){
				var $langDropdown = $(this).find('.lang-dropdown-inner');
				$langDropdown.stop().slideDown();
			}).mouseout(function(){
				var $langDropdown = $(this).find('.lang-dropdown-inner');
				$langDropdown.stop().slideUp();
			});

		}

		//Mobile Menu
		var mMenuStatus = 0,
			$mMenu = $('.mobile-menu-nav'),
			$pixOverlay = $('<div />', {class: 'pix-overlay'});
			
		$('.pix-menu .pix-menu-trigger').on('click', function(e) {
			var $this = $(this);
			if(mMenuStatus == 0){
				$this.parent().addClass('pix-menu-open').removeClass('pix-menu-close');
				$('#content-pusher').addClass('content-pushed');
				//Add Overlay
				$pixOverlay.hide().appendTo('body').fadeIn(300);            

				//Show Menu
				$mMenu.addClass('mobile-nav').addClass('moved');
				$('.left-main-menu').addClass('moved');

				mMenuStatus = 1;    

				//Add Click event to overlay
				$pixOverlay.off().on('click', function(e) {
					e.preventDefault();
					if(mMenuStatus == 1){
						$this.parent().removeClass('pix-menu-open').addClass('pix-menu-close');
						$('#content-pusher').removeClass('content-pushed');
						$mMenu.removeClass('mobile-nav').removeClass('moved');
						$('.left-main-menu').removeClass('moved');
						$pixOverlay.fadeOut(300, function() {
							$(this).remove();
						});
						mMenuStatus = 0;
					}
				});				

			}else{
				$mMenu.removeClass('mobile-nav').removeClass('moved');
				$('.left-main-menu').removeClass('moved');
				$pixOverlay.fadeOut(300, function() {
					$(this).remove();
				});
				mMenuStatus = 0;
				$this.parent().removeClass('pix-menu-open').addClass('pix-menu-close');
				$('#content-pusher').removeClass('content-pushed');
			}

			e.preventDefault();
		});

		//Counter
		$('.counter-value').counterUp({
			delay: 10,
			time: 1200
		}); 

		/* Responsive video */
		$(".container, .posts, .pix-blog-video,.wp-video, .pix-post-video").fitVids();

		/* open share in popup window */
		$('.port-share-btn a, .share-social a').on('click', function(e){
			e.preventDefault();
			var newwindow = window.open($(this).attr('href'),'','height=450,width=700');
			if (window.focus) {newwindow.focus()}
				return false;
		});

		$('.main-nav .menu-item-has-children .pix-dropdown-arrow').on('click',function(e) {
			e.preventDefault();
			$(this).parent().next('ul').stop().slideToggle();
		});

		$(window).resize(function(event) {

			var responsive_viewport = $(window).width(),
				$sideHeader = $('.left-main-menu');

			if (responsive_viewport >= 991) {
				$mainCon.css('margin-bottom',$('.footer-fixed').height()+'px');
			}else{
				$mainCon.css('margin-bottom','0px');				
			}
			
			if(responsive_viewport <= 991){
				$mMenu.addClass('mobile-nav');
				
			}else{
				$mMenu.removeClass('mobile-nav');
			}
			
		});

	},

	loadMore = function( self ) {

		// Assign div as variables
		var $loadMoreBtn = self.parents('.load-more-btn'),
			$loadContainer = self.parents('.loadmore-wrap').find('.load-container'),
			allPostLoadedText = rigel_notice.all_post_loaded_text;

		if( $loadMoreBtn.hasClass('loadmore-loading') ) {
			return;
		}

		// Assign useful values
		var ajaxurl = rigel_notice.ajaxurl,
			values = self.data('values'),
			args = self.data('args');

		var page_number = self.data('paged');
		if( undefined != page_number ) {
			var page_number = page_number+1;
		}

		var max = values.max;

		if( page_number > max ) return;

		$.ajax({
			type: 'post',
            url: ajaxurl,
            data: {
				action : values.action,
				values : values,
				args   : args,
				paged  : page_number
            },
			beforeSend: function(){			
				$loadMoreBtn.addClass('loadmore-loading');
			},
			complete: function() {
				//afterContentLoad();
			},
		}).done(function(data) {

			var $data = $(data),
				$posts = $data.find('.load-element');

			var paged = $data.find('.ajax-posts').data('paged');

			self.data('paged', paged );

			if( max == paged ) {
				$loadMoreBtn.find('a').text( allPostLoadedText );
				$loadMoreBtn.find('a').addClass('disabled');
			}

			var $loadContainer = self.parents('.loadmore-wrap').find('.load-container');

			// Append Elements
			if( $loadContainer.hasClass('portfolio-contents') || $loadContainer.hasClass('blog-isotope') ) {
				$loadContainer.isotope()
				.append( $posts )
				.isotope( 'appended', $posts );
				$loadContainer.imagesLoaded().progress( function() {
					$loadContainer.isotope('layout');
				});

				// For portfolio filter
				if( $loadContainer.hasClass('portfolio-contents') ) {
					var $filter = $loadContainer.parents( '.loadmore-wrap' ).find( '#filters' );
					if( $filter.length > 0 ) {
						$filter.find('li').eq(0).find('a').trigger('click');
					}
				}
				
			}
			else {
				$loadContainer.find('.load-element').last().after( $posts );
			}

			var $elem = $('.pix-animate-cre');

			$elem.each(function(){
				var $singleElement = $(this);

				// Get data-attr from element
				var animateTrans = $singleElement.data('trans') ? $singleElement.data('trans') : 'fadeIn';
				var animateDelay = $singleElement.data('delay') ? $singleElement.data('delay') : '';
				var animateDuration = $singleElement.data('duration') ? $singleElement.data('duration') : '';

				if(animateDelay != ''){
					$singleElement.css('animation-delay', animateDelay);
				}

				if(animateDuration != ''){
					$singleElement.css('animation-duration', animateDuration);
				}

				$singleElement.waypoint(function() {
					if ($singleElement.hasClass('animated ' + animateTrans)) return;
					$singleElement.css('opacity','1').addClass('animated '+ animateTrans);

				},
				{
					offset: '90%',
					triggerOnce: true
				});
			});

		}).always(function(){

			$loadMoreBtn.removeClass('loadmore-loading');

		});
	},

	// Blocks Load more
	blockLoadMore = function ( self ) {

		// Assign div as variables
		var $loadMoreBtn = self.parents('.block-load-more-btn'),
			$loadContainer = self.parents('.loadmore-wrap').find('.load-container');

		// Assign useful values
		var ajaxurl = rigel_notice.ajaxurl,
			values = self.data('values'),
			args = self.data('args');

		var page_number = self.data('paged');
		if( undefined != page_number ) {
			var page_number = page_number+1;
		}

		var max = values.max;

		$.ajax({
			type: 'post',
            url: ajaxurl,
            data: {
				action : values.action,
				values : values,
				args   : args,
				paged  : page_number
            },
			beforeSend: function(){			
				$loadMoreBtn.find('.spinner').fadeIn();
				$loadMoreBtn.find('a').hide();
				$loadMoreBtn.addClass('disabled');
			},
			complete: function() {
				//Magnific Popup
				$('.popup-gallery').magnificPopup({
					type: 'image',
					tLoading: 'Loading image...',
					mainClass: 'mfp-img-mobile',
					gallery: {
						enabled: false,
						navigateByImgClick: true,
						preload: [0,1] // Will preload 0 - before current, and 1 after the current image
					},
					image: {
						tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
						titleSrc: function(item) {
							return item.el.data('title');
						}
					}
				});
			},
		}).done(function(data) {

			console.log(data);

			var $data = $(data),
				$posts = $data.find('.load-element');

			var paged = $data.find('.ajax-posts').data('paged');

			self.data('paged', paged );

			if( max == paged ) {

				$loadMoreBtn.find('.loaded-msg').removeClass('hide');
				$loadMoreBtn.find('.loaded-msg').show(0);
			}
			else {
				$loadMoreBtn.find('a').show();
			}

			var $loadContainer = self.parents('.loadmore-wrap').find('.load-container');

			// Append Elements
			if( $loadContainer.hasClass('portfolio-contents') || $loadContainer.hasClass('grid-blog-contents') || $loadContainer.hasClass('shop-contents') ) {
				$loadContainer.isotope({
					layoutMode: 'packery',
					percentPosition: true,
					itemSelector : '.pix-portfolio-item'
				})
				.append( $posts )
				.isotope( 'appended', $posts );
				$loadContainer.imagesLoaded().progress( function() {
					$loadContainer.isotope('layout');
				});
				
			}
			else {
				$loadContainer.find('.load-element').last().after( $posts );
			}

		}).always(function(){

			$loadMoreBtn.find('.spinner').fadeOut();
			$loadMoreBtn.removeClass('disabled');

		});
	},

	afterPageLoad = function(){

		var $portfolioContainer = $('.portfolio-contents');
		$portfolioContainer.isotope({
			layoutMode: 'packery',
			percentPosition: true,
			itemSelector : '.pix-portfolio-item'
		});

		var $portfolioContainer = $('.gallery-contents');
		$portfolioContainer.isotope({
			layoutMode: 'packery',
			percentPosition: true,
			itemSelector : '.pix-portfolio-item'
		});

		// Load More
		var $loadMoreBtn = $( '.block-load-more-btn' );

		if ( $loadMoreBtn.length ) {

			if ( $loadMoreBtn.hasClass( 'amz-autoload') ) {

				$( window ).on('scroll', function() { 

					if( $( window ).scrollTop() >= $( '.load-container' ).offset().top + $( '.load-container' ).outerHeight() - window.innerHeight ) { 

						if( $loadMoreBtn.hasClass('done-loading') || $loadMoreBtn.hasClass( 'disabled' ) ) {
							return;
						}

						$loadMoreBtn.find('a').trigger('click');

					}

				});
			}

			$( '.block-load-more-btn' ).on( 'click', 'a', function(e) {
				e.preventDefault();
				
				blockLoadMore( $(this) );
				
			});
		}

		var $elem = '';

		$('[data-hover-animate]').addClass('loaded');

		/* HoverBox */
		$(".hover-box").hover(
			function() {
				var $elems = $(this).find('[data-hover-animate]');

				$elems.each(function() {
					
					var animateTransIn  = $(this).data('trans-in')    ? $(this).data('trans-in')    : 'fadeIn';
					var animateTransOut = $(this).data('trans-out')    ? $(this).data('trans-out')   : 'fadeOut';			
					var animateDelay    = $(this).data('delay-in')    ? $(this).data('delay-in')       : '';
					var animateDuration = $(this).data('duration-in') ? $(this).data('duration-in')    : '';

					if( animateDelay != '' ){
						$(this).css('animation-delay', animateDelay);
					}

					if( animateDuration != '' ){
						$(this).css('animation-duration', animateDuration);
					}

					$(this).removeClass(animateTransOut).addClass(animateTransIn);

				});

			},
			function(){

				var $elems = $(this).find('[data-hover-animate]');

				$elems.each(function() {
					

					var animateTransIn  = $(this).data('trans-in')    ? $(this).data('trans-in')    : 'fadeIn';
					var animateTransOut = $(this).data('trans-out')    ? $(this).data('trans-out')   : 'fadeOut';
					var animateDelay    = $(this).data('delay-out')    ? $(this).data('delay-out')       : '';
					var animateDuration = $(this).data('duration-out') ? $(this).data('duration-out')    : '';

					if( animateDelay != '' ){
						$(this).css('animation-delay', animateDelay);
					}

					if( animateDuration != '' ){
						$(this).css('animation-duration', animateDuration);
					}

					$(this).removeClass(animateTransIn).addClass(animateTransOut);

				});

				$elems = '';
			}
	    );
		
		$('.main-nav').singlePageNav({
			currentClass: 'current-menu-item',
			offset: 60,
			filter: ':not(.external)',
			updateHash: false,
			navContainerClass: '.main-nav',
			/*beforeStart: function() {
				console.log('begin scrolling');
			},
			onComplete: function() {
				console.log('done scrolling');
			}*/
		});
		
		var $mainnav = $('.main-nav');
		if( $mainnav.length == 2 ) {
			$('.main-nav-right').find('li').removeClass('current-menu-item');
		}

		$('.popup-video').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});

		if (responsive_viewport >= 991) {
			$mainCon.css('margin-bottom',$('.footer-fixed').height()+'px');
		}else{
			$mainCon.css('margin-bottom','0px');
		}

		$(".composer-primary-slider").each( function( index, el ) {
			var $self = $(this);
			$self.owlCarousel({
				navText: ['',''],
				items: 1,
				nav: ( typeof ( $(this).data( 'nav' ) ) == 'undefined' ) ? false : $(this).data( 'nav' ),
				dots: ( typeof ( $(this).data( 'dots' ) ) == 'undefined' ) ? true : $(this).data( 'dots' ),
				autoplay : ( typeof ( $(this).data( 'autoplay' ) ) == 'undefined' ) ? false : $(this).data( 'autoplay' ),
				autoplayTimeout: ( typeof ( $(this).data( 'autoplay-timeout' ) ) == 'undefined' ) ? 5000 : $(this).data( 'autoplay-timeout' ),
				autoplayHoverPause : ( typeof ( $(this).data( 'autoplay-hover-pause' ) ) == 'undefined' ) ? true : $(this).data( 'autoplay-hover-pause' ),
				loop: ( typeof ( $(this).data( 'loop' ) ) == 'undefined' ) ? true : $(this).data( 'loop' ),
				//rtl: ( rigel.rtl === 'true' ) ? true : false,
				onInitialized: function(){
					$self.find('.slide-title, .slide-content, .pix_button').removeClass('animated fadeInUp');
					$self.find('.active .slide-title, .active .slide-content, .active .pix_button').addClass('animated fadeInUp');

					var header = $self.find('.active .slider-content').data('header');

					console.log( header );

					if( header == 'white' ) {
						$('.transparent-header').addClass('light-header');
						$('.pageTopCon').addClass('top-sec-dark');
					} else if( header == 'black' ) {
						$('.transparent-header').removeClass('light-header');
						$('.pageTopCon').removeClass('top-sec-dark');
					}

				},
				onTranslated: function(){
					$self.find('.slide-title, .slide-content, .pix_button').removeClass('animated fadeInUp');
					$self.find('.active .slide-title, .active .slide-content, .active .pix_button').addClass('animated fadeInUp');

					var header = $self.find('.active .slider-content').data('header');

					console.log( header );

					if( header == 'white' ) {
						$('.transparent-header').addClass('light-header');
						$('.pageTopCon').addClass('top-sec-dark');
					} else if( header == 'black' ) {
						$('.transparent-header').removeClass('light-header');
						$('.pageTopCon').removeClass('top-sec-dark');
					}

				}
			});
		});

		// Owl Carousel
		$(".owl-carousel").each( function( index, el ) {

			var elem = {};
			elem.Items              = ( typeof ( $(this).data( 'items' ) ) == 'undefined' ) ? 3 : $(this).data( 'items' ), 
			elem.Margin             = ( typeof ( $(this).data( 'margin' ) ) == 'undefined' ) ? 30 : $(this).data( 'margin' ),
			elem.Loop               = ( typeof ( $(this).data( 'loop' ) ) == 'undefined' ) ? true : $(this).data( 'loop' ),
			elem.Center             = ( typeof ( $(this).data( 'center' ) ) == 'undefined' ) ? false : $(this).data( 'center' ),
			elem.MouseDrag          = ( typeof ( $(this).data( 'mouse-drag' ) ) == 'undefined' ) ? true : $(this).data( 'mouse-drag' ),
			elem.TouchDrag          = ( typeof ( $(this).data( 'touch-drag' ) ) == 'undefined' ) ? true : $(this).data( 'touch-drag' ),
			elem.StagePadding       = ( typeof ( $(this).data( 'stage-padding' ) ) == 'undefined' ) ? 0 : $(this).data( 'stage-padding' ),
			elem.StartPosition      = ( typeof ( $(this).data( 'start-position' ) ) == 'undefined' ) ? 0 : $(this).data( 'start-position' ),
			elem.Nav                = ( typeof ( $(this).data( 'nav' ) ) == 'undefined' ) ? false : $(this).data( 'nav' ),
			elem.Dots               = ( typeof ( $(this).data( 'dots' ) ) == 'undefined' ) ? true : $(this).data( 'dots' ),
			elem.Autoplay           = ( typeof ( $(this).data( 'autoplay' ) ) == 'undefined' ) ? false : $(this).data( 'autoplay' ),
			elem.AutoplayTimeout    = ( typeof ( $(this).data( 'autoplay-timeout' ) ) == 'undefined' ) ? 5000 : $(this).data( 'autoplay-timeout' ),
			elem.AutoplayHoverPause = ( typeof ( $(this).data( 'autoplay-hover-pause' ) ) == 'undefined' ) ? true : $(this).data( 'autoplay-hover-pause' ),
			elem.AnimateOut         = ( typeof ( $(this).data( 'animate-out' ) ) == 'undefined' ) ? false : $(this).data( 'animate-out' ),
			elem.AnimateIn          = ( typeof ( $(this).data( 'animate-in' ) ) == 'undefined' ) ? false : $(this).data( 'animate-in' );

			if ( elem.Items >= 2 ) {
				elem.TabItems = 2;
			} else {
				elem.TabItems = 1;
			}

			$(this).owlCarousel({
				navText: ['',''],
				items: elem.Items,
				margin: elem.Margin,
				loop: elem.Loop,
				center: elem.Center,
				mouseDrag: elem.MouseDrag,
				touchDrag: elem.TouchDrag,
				stagePadding: elem.StagePadding,
				startPosition: elem.StartPosition,
				nav: elem.Nav,
				dots: elem.Dots,
				autoHeight: true,
				//rtl: ( rigel.rtl === 'true' ) ? true : false,
				autoplay: elem.Autoplay,
				autoplayTimeout: elem.AutoplayTimeout,
				autoplayHoverPause: elem.AutoplayHoverPause,
				responsive: {0:{'items':1},768:{'items':elem.TabItems},991:{'items': elem.Items },1199:{'items': elem.Items }},
				animateOut: elem.AnimateOut,
				animateIn: elem.AnimateIn,
				onChanged: function() {
					if ( elem.Items > 1  && elem.AnimateIn ) {
						var $item = $(this.$element[0]).find('.owl-item'),
						$curItem = $(this.$element[0]).find('.owl-item.active'),
						$prevItem = $curItem.first().prev(),
						$nextItem = $curItem.last().next();

						$(this.$element[0]).find('.owl-item').removeClass('animated '+ elem.AnimateIn);
						$prevItem.addClass('animated '+ elem.AnimateIn);
						$nextItem.addClass('animated '+ elem.AnimateIn);
					}
				},
			});

		});

		/* Search button */
		var $searchHeader = $('.search-btn'), 
			$search = $searchHeader.find('.topSearchForm');

		//if search is present in header then add events
		if($search.length > 0){

			$searchHeader.off().on('click', function(e) {
				var self = $(this),
					$search = self.find('.topSearchForm');

				self.toggleClass('color');
				$search.toggleClass('show');

				setTimeout( function() { $search.find('input').focus(); }, 300 );
				

				e.preventDefault();
				e.stopPropagation();
			});

			$search.off().on('click', function(e) {
       			e.stopPropagation();
			});

			$(document).on('click', function(e) {								
					$search.removeClass('show');
					$searchHeader.removeClass('color');
			});
		}

		//Woo DropDown
		woo_drop_down();

		/* Sticky Header */		
		var $headerCon = $('.header-con.pix-sticky-header');
		if($headerCon.length > 0){
			$headerCon.waypoint('sticky', {
				offset: -($('.header-wrap').height()+330)
			});
		}
		

		var $elem = $('.pix-animate-cre');

		$elem.each(function(){
			var $singleElement = $(this);

			// Get data-attr from element
			var animateTrans = $singleElement.data('trans') ? $singleElement.data('trans') : 'fadeIn';
			var animateDelay = $singleElement.data('delay') ? $singleElement.data('delay') : '';
			var animateDuration = $singleElement.data('duration') ? $singleElement.data('duration') : '';

				if(animateDelay != ''){
					$singleElement.css('animation-delay', animateDelay);
				}

				if(animateDuration != ''){
					$singleElement.css('animation-duration', animateDuration);
				}

				$singleElement.waypoint(function() {
					if ($singleElement.hasClass('animated ' + animateTrans)) return;
					$singleElement.css('opacity','1').addClass('animated '+ animateTrans);

				},
				{
					offset: '70%',
					triggerOnce: true
				});
	   });
		
		/* Isotope js */ 
		// cache container
		var $container = $('.portfolio-contents'),
			$portExtend = $('#portfolio-page.container-extend');
		// initialize isotope
		
		if($portExtend.length > 0 ){
			$portExtend.css('max-width', $(window).width());
		}

		$container.isotope({
		    layoutMode: 'packery',
		    percentPosition: true,
			itemSelector : '.element',
		});

		var  $masonryContainer = $('.blog-isotope'), $filterCon = $("#filters");
		$masonryContainer.isotope({
		    layoutMode: 'packery',
		    percentPosition: true,
			itemSelector : '.element',
		});

		// filter items when filter link is clicked
		$('#filters a').click(function(){
			var $this = $(this),
				$filter = $this.parents('#filters');

			if($filter.hasClass('dropdown')){
				$filter.slideUp(400, function(){
					$this.parent('li').css('display', 'none');
					$this.parent('li').siblings().css('display', 'block');
				});
				$filter.prev('.top-active').find('.txt').text($this.text());
			}

			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
				return false;
			}
			
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');



			var selector = $(this).attr('data-filter');
			// $container.isotope({ filter: selector });
			$(this).parents('.loadmore-wrap').find('.portfolio-contents').isotope({ filter: selector });
			$masonryContainer.isotope({ filter: selector });
			return false;
		});

		// Contant Form validate form on keyup and submit
		$(".contactform").validate({
			rules: {
				contactname: {
					required: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true
				},
				subject: {
					required: true,
					minlength: 2
				},
				message: {
					required: true,
					minlength: 10
				}
			},
			messages: {
				contactname: {
					required: rigel_notice.nameError ,
					minlength: jQuery.format(rigel_notice.nameLenError)
				},
				email: {
					required: rigel_notice.emailError,
					email: rigel_notice.emailLenError
				},
				subject: {
					required: rigel_notice.subjectError ,
					minlength: jQuery.format(rigel_notice.subjectLenError)
				},
				message: {
					required: rigel_notice.messageError ,
					minlength: jQuery.format(rigel_notice.messageLenError)
				}
			},
			// set this class to error-labels to indicate valid fields
			success: function(label) {
				label.addClass("checked");
			},
			submitHandler: function() {

				console.log('hello');
				
				$('.contactform').prepend('<p class="loaderIcon"><img src="'+ rigel.templateurl +'/_img/AjaxLoader.gif" alt="Loading..."></p>');
				var name = $('input#contactname').val();
				var email = $('input#email').val();
				var subject = $('input#subject').val();
				var message = $('textarea#message').val();

				$.ajax({
					type: 'post',
					url: rigel_notice.ajaxurl,
					//data: 'contactname=' + name, + '&email=' + email + '&subject=' + subject + '&message=' + message,
					data: {
						action      :   'rigel_submit_form',
						contactname :   name,
						email       :   email,
						subject     :   subject,
						message     :   message,
						sendto      :   rigel.email,
						nonce       :   rigel.nonce
					},
				}).done(function(results) {
					console.log( results );
					$('.contactform p.loaderIcon').fadeOut(1000);
					$('.contactform div.response').html(results);
					$('html, body').animate({
						scrollTop: ($(".contactform").offset().top - 111)
					}, 400);
				});

				$(':input','.contactform').not(':button, :submit, :reset, :hidden').val('');

			}
		});


		/*
		 * Ajax Load More Items: Portfolio Shortcode and Blog Page
		*/
		$('.loadBtn').on('click', function (e) {
			e.preventDefault();

			if($(this).hasClass('disabled')) {
				return;
			}

			//Disabled when button was clicked
			$(this).addClass('disabled');

			//Add class to container
			var $loadContent = $(this).parents('.load-content');
			$loadContent.addClass('load-container');
			$loadContent.siblings().removeClass('load-container');

			//Set data id for portfolio shortcode
			var id = $('.load-container').find('.load-item').last().data('idcount');				

			//Get data values and assign as variables
			var page = $(this).data('page'),
				max = $(this).data('max'),
				action = $(this).data('action'),
				values = $(this).data('values'),
				type = $(this).data('type');

			//Set page count
			var addcount = page+1;

			if(addcount <= max) {
				var nextpage = addcount;
				$(this).data('page', nextpage);
			}

			//Build objects using data variables
			var obj = {
				ajaxurl: loadmore.ajaxurl,
				nextpage: nextpage,
				action: action,
				id: id,
				max: max,
				addcount: addcount,
				values: values,
				type: type
			};

			//Call loadItems funtion and pass objects as arguements
			loadItems(obj);
			
		});

		function loadItems(obj) {

			//Change loadmore text as loading text
			var $loadBtn = $('.load-container').find('.loadBtn'),
				loading_text = loadmore.loading_text;

			$loadBtn.text(loading_text).addClass('loading');

			//Get objects and assign in variables
			var ajaxurl = obj.ajaxurl,
				id = obj.id,
				nextpage = obj.nextpage,
				action = obj.action,
				max = obj.max,
				addcount = obj.addcount,
				values = obj.values,
				type = obj.type;

			$.ajax({
				url: ajaxurl,
				type: 'post',
				data: {
					'action'   : action,
					'nextpage' : nextpage,
					'id'	   : id,
					'values'   : values
				},
			})
			.done(function(result) {

				//Remove the disabled class after the page loads
				$loadBtn.removeClass('disabled');

				appendLoadItems(type, result);

				//Remove loadmore button if dont have any other posts
				if(addcount == max) {
					$loadBtn.css('display', 'none');
				}

				//Removing loaing class and revert button text as loadmore
				var loadmore_text = loadmore.loadmore_text;
				$loadBtn.text(loadmore_text).removeClass('loading');

			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		} 

		function appendLoadItems(type, result){

			//Assign variables
			var $loadContainer = $('.load-container');

			/*
			 * Portfolio Shortcode (It applies Portfolio Shortcode)
			 */

			if(type == 'portfolio-isotope') {

				//Trigger filter button to All
				$loadContainer.find('.sorter .all').trigger('click');
				
				//Append elements dynamically
				var $newItems = $(result);
				$loadContainer.find('.portfolio-contents').append( $newItems ).isotope( 'addItems', $newItems );

				$loadContainer.find('.portfolio-contents').isotope({
		    	 	 layoutMode: 'packery',
		    	 	 percentPosition: true,
					itemSelector : '.element',
				});
				$loadContainer.imagesLoaded(function(){
					$loadContainer.find('.portfolio-contents').isotope('layout');
				});

			}

			/*
			 * Blog Page (It applies for Blog Style: Masonry, Masonry with Sidebar, Grid, Grid with Sidebar)
			 */

			else if(type == 'blog-isotope') {
				var $newItems = $(result);
				$loadContainer.find('.blog-isotope').append( $newItems ).isotope( 'addItems', $newItems );

				$loadContainer.find('.blog-isotope').isotope({
		    	 	 layoutMode: 'packery',
		    	 	 percentPosition: true,
					itemSelector : '.element',
				});

				var $elem = $('.pix-animate-cre');

				$elem.each(function(){
					var $singleElement = $(this);

					// Get data-attr from element
					var animateTrans = $singleElement.data('trans') ? $singleElement.data('trans') : 'fadeIn';
					var animateDelay = $singleElement.data('delay') ? $singleElement.data('delay') : '';
					var animateDuration = $singleElement.data('duration') ? $singleElement.data('duration') : '';

						if(animateDelay != ''){
							$singleElement.css('animation-delay', animateDelay);
						}

						if(animateDuration != ''){
							$singleElement.css('animation-duration', animateDuration);
						}

						$singleElement.waypoint(function() {
							if ($singleElement.hasClass('animated ' + animateTrans)) return;
							$singleElement.css('opacity','1').addClass('animated '+ animateTrans);

						},
						{
							offset: '70%',
							triggerOnce: true
						});
			   	});
			}

			/*
			 * Testimonial Page (It applies for Testimonial)
			 */

			else if(type == 'testimonial') {
				$loadContainer.find('.load-item').last().after(result);
			}

			/*
			 * Blog Page (It applies for Blog Style: Normal, Normal with Sidebar)
			 */

			else {
				$loadContainer.find('.load-item').last().after(result);
			}

		} // Ajax Load More Items	

	};

	$(window).load(function() {		

		afterPageLoad();

		if($('body').hasClass('pix-preloader-enabled')) {

			$('#preloader-con').fadeOut(function(){
				//$mainCon.fadeIn(500);
				var trans = $main.data('preloadtrans');
				$main.removeClass().addClass('animated ' + trans);
				$('body').delay(750).removeClass('pix-preloader-enabled');
				$('body').height( 'auto' );
			});

			$('.main-nav').on("click", 'a:not(.noajax, [href=""], [href^="#"], [href*="wp-login"], [href*="wp-admin"])', preloaderShow );

			$('#logo').on("click", 'a:not(.noajax, [href=""], [href^="#"], [href*="wp-login"], [href*="wp-admin"])', preloaderShow );

		}

		$('.main-nav').each(function(){
			var navHtml = $(this).html();
			$('.mobile-menu-nav .mobile-menu-inner').append(navHtml);
		});

		$('.mobile-menu-nav li.menu-item-has-children').on('click', '.pix-dropdown-arrow', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$(this).next('ul').stop().slideToggle();
			$(this).toggleClass('pix-bottom-arrow');
		});

		$('.mobile-menu-nav').singlePageNav({
			currentClass: 'current-menu-item',
			offset: 60,
			filter: ':not(.external)',
			updateHash: false,
			beforeStart: function() {
				$('.pix-menu-trigger').trigger('click');
			}
		});

		// Load More
		var $loadMoreBtn = $( '.load-more-btn' );

		if ( $loadMoreBtn.length ) {

			if ( $loadMoreBtn.hasClass( 'amz-autoload') ) {

				$( window ).on('scroll', function() { 

					if( $( window ).scrollTop() >= $( '.load-container' ).offset().top + $( '.load-container' ).outerHeight() - window.innerHeight ) { 

						if( $loadMoreBtn.hasClass('done-loading') || $loadMoreBtn.hasClass( 'disabled' ) ) {
							return;
						}

						$loadMoreBtn.find('a').trigger('click');

					}

				});
			}

			$( '.load-more-btn' ).on( 'click', 'a', function(e) {
				e.preventDefault();
				
				loadMore( $(this) );
				
			});
		}

	});

	//Back To Top
	$("#back-top").hide();

	$(window).scroll(function(){

		var scrollTopVal = $(this).scrollTop();
		
		if($(this).scrollTop()>100){
			$("#back-top").fadeIn();
		}else{
			$("#back-top").fadeOut();
		}
	});

	$("#back-top a").click(function(){
		$("body,html").animate({
			scrollTop:0},800);
			return false;
	});

	/* End of Header Scripts */

	init();

        $(".typed").each(function(){

		var str = $(this).data('strings');

	    if ( str ) {
	    	str = str.split(",");
	    	$(this).typed({
	    	    strings: str,
	    	    //stringsElement: $('.typed-strings'),
	    	    typeSpeed: ( typeof ( $(this).data( 'type-speed' ) ) == 'undefined' ) ? '50' : $(this).data( 'type-speed' ),
	    	    backDelay: ( typeof ( $(this).data( 'back-delay' ) ) == 'undefined' ) ? '700' : $(this).data( 'back-delay' ),
	    	    loop: ( typeof ( $(this).data( 'loop' ) ) == 'undefined' ) ? true : $(this).data( 'loop' ),
		        showCursor: ( typeof ( $(this).data( 'cursor' ) ) == 'undefined' ) ? true : $(this).data( 'loop' ),
	    	    //contentType: 'html', // or text
	    	});
	    }
		
	});
   
        $(".reset").click(function(){
               $(".typed").typed('reset');
        });


	/*----------------------------------------------------
	/* Make all anchor links smooth scrolling
	/*--------------------------------------------------*/
	jQuery(document).ready(function($) {
	
		// scroll handler
		var scrollToAnchor = function( id, event ) {
			// grab the element to scroll to based on the name
			var elem = $("a[name='"+ id +"']");
			// if that didn't work, look for an element with our ID
			if ( typeof( elem.offset() ) === "undefined" ) {
				elem = $("#"+id);
			}
			// if the destination element exists
			if ( typeof( elem.offset() ) !== "undefined" ) {
				// cancel default event propagation
				event.preventDefault();
				var scroll_to = elem.offset().top;
				// do the scroll
				$('html, body').animate({
					scrollTop: scroll_to
				}, 600, 'swing', function() { if (scroll_to > 46) window.location.hash = id; } );
			}
		};
		
		// bind to click event
		$("a.scroll-to, .scroll-to a, .btn").click(function( event ) {
			// only do this if it's an anchor link
			var href = $(this).attr("href");
			if ( href.match("#") && href !== '#' && $(this).parents(".tabs").length !== 1 ) {
				// scroll to the location
				var parts = href.split('#'),
					url = parts[0],
					target = parts[1];
			if ((!url || url == window.location.href.split('#')[0]) && target)
				scrollToAnchor( target, event );
			}
		});
	}); 
	
})(jQuery);
