/*sviper*/
if (Modernizr.touch){
   touchIs = true;
} else {
   touchIs = false;
}
var swiperH = new Swiper('#js-index-page-swiper', {
	direction: 'vertical',
	slidesPerView: 1,
	parallax: true,
	mousewheel: true,
	allowTouchMove: touchIs,
	allowSlideNext: true,
	allowSlidePrev: true,
	speed: 800,
	pagination: {
		el: '#js-index-page-swiper-pagination',
		clickable: true,
  	},
	navigation: {
      	nextEl: '.js-index-page-swiper-btn-next',
      	prevEl: '.js-index-page-swiper-btn-prev',
    },
	keyboard: {
      	enabled: true,
    },	
	on: {
		slideChange: function () {
			document.getElementById('js-index-page').classList.remove('slide-1');
			document.getElementById('js-index-page').classList.remove('slide-2');
			document.getElementById('js-index-page').classList.remove('slide-3');
			document.getElementById('js-index-page').classList.remove('slide-4');
			document.getElementById('js-index-page').classList.add('slide-' + (swiperH.activeIndex+1) );
			if(swiperH.activeIndex == 4){
				document.getElementById('js-index-page').classList.add('last');
			} else{
				document.getElementById('js-index-page').classList.remove('last');
			}
		},
		init: function(){
			document.getElementById('js-index-page').classList.add('slide-1');
		}
	},
	breakpoints: {
        1024: {
        	allowTouchMove: true,
        },
	}
});
var swiperV = new Swiper('.swiper-container-v', {
    direction: 'horizontal',
	allowTouchMove: touchIs,
	allowSlideNext: true,
	allowSlidePrev: true,
	speed: 800,
	slidesPerView: 'auto',	
	breakpoints: {
        1024: {
        	allowTouchMove: true,
        },
		767: {
        	allowTouchMove: false,
        },
	},
	on: {
		slideChange: function () {			
			if(swiperV.activeIndex != 0){
				document.getElementById('js-index-page').classList.add('under');
				swiperH.allowSlideNext = false;
				swiperH.allowSlidePrev = false;
			} else{
				document.getElementById('js-index-page').classList.remove('under');
				swiperH.allowSlideNext = true;
				swiperH.allowSlidePrev = true;
			}
		},
	},
});

function nextSlideBtn(){
	var activeSlide = swiperH.activeIndex;
	swiperV[activeSlide].slideNext();
	document.getElementById('js-index-page').classList.add('under');
	swiperH.allowSlideNext = false;
	swiperH.allowSlidePrev = false;
}
function prevSlideBtn(){
	var activeSlide = swiperH.activeIndex;
	swiperV[activeSlide].slidePrev();
	console.log(swiperV[activeSlide].activeIndex)
	if(swiperV[activeSlide].activeIndex == 0){
		document.getElementById('js-index-page').classList.remove('under');
		swiperH.allowSlideNext = true;
		swiperH.allowSlidePrev = true;
	}
}
function firstSlideBtn(){
	var activeSlide = swiperH.activeIndex;
	swiperV[activeSlide].slideTo(0);
	document.getElementById('js-index-page').classList.remove('under');
	swiperH.allowSlideNext = true;
	swiperH.allowSlidePrev = true;
}

/*action page*/
function actionPageBtn(){
	document.getElementsByTagName('body')[0].classList.toggle('action-page-open');
}
/*article slider*/

if($('#js-article-slider').length){
	articleSliderInit();
}

function articleSliderInit(){
	if($(window).width()< 768){
		var swiper = new Swiper('#js-article-slider', {
			slidesPerView: 1,
			pagination: {
				el: '#js-article-slider-pagination',
				type: 'fraction',
			},
			navigation: {
				nextEl: '#js-article-slider-next',
				prevEl: '#js-article-slider-prev',
			},
		});
	}
}

//team slider
var swiper = new Swiper('#js-team-slider', {
	slidesPerView: 3,
	spaceBetween: 30,
	navigation: {
        nextEl: '#js-team-next',
        prevEl: '#js-team-prev',
    },
	breakpoints: {        
        1024: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
		768: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
	}
});


//flor card
var cardSwiper = new Swiper('#js-flor-cards-slider', {
	direction: 'vertical',
	pagination: {
        el: '#js-flor-cards-pagination',
        type: 'fraction',
	},
	navigation: {
        nextEl: '#js-flor-cards-next',
        prevEl: '#js-flor-cards-prev',
	},
});

//wow
new WOW().init();

//jQuery UI
$( function(){
	//flor
	if($('#js-slider-range-flor').length){
		var minFlor = $( "#js-slider-range-flor" ).attr('data-min'),
			maxFlor = $( "#js-slider-range-flor" ).attr('data-max'),
			minFlorVal = $( "#js-slider-range-flor" ).attr('data-minval'),
			maxFlorVal = $( "#js-slider-range-flor" ).attr('data-maxval'),
			florStep = $( "#js-slider-range-flor" ).attr('data-step');
		$("#js-slider-range-flor" ).slider({
			range: true,
			min: +minFlor,
			max: +maxFlor,
			step: +florStep,
			values: [ +minFlorVal, +maxFlorVal ],
			create: function() {
				$('#js-min-flor').appendTo($('#js-slider-range-flor a').get(0));
				$('#js-max-flor').appendTo($('#js-slider-range-flor a').get(1));
			},
			slide: function( event, ui ) {
				$(ui.handle).find('span').html(ui.value);
				$( "#js-slider-range-flor-start" ).val(ui.values[ 0 ]);
				$( "#js-slider-range-flor-end" ).val(ui.values[ 1 ] );
				$('.js-filter-item').each(function(){
					var thisFior = Number($(this).attr('data-flor'));
					if( (thisFior < $('#js-slider-range-flor-start').val()) || (thisFior > $('#js-slider-range-flor-end').val()) ){
						$(this).addClass('hide-flor');
					} else{
						$(this).removeClass('hide-flor');
					}
				});
				
			}
		});
		$('#js-min-flor').html($('#js-slider-range-flor').slider('values', 0)).position({
			my: 'center top',
			at: 'center bottom',
			of: $('#js-slider-range-flor a:eq(0)'),
			offset: "0, 10"
		});
		$('#js-max-flor').html($('#js-slider-range-flor').slider('values', 1)).position({
			my: 'center top',
			at: 'center bottom',
			of: $('#js-slider-range-flor a:eq(1)'),
			offset: "0, 10"
		});
		$( "#js-slider-range-flor-start" ).val( $( "#js-slider-range-flor" ).slider( "values", 0 ) );
		$( "#js-slider-range-flor-end" ).val( $( "#js-slider-range-flor" ).slider( "values", 1 ) );
	}	
	//aria
	if($('#js-slider-range-flor').length){
		var minAria = $( "#js-slider-range-aria" ).attr('data-min'),
			maxAria = $( "#js-slider-range-aria" ).attr('data-max'),
			minAriaVal = $( "#js-slider-range-aria" ).attr('data-minval'),
			maxAriaVal = $( "#js-slider-range-aria" ).attr('data-maxval'),
			ariaStep = $( "#js-slider-range-aria" ).attr('data-step');
		$( "#js-slider-range-aria" ).slider({
			range: true,
			min: +minAria,
			max: +maxAria,
			step: +ariaStep,
			values: [ +minAriaVal, +maxAriaVal ],
			create: function() {
				$('#js-min-aria').appendTo($('#js-slider-range-aria a').get(0));
				$('#js-max-aria').appendTo($('#js-slider-range-aria a').get(1));
			},
			slide: function( event, ui ) {
				$(ui.handle).find('span').html(ui.value);
				$( "#js-slider-range-aria-min" ).val(ui.values[ 0 ]);
				$( "#js-slider-range-aria-max" ).val(ui.values[ 1 ] );
				
				$('.js-filter-item').each(function(){
					var thisFior = Number($(this).attr('data-area'));
					if( (thisFior < $('#js-slider-range-aria-min').val()) || (thisFior > $('#js-slider-range-aria-max').val()) ){
						$(this).addClass('hide-area');
					} else{
						$(this).removeClass('hide-area');
					}
				});
			}
		});
		$('#js-min-aria').html($('#js-slider-range-aria').slider('values', 0)).position({
			my: 'center top',
			at: 'center bottom',
			of: $('#js-slider-range-aria a:eq(0)'),
			offset: "0, 10"
		});
		$('#js-max-aria').html($('#js-slider-range-aria').slider('values', 1)).position({
			my: 'center top',
			at: 'center bottom',
			of: $('#js-slider-range-aria a:eq(1)'),
			offset: "0, 10"
		});
		$( "#js-slider-range-aria-min" ).val( $( "#js-slider-range-aria" ).slider( "values", 0 ));
		$( "#js-slider-range-aria-max" ).val( $( "#js-slider-range-aria" ).slider( "values", 1 ) );
	}
	//rooms
	$('.js-room-check').on('change', function(){
		
		if($('.js-room-check:checked').length > 0){
			$('.js-filter-item').addClass('hide-room');
			$('.js-room-check').each(function(){
				if($(this).is(':checked')){
					$('.js-filter-item[data-rooms = '+ $(this).val() + ' ]').removeClass('hide-room');
				}	
			});
		} else{
			$('.js-filter-item').removeClass('hide-room');
		}
		

	});
});

//gallery
var swiper = new Swiper('.js-gallery-slider', {
	navigation: {
    	nextEl: '.gallery-swiper-button-next',
        prevEl: '.gallery-swiper-button-prev',
	},
	pagination: {
        el: '.gallery-swiper-pagination',
		clickable: true,
    },
});