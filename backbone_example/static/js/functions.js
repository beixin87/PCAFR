

// If JavaScript is enabled remove 'no-js' class and give 'js' class
jQuery('html').removeClass('no-js').addClass('js');

// Add .osx class to html if on Os/x
if (navigator.appVersion.indexOf("Mac") !== -1) {
	jQuery('html').addClass('osx');
}
// When DOM is fully loaded
jQuery(document).ready(function($) {


// External links   
	(function() {
	    $(window).load(function() {
			$('a[rel=external]').attr('target','_blank');	
		});                                            
	})(); 
    
// Tooltips		
	(function() {
    $('body').tooltip({
        delay: { show: 300, hide: 0 },
        selector: '[data-toggle=tooltip]:not([disabled])'
    });
  })(); 
  
// 	PRETTYPHOTO 
$('a[data-rel]').each(function() {
			$(this).attr('rel', $(this).data('rel'));
		});
$("a[rel^='prettyPhoto']").prettyPhoto({animation_speed: 'normal', slideshow: 5000, autoplay_slideshow: false, social_tools: false, deeplinking:false}); 

// Accordion 


$(function() {

    $('.accordion').on('show', function (e) {
         $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('accordion-active');
    });
    
    $('.accordion').on('hide', function (e) {
        $(this).find('.accordion-toggle').not($(e.target)).removeClass('accordion-active');
    });
        
});


// banner overlay hide/show text 
   (function () {
        $(".img-container-image-3").hover(
            function () {
                $(this).find('.overlay').slideDown('slow');
            },
            function () {
                $(this).find('.overlay').stop().slideUp('slow');
            }
        );
    })();


$(window).load(function(){    
  $('.bar').css('width',  function(){ return ($(this).attr('data-percentage')+'%')});
});
    

 // scrollable content 
$(window).load(function(){
  $(".scrollable").mCustomScrollbar({
    theme:"dark",
    scrollButtons:{
	   enable:false
	},
  horizontalScroll:true,		
  advanced:{

    autoExpandHorizontalScroll:true
  }   
  });
});


// back to top 

		$('.back-to-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});


  
var detectmob = false;	
  if(navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {							
      detectmob = true;
	}


	if (detectmob === true) {
    $( '.parallax' ).each(function(){
				$(this).addClass('parallax-mobile');
		});
  }
  else {
      $( '#parallax-one' ).parallax();
      $( '#parallax-two' ).parallax();
    }
 

// Nivo slider   
 $(window).load(function() {
 
      $('#slider-nivo').nivoSlider({
        effect: 'random', // Specify sets like: 'fold,fade,sliceDown'
        slices: 15, // For slice animations
        boxCols: 8, // For box animations
        boxRows: 4, // For box animations
        animSpeed: 700, // Slide transition speed
        pauseTime: 9000, // How long each slide will show
        startSlide: 0, // Set starting Slide (0 index)
        directionNav: true, // Next & Prev navigation
        controlNav: false, // 1,2,3... navigation
        controlNavThumbs: false, // Use thumbnails for Control Nav
        pauseOnHover: true, // Stop animation while hovering
        manualAdvance: false, // Force manual transitions
        prevText: '', // Prev directionNav text
        nextText: '', // Next directionNav text
        randomStart: false // Start on a random slide        
      });
      
  jQuery('.center .nivo-directionNav a.nivo-nextNav').html('<i class="icon-angle-right"></i>');
  jQuery('.center .nivo-directionNav a.nivo-prevNav').html('<i class="icon-angle-left"></i>');
  jQuery('.bottom .nivo-directionNav a.nivo-nextNav').html('<i class="icon-angle-right"></i>');
  jQuery('.bottom .nivo-directionNav a.nivo-prevNav').html('<i class="icon-angle-left"></i>');
  
});




// Mobile menu 

selectnav('nav', {
  label: '---请选择---',
  nested: true,
  indent: '-'
});

// Fitvids 
$(window).load(function() {
  $("body").fitVids();
}); 


//	 Portfolio  
   (function() {
		$(window).load(function(){
			// container
			var $container = $('#portfolio-items');
			function filter_projects(tag)
			{
			  // filter projects
			  $container.isotope({ filter: tag });
			  // clear active class
			  $('li.act').removeClass('act');
			  // add active class to filter selector
			  $('#portfolio-filter').find("[data-filter='" + tag + "']").parent().addClass('act');
			  // update location hash
			  if (tag!='*') {}
				  // window.location.hash=tag.replace('.','');
			  if (tag=='*') {}
			  	//window.location.hash='';
			}
			if ($container.length) {
				// convert data-tags to classes
				$('.project').each(function(){
					$this = $(this);
					var tags = $this.data('tags');
					if (tags) {
						var classes = tags.split(',');
						for (var i = classes.length - 1; i >= 0; i--) {
							$this.addClass(classes[i]);
						};
					}
				})
				// initialize isotope
				$container.isotope({
				  // options...
				  itemSelector : '.project',
				  layoutMode   : 'fitRows'
				});
				// filter items
				$('#portfolio-filter li a').click(function(){
					var selector = $(this).attr('data-filter');
					filter_projects(selector);
					return false;
				});
				// filter tags if location.has is available. e.g. http://example.com/work.html#design will filter projects within this category
				if (window.location.hash!='')
				{
					filter_projects( '.' + window.location.hash.replace('#','') );
				}
			}
		})

	})();
 
 

 // main shop index slider
  
  $(window).load(function() {
  
  // index-6 shop slider 
  $('.rs-slider').refineSlide({
  
    maxWidth              : 1200,      // Max slider width - should be set to image width
    transition            : 'cubeH',  // String (default 'cubeV'): Transition type ('custom', random', 'cubeH', 'cubeV', 'fade', 'sliceH', 'sliceV', 'slideH', 'slideV', 'scale', 'blockScale', 'kaleidoscope', 'fan', 'blindH', 'blindV')
    fallback3d            : 'random', // String (default 'sliceV'): Fallback for browsers that support transitions, but not 3d transforms (only used if primary transition makes use of 3d-transforms)
    customTransitions     : [],       // Arr (Custom transitions wrapper)
    perspective           : 1000,     // Perspective (used for 3d transforms)
    useThumbs             : true,     // Bool (default true): Navigation type thumbnails
    useArrows             : false,    // Bool (default false): Navigation type previous and next arrows
    thumbMargin           : 3,        // Int (default 3): Percentage width of thumb margin
    autoPlay              : false,    // Int (default false): Auto-cycle slider
    delay                 : 5000,     // Int (default 5000) Time between slides in ms
    transitionDuration    : 800,      // Int (default 800): Transition length in ms
    startSlide            : 0,        // Int (default 0): First slide
    keyNav                : true,     // Bool (default true): Use left/right arrow keys to switch slide
    captionWidth          : 50,       // Int (default 50): Percentage of slide taken by caption
    arrowTemplate         : '<div class="rs-arrows"><a href="#" class="rs-prev"></a><a href="#" class="rs-next"></a></div>', // String: The markup used for arrow controls (if arrows are used). Must use classes '.rs-next' & '.rs-prev'
    onInit                : function () {}, // Func: User-defined, fires with slider initialisation
    onChange              : function () {}, // Func: User-defined, fires with transition start
    afterChange           : function () {}  // Func: User-defined, fires after transition end
  });



  // shop product slider small

  $('.shop-product-slider').refineSlide({
    maxWidth              : 768,      // Max slider width - should be set to image width
    transition            : 'random',  // String (default 'cubeV'): Transition type ('custom', random', 'cubeH', 'cubeV', 'fade', 'sliceH', 'sliceV', 'slideH', 'slideV', 'scale', 'blockScale', 'kaleidoscope', 'fan', 'blindH', 'blindV')
    fallback3d            : 'random', // String (default 'sliceV'): Fallback for browsers that support transitions, but not 3d transforms (only used if primary transition makes use of 3d-transforms)
    perspective           : 1000,     // Perspective (used for 3d transforms)
    useThumbs             : true,     // Bool (default true): Navigation type thumbnails
    thumbMargin           : 1,        // Int (default 3): Percentage width of thumb margin
    autoPlay              : false,    // Int (default false): Auto-cycle slider
    delay                 : 9000,     // Int (default 5000) Time between slides in ms
    transitionDuration    : 800,      // Int (default 800): Transition length in ms
    startSlide            : 0,        // Int (default 0): First slide
    keyNav                : true,     // Bool (default true): Use left/right arrow keys to switch slide
    captionWidth          : 50       // Int (default 50): Percentage of slide taken by caption
  });

    //main slider

  $('.main-slider-direct-nav').refineSlide({
    maxWidth              : 1200,      // Max slider width - should be set to image width
    transition            : 'random',  // String (default 'cubeV'): Transition type ('custom', random', 'cubeH', 'cubeV', 'fade', 'sliceH', 'sliceV', 'slideH', 'slideV', 'scale', 'blockScale', 'kaleidoscope', 'fan', 'blindH', 'blindV')
    fallback3d            : 'random', // String (default 'sliceV'): Fallback for browsers that support transitions, but not 3d transforms (only used if primary transition makes use of 3d-transforms)
    customTransitions     : [],       // Arr (Custom transitions wrapper)
    perspective           : 1000,     // Perspective (used for 3d transforms)
    useThumbs             : false,     // Bool (default true): Navigation type thumbnails
    useArrows             : true,    // Bool (default false): Navigation type previous and next arrows
    thumbMargin           : 3,        // Int (default 3): Percentage width of thumb margin
    autoPlay              : false,    // Int (default false): Auto-cycle slider
    delay                 : 5000,     // Int (default 5000) Time between slides in ms
    transitionDuration    : 800,      // Int (default 800): Transition length in ms
    startSlide            : 0,        // Int (default 0): First slide
    keyNav                : true,     // Bool (default true): Use left/right arrow keys to switch slide
    captionWidth          : 50,       // Int (default 50): Percentage of slide taken by caption
    arrowTemplate         : '<div class="rs-arrows"><a href="#" class="rs-prev"></a><a href="#" class="rs-next"></a></div>', // String: The markup used for arrow controls (if arrows are used). Must use classes '.rs-next' & '.rs-prev'
    onInit                : function () {}, // Func: User-defined, fires with slider initialisation
    onChange              : function () {}, // Func: User-defined, fires with transition start
    afterChange           : function () {}  // Func: User-defined, fires after transition end

  });
  jQuery('.rs-arrows .rs-next').html('<i class="icon-angle-right"></i>');
  jQuery('.rs-arrows .rs-prev').html('<i class="icon-angle-left"></i>');

}); 
 
 
 

// FlexSlider 

  $(window).load(function() {

  $('.blog-slider-2').flexslider({
    animationLoop: false,
		animation: 'slide',
    useCSS : false
	 });     

    //slider top navigation
    
  $('.top-nav-shop-slider').flexslider({
    animation: 'slide',
    animationLoop: false,
    directionNav: true,
    controlNav: false,
    slideshow: false,
    useCSS : false,
    itemWidth: 270,
    itemMargin: 30,
    minItems: 1,
    maxItems: 5,
    move: 1		
  });
  jQuery('.top-nav-shop-slider .flex-direction-nav .flex-next').html('<i class="icon-angle-right"></i>');
  jQuery('.top-nav-shop-slider .flex-direction-nav .flex-prev').html('<i class="icon-angle-left"></i>'); 



  $('.top-nav-content-slider').flexslider({
    animation: "slide",
    slideshow: false,
    useCSS : false,
    animationLoop: false 	
  });
 
  jQuery('.top-nav-content-slider .flex-direction-nav .flex-next').html('<i class="icon-angle-right"></i>');
  jQuery('.top-nav-content-slider .flex-direction-nav .flex-prev').html('<i class="icon-angle-left"></i>'); 
    
   // clients slider 
  $('.slider4').flexslider({
    animationLoop: false,
		animation: 'slide',
    useCSS : false
	});
    
});   


  
// color picker
  
$(".blue" ).click(function(){
	$("#color" ).attr("href", "css/colors/blue.css" );
	return false;
});

    
$(".green" ).click(function(){
	$("#color" ).attr("href", "css/colors/green.css" );
	return false;
});
    
$(".orange" ).click(function(){
	$("#color" ).attr("href", "css/colors/orange.css" );
	return false;
});

$(".orange-light" ).click(function(){
	$("#color" ).attr("href", "css/colors/orange-light.css" );
	return false;
});

$(".olive" ).click(function(){
	$("#color" ).attr("href", "css/colors/olive.css" );
	return false;
});

$(".violet" ).click(function(){
	$("#color" ).attr("href", "css/colors/violet.css" );
	return false;
});

$(".dark-blue" ).click(function(){
	$("#color" ).attr("href", "css/colors/dark-blue.css" );
	return false;
});

$(".yellow" ).click(function(){
	$("#color" ).attr("href", "css/colors/yellow.css" );
	return false;
});


$(".bg-white" ).click(function(){
  $("#bg" ).attr("href", "css/style.css" );
	return false;
});

$(".bg-dark" ).click(function(){
  $("#bg" ).attr("href", "css/style-dark.css" );
  
	return false;
});


 $('.color-picker').animate({right: '0px'});
  		
$('.color-picker a.handle').click(function(e){
	e.preventDefault();
	var div = $('.color-picker');
	if (div.css('right') === '0px') {
		$('.color-picker').animate({right: '-239px'}); 
	} 
  else {
    $('.color-picker').animate({right: '0px'});
	}
})

}); 