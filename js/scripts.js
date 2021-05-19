document.addEventListener('DOMContentLoaded', function(){

	const isMobile = $(window).width() < 992;

	function is_touch_device() {
		try {
			document.createEvent("TouchEvent");
			return true;
		} catch (e) {
			return false;
		}
	}

	if(is_touch_device()){
		$('body').addClass('touch');
	} else{
		$('body').addClass('no-touch');
	}

	function getSelectedNames(items){
		let names = [];

		$(items).each(function(i, el){
			names.push( $(el).closest('.form-filter-button').find('label').text() );
		});

		return names;
	}

	$('.custom-select').each(function(i, el){
		let dropdown = $(el).find('.box-checkbox');

		$(el).find('.select-option-box').on('click', function(){
			$(el).toggleClass('opened');
		});

		$(el).find('input').on('change', function(){
			let names = getSelectedNames( $(dropdown).find('input:checked') );

			$(el).find('.selected-items').text( names.join(', ') );
		});
	});

	$('.form-box-select').each(function(i, el){
		$(el).find('.js-select-all').click(function(e){
			e.preventDefault();

			$(el).find('input:not(:checked)').click();
		});

		$(el).find('.js-select-none').click(function(e){
			e.preventDefault();

			$(el).find('input:checked').click();
		});
	});

	$(document).mouseup(function (e){
		var div = $(".form-box-select");
		if (!div.is(e.target)
			&& div.has(e.target).length === 0) {
			$('.custom-select').removeClass('opened');
		}
	});

	// Wow
	new WOW().init();

	$('.wow-random-delay').each(function(i, el){
		$(el).attr('data-wow-delay', '0.'+(Math.floor(Math.random() * 4 + 2))+'s');
	});

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	$('.applications-slider .slider-navs').slick({
		slidesToShow: 4,
		slidesToScroll: 0,
		arrows: false,
		infinite: true,
		speed: 500,
		autoplay: false,
		autoplaySpeed: 4000,
		focusOnSelect: true,
		asNavFor: ".slider-content"
	});

	$('.applications-slider .slider-content').slick({
		fade: true,
		infinite: true,
		speed: 500,
		arrows: false,
		draggable: true,
		swipe: false,
	});


	$('.slider__item[data-slide]').click(function(e) {
		e.preventDefault();

		$('.slider__item[data-slide]').removeClass('_active');
		$(this).addClass('_active');
		 		
		$('.applications-slider .slider-content').slick('slickGoTo', $(this).data('slide') - 1);
	});

	function changeActiveClassForCurrentSlide() {
		const currentSlide = $('.applications-slider .slider-content').slick('slickCurrentSlide');

		$('.slider__item[data-slide]').removeClass('_active');
		$(`.slider__item[data-slide='${currentSlide + 1}']`).addClass('_active');
	}

	$('.applications-slider .slick-prev-custom').on('click', () => {
		$('.applications-slider .slider-content').slick("slickPrev");
		changeActiveClassForCurrentSlide();
	});
	$('.applications-slider .slick-next-custom').on('click', () => {
		$('.applications-slider .slider-content').slick("slickNext");
		changeActiveClassForCurrentSlide();
	});
	
	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		let offset = 0.052083 * $(window).width();

		if ($(window).width() < 1200) {
			offset = 60;
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - offset
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$('.menu-opener').toggleClass('active');
		$('.mobile-top-nav').toggleClass('opened');
		$('.header').toggleClass('nav-opened');
	});

	$('.mobile-top-nav a').click(function(){
		$('.menu-opener').click();
	});

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 100
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	}


	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);

	// Modals
	$('.modal').css('display','block');

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		hideModal( $(this) );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('.modal-close, .js-modal-close').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		hideModal('.modal');

		if ($(this).data('modal-tab') != undefined) {
			goToTab($(this).data('modal-tab'));
		}

		showModal( $(this).data('modal') );
	});

	// Video
	$('.video-block:not([data-video-modal])').on('click', function () {
		$(this).addClass('playing');
		$(this).find('.block-overlay').fadeOut(300);

		let videoId = $(this).find('.play-btn').data('video-id');

		if (!videoId) {
			videoId = $(this).data('video-id');
		}

		if (videoId == undefined) {
			$(this).find('video')[0].play();
		} else{
			let videoType = $(this).data('video-type') ? $(this).data('video-type').toLowerCase() : 'youtube';

			if (videoType == 'youtube') {
				$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"></div>');
				createVideo(videoId, videoId);
			} else if(videoType == 'vimeo'){
				$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"><iframe allow="autoplay" class="video-iframe" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=0&app_id=122963"></div>');
			}
		}
	});

	$('[data-video-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		let videoId = $(this).data('video-modal');
		let videoType = $(this).data('video-type');

		if (videoType == 'youtube') {
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('youtube').append('<div class="video-iframe" id="'+videoId+'"></div>');
			createVideo(videoId, videoId);
		} else if(videoType == 'vimeo'){
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('vimeo').html('<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=1&app_id=122963">');
		}

		hideModal('.modal');

		showModal( "#video-modal" );
	});

	var player;
	function createVideo(videoBlockId, videoId) {
		player = new YT.Player(videoBlockId, {
			videoId: videoId,
			playerVars: {
				'autohide': 1,
				'showinfo' : 0,
				'rel': 0,
				'loop': 1,
				'playsinline': 1,
				'fs': 0,
				'allowsInlineMediaPlayback': true
			},
			events: {
				'onReady': function (e) {
					// e.target.mute();
					// if ($(window).width() > 991) {
						setTimeout(function(){
							e.target.playVideo();
						}, 200);
					// }
				}
			}
		});
	}
});


function getScrollWidth(){
	// create element with scroll
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;

	div.remove();

	return scrollWidth;
}

let bodyScrolled = 0;
function showModal(modal){
	$(modal).addClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body').addClass('modal-visible')
			 .scrollTop(bodyScrolled);

	$('body, .header').css('padding-right', getScrollWidth());
}

function hideModal(modal){
	$(modal).removeClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body').removeClass('modal-visible')
			 .scrollTop(bodyScrolled);

	$('body, .header').css('padding-right', 0);
}

// Animate On Scroll (js-aos)
function setItemPosition(item, direction, shift){
	if (direction === 'vertical') {
		item.css({ 'transform': `translateY(${shift}px)` });
	} else if(direction === 'horizontal'){
		item.css({ 'transform': `translateX(${shift}px)` });
	}
}

function getCoords(elem) {
	var box = elem.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};

}

$(window).scroll(function(){
	var scrollPosition = window.scrollY;
	var screenCenter = scrollPosition + document.documentElement.clientHeight / 2;

	$('.js-aos').each(function(){
		var isDisposable = $(this).data('disposable') && $(this).hasClass('animated');
		var moveDirection = !!$(this).data('direction') ? $(this).data('direction') : 'vertical';
		var moveSpeed = !!$(this).data('speed') ? $(this).data('speed') * 1 : 0.33;

		if ( !isDisposable ) {
			var elemPos = getCoords(this);

			var offset = $(this).data('offset') * 1;

			if (!offset) {
				offset = -150;
			}

			var scrollDiff = elemPos.top - (screenCenter + offset);
			var moveShift = scrollDiff * moveSpeed;

			if ($(this).data('fix') == true) {
				if (
					(moveShift > 0 && moveSpeed < 0) 
					||
					(moveShift < 0 && moveSpeed > 0)
				) {
					moveShift = 0;
				}
			}

			if(scrollDiff <= 0){
				$(this).addClass('animated');
			}

			setItemPosition($(this), moveDirection, moveShift);
		} else{
			setItemPosition($(this), moveDirection, 0);
		}
	});
});
