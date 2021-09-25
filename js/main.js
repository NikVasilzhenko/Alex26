$(document).ready(function () {
	/*feedback menu*/
	function feedbackOpen(){
		$('body').addClass('feedback-open');
		categoryNavClose();
	}
	function feedbackClose(){
		$('body').removeClass('feedback-open');
	}
	
	/*mob menu*/
	function mobMenuOpen(){
		$('.header-hamburger').addClass('effect-x');
		$('#js-nav-menu').addClass('show');
		$('body').addClass('mob-menu-open');
		categoryNavClose();
		$('#js-nav-trigger').fadeOut(250);
	}
	function mobMenuClose(){
		$('.header-hamburger').removeClass('effect-x');
		$('#js-nav-menu').removeClass('show');
		$('#js-nav-menu').addClass('hide');
		$('#js-nav-menu').removeClass('hide');
//		function menuHide(){
//			$('#js-nav-menu').removeClass('hide');
//		}
//		setTimeout(
//			menuHide, 800
//		);
		$('body').removeClass('mob-menu-open');
		$('.menu__item').removeClass('open');
		$('.menu__sub').hide();
		$('#js-nav-trigger').fadeIn(250);
	}
	function mobMenuToggle(){
		categoryNavClose();
		$('.header-hamburger').toggleClass('effect-x');	
		var menu = $('#js-nav-menu');
		if(menu.hasClass('show')){
			menu.removeClass('show');
			menu.addClass('hide');
			function menuHide(){
				menu.removeClass('hide');
				$('body').toggleClass('mob-menu-open');
				$('.menu__item').removeClass('open');
				$('.menu__sub').hide()
			}
			setTimeout(
				menuHide, 800
			);
		} else{
			menu.addClass('show');	
			$('body').toggleClass('mob-menu-open');
		}
		$('#js-nav-trigger').fadeToggle(250);
	}
	
	$('.js-feedback-btn').on('click', function(){
		feedbackOpen();
		mobMenuClose();
	});
	$('.header-hamburger').on('click', function(){
		mobMenuToggle();
		feedbackClose();
	});
	$('.js-feedback-overlay').on('click', function(){
		feedbackClose();
	});
	$('.js-feedback-close').on('click', function(){
		feedbackClose();
	});
    $('.menu__item-link.collapse').on('click', function(){
		if($(window).width > 1024){
			$('.menu__item-link.collapse').siblings('.menu__sub').hide().closest('.menu__item').removeClass('open');
			$(this).siblings('.menu__sub').slideDown(250).closest('.menu__item').addClass('open');
		} else{
			if($(this).closest('.menu__item').hasClass('open')){
				$('.menu__item-link.collapse').siblings('.menu__sub').slideUp(250).closest('.menu__item').removeClass('open');
			} else{
				$('.menu__item-link.collapse').siblings('.menu__sub').slideUp(250).closest('.menu__item').removeClass('open');
				$(this).siblings('.menu__sub').slideDown(250).closest('.menu__item').addClass('open');
			}			
		}
		
	});
	
	/*search*/
	//показать контейнер с результатами поиска
	function showSearcRes(){
		$('#js-searc-res').show();
	}
	$('#js-search').on('focus', function(){
		$('body').addClass('search-focused');
		showSearcRes();
	});
	$('#js-search-close').on('click', function(){
		$('body').removeClass('search-focused');
		$('#js-searc-res').hide();
	});
	
	/*media popup*/
    if($('#js-media-popup').length){
        var iframe = $('#js-media-container');
        
        $('.js-blind').on('click', function(e){
			e.preventDefault();
            $('#js-media-popup').fadeIn(250); 
            var srcAttr = $(this).attr('data-href');
            var elem = $('<iframe>',{     
                src : srcAttr + "?autohide=1&amp;autoplay=1",
                frameborder : "0",
                allowfullscreen : ""});
            iframe.prepend(elem);
        });
        
        $('.js-media-popup-close').on('click', function(){
            $('#js-media-popup').fadeOut(250);
            iframe.find('iframe').remove();
        });
    }
	
	/*category nav*/
	function categoryNavClose(){
		$('body').removeClass('cat-menu-open');
		$('#js-nav-wrap').slideUp(350);
	}
	$('#js-nav-trigger').on('click', function(){
		$('body').toggleClass('cat-menu-open');
		$('#js-nav-wrap').slideToggle(350);
	});
	
	/*form-group-hiddden*/
	$('.js-form-control').on('focus', function(){
		$('#js-form-group-hiddden').slideDown(500);
	});
	
	/*flors hint*/
	$('#js-build-shem').on("mousemove",function(e){
		$('#js-build-hint').attr("style", "top: "+ (e.pageY - 3) +"px; left: "+ (e.pageX + 3) +"px;");
		$('.js-floor-link').on("mousemove",function(e){
			$('#js-build-hint').addClass('is-active');
			$('#js-hint-floor').html($(this).attr('data-floor'));
			$('#js-hint-apartments').html($(this).attr('data-apartments'));
		});
		$('.js-floor-link').on("mouseout",function(e){
			$('#js-build-hint').removeClass('is-active');
		});
		
		$('.js-floor-link').on('click', function(e){
			e.preventDefault();
			cardSwiper.slideTo( ($(this).attr('data-floor'))-1, 0);
		})
	});
	
	/*hidden panel*/
	function hiddenPanelOpen(){
		$('body').addClass('hidden-panel-open');
		$('#js-build-hidden-panel-wrap').addClass('open');
		$('#js-build-hidden-panel-overlay').fadeIn(700);		
	}
	function hiddenPanelClose(){
		$('body').removeClass('hidden-panel-open appart-panel-open');
		$('#js-build-hidden-panel-wrap').removeClass('open');
		$('#js-build-hidden-panel-overlay').fadeOut(700);
		function removeFilterClass(){
			$('body').removeClass('filter-panel-open')
		}
		setTimeout(removeFilterClass, 700)
	}
	
	$('.js-floor-link').on('click', function(e){
		hiddenPanelOpen();
	});
	$('.js-build-hidden-panel-close').on('click', function(e){
		hiddenPanelClose();
	});
	
	/*flor card*/
	$('.js-addebly-appart').on('mouseover', function(){
		$('#js-flor-card-tab').addClass('show');
		$('#js-flor-cards-appartnumb').html($(this).attr('data-appartnumb'));
		$('#js-flor-cards-rooms').html($(this).attr('data-rooms'));
		$('#js-flor-cards-area').html($(this).attr('data-area'));
		$('#js-flor-cards-combine').html($(this).attr('data-combine'));
	});
	
	/*appart card*/
	function appartCardOpen($this){		
		var flor = $this.attr('data-flor'),
			appartnumb = $this.attr('data-appartnumb'),
			area = $this.attr('data-area'),
			combine = $this.attr('data-combine'),
			rooms = $this.attr('data-rooms'),
			numbinflor = $this.attr('data-numbinflor'),
			price = $this.attr('data-price'),
			pdf = $this.attr('data-pdf'),
			pic = $this.attr('data-pic');
		$('#js-appart-card-appartnumb').html(appartnumb);
		$('#js-appart-card-title-rooms').add('#js-appart-card-rooms').html(rooms);
		$('#js-appart-card-area').html(area);
		$('#js-appart-card-flor').html(flor);
		$('#js-appart-card-price').html(price);
		$('#js-appart-card-btn').on('click', function(){
			$('.form.feedback__form textarea').val('Добрый день! Интересует предложение по квартире №' + appartnumb);
			feedbackOpen();
		});
		$('#js-appart-card-pic').attr('src', pic);
		$('#js-appart-link-pdf').attr('href', pdf);
		$('#js-appart-link-print').attr('href', pdf + '&print=y');
		if(flor >= 19){
			$('#js-flor-cards-plan-19-24').addClass('active').siblings().removeClass('active');
		} else if(flor >= 11){
			$('#js-flor-cards-plan-11-18').addClass('active').siblings().removeClass('active');
		} else{
			$('#js-flor-cards-plan-1-10').addClass('active').siblings().removeClass('active');
		}
		$('.appart-card__small-shem .flor-cards-plan').removeClass('active-appart-1 active-appart-2 active-appart-3 active-appart-4 active-appart-5 active-appart-6 active-appart-7');
		$('.appart-card__small-shem .flor-cards-plan.active').addClass('active-appart-' + numbinflor);
		
		$('body').addClass('appart-panel-open');
	}
	function appartCardClose(){
		$('body').removeClass('appart-panel-open');
	}
	
	$('.js-addebly-appart').on('click', function(){			
		appartCardOpen($(this));
	});
	$('.js-build-hidden-panel-back').on('click', function(){
		appartCardClose();
	});
	
	/*filter*/
	function filterOpen(){
		$('body').addClass('filter-panel-open hidden-panel-open');
		$('#js-build-hidden-panel-overlay').fadeIn(700);
		$('#js-build-hidden-panel-wrap').addClass('open');
	}
	$('.js-filter-open').on('click', function(){
		filterOpen();
	})
	
	if($('#js-build-hidden-panel-wrap').length){
		function momResizePanelOpen(){
			if($(window).width() < 768){		
				$('body').addClass('hidden-panel-open filter-panel-open');
			}
		}
		momResizePanelOpen();
		$(window).on('resize', function(){
			momResizePanelOpen();
		})	
	}
	
	/*gallery*/
	$('.js-gallery-btn').on('click', function(){
		$(this).closest('.js-gallery-item').find('.js-gallery-popup').toggleClass('show');
	});
	
	/**/
	$('.js-req-btn').on('click', function(e){
		e.preventDefault();
		$('#js-map-page-bar-req').toggleClass('open');
	});
	
	/*feedback*/
	$('#js-feedback-check').on('change', function(){		
		if($(this).prop('checked')){
			$('#js-feedback-submit').prop('disabled', false);;
		} else{
			$('#js-feedback-submit').prop('disabled', true);;
		}
	});
	
	var telValid = false;
    $("#js-order-form-mask").mask("+7 (999) 99-99-999", {
        placeholder: "+7 (___) __-__-___" ,
        completed : function(){
            telValid = true;
        }
    });
	$('.js-form-val').on('submit', function(e){
    	e.preventDefault();
		
    	var form = $(this),
            fields = $(form).find('.js-val'),            
            valid = true;
    
            $.each($(fields), function(){
                if (!$.trim($(this).val())){
                    $(this).closest('.form-group').addClass('error');
                    valid = false;            
                } else {
                    $(this).closest('.form-group').removeClass('error');
                }
            });
    
            if (valid && telValid){
               $.ajax({
    				url: "#",
    				type: "POST",
    				response: "HTML",
    				data: $(this).serialize(),    
                    success: function(data) {
    					$(form).html("<div class='form-group__title' style='text-align: center; margin: 50px 0; font-family: 'Roboto Condensed', sans-serif;'>Спасибо! Ваша заявка принята</div>");          
                    },
    				error: function() {
    					console.log("Чтото пошло не так");
    				}
    			});
            } else if(!(telValid)){
				$('#js-order-form-mask').closest('.form-group').addClass('error');
			}
        });
    $('.js-val').on('keypress', function(){
        $(this).closest('.form-group').removeClass('error');
    });
	
	//accordion
	$('.js-accordion-name').on('click', function(){
		if($(this).hasClass('open')){
			$(this).removeClass('open').next('.js-accordion-main').slideUp(250);
		} else{
			$('.js-accordion-name').removeClass('open').next('.js-accordion-main').slideUp(250);
			$(this).addClass('open').next('.js-accordion-main').slideDown(250);
		}
	})
});