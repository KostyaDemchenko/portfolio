// Main JS
(function ($) {
	"use strict";

	const cfg = {
		defAnimation: "fadeInUp",    // default css animation		
		scrollDuration: 800,           // smoothscroll duration
		statsDuration: 4000           // stats animation duration
	};

	const $WIN = $(window);

	/* Preloader 
	 * -------------------------------------------------- */
	const ssPreloader = () => {
		$WIN.on('load', function () {
			// force page scroll position to top at page refresh
			$('html, body').animate({ scrollTop: 0 }, 'normal');
			// will first fade out the loading animation 
			$("#loader").fadeOut("slow", function () {
				// will fade out the whole DIV that covers the website.
				$("#preloader").delay(300).fadeOut("slow");
			});
		});
	};

	/* Masonry
	------------------------------------------------------ */
	const ssMasonryFolio = () => {
		const containerBricks = $('.bricks-wrapper');
		containerBricks.imagesLoaded(function () {
			containerBricks.masonry({
				itemSelector: '.brick',
				resize: true
			});
		});
	};

	/* Light Gallery
	------------------------------------------------------- */
	const ssLightGallery = () => {
		$('#folio-wrap').lightGallery({
			showThumbByDefault: false,
			hash: false,
			selector: ".item-wrap"
		});
	};

	/* Menu on Scrolldown
	 * ------------------------------------------------------ */
	const ssMenuOnScrolldown = () => {
		const menuTrigger = $('#header-menu-trigger');
		$WIN.on('scroll', function () {
			if ($WIN.scrollTop() > 150) {
				menuTrigger.addClass('opaque');
			} else {
				menuTrigger.removeClass('opaque');
			}
		});
	};

	/* OffCanvas Menu
	 * ------------------------------------------------------ */
	const ssOffCanvas = () => {
		const menuTrigger = $('#header-menu-trigger');
		const nav = $('#menu-nav-wrap');
		const closeButton = nav.find('.close-button');
		const siteBody = $('body');
		const mainContents = $('section, footer');

		// open-close menu by clicking on the menu icon
		menuTrigger.on('click', function (e) {
			e.preventDefault();
			menuTrigger.toggleClass('is-clicked');
			siteBody.toggleClass('menu-is-open');
		});

		// close menu by clicking the close button
		closeButton.on('click', function (e) {
			e.preventDefault();
			menuTrigger.trigger('click');
		});

		// close menu clicking outside the menu itself
		siteBody.on('click', function (e) {
			if (!$(e.target).is('#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span')) {
				menuTrigger.removeClass('is-clicked');
				siteBody.removeClass('menu-is-open');
			}
		});
	};

	/* Smooth Scrolling
	 * ------------------------------------------------------ */
	const ssSmoothScroll = () => {
		$('.smoothscroll').on('click', function (e) {
			const target = this.hash;
			const $target = $(target);
			e.preventDefault();
			e.stopPropagation();
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, cfg.scrollDuration, 'swing').promise().done(function () {
				// check if menu is open
				if ($('body').hasClass('menu-is-open')) {
					$('#header-menu-trigger').trigger('click');
				}
				window.location.hash = target;
			});
		});
	};

	/* Placeholder Plugin Settings
	 * ------------------------------------------------------ */
	const ssPlaceholder = () => {
		$('input, textarea, select').placeholder();
	};

	/* Stat Counter
	 *------------------------------------------------------- */
	const ssStatCounter = () => {
		const statSection = $("#stats");
		const stats = $(".stat-count");
		statSection.waypoint({
			handler: function (direction) {
				if (direction === "down") {
					stats.each(function () {
						const $this = $(this);
						$({ Counter: 0 }).animate({ Counter: $this.text() }, {
							duration: cfg.statsDuration,
							easing: 'swing',
							step: function (curValue) {
								$this.text(Math.ceil(curValue));
							}
						});
					});
				}
				// trigger once only
				this.destroy();
			},
			offset: "90%"
		});
	};

	/* Alert Boxes
	------------------------------------------------------- */
	const ssAlertBoxes = () => {
		$('.alert-box').on('click', '.close', function () {
			$(this).parent().fadeOut(500);
		});
	};

	/* Animations
	 * ------------------------------------------------------- */
	const ssAnimations = () => {
		if (!$("html").hasClass('no-cssanimations')) {
			$('.animate-this').waypoint({
				handler: function (direction) {
					const defAnimationEfx = cfg.defAnimation;
					if (direction === 'down' && !$(this.element).hasClass('animated')) {
						$(this.element).addClass('item-animate');
						setTimeout(function () {
							$('body .animate-this.item-animate').each(function (ctr) {
								const el = $(this);
								let animationEfx = el.data('animate') || null;
								if (!animationEfx) {
									animationEfx = defAnimationEfx;
								}
								setTimeout(function () {
									el.addClass(animationEfx + ' animated');
									el.removeClass('item-animate');
								}, ctr * 50);
							});
						}, 100);
					}
					// trigger once only
					this.destroy();
				},
				offset: '95%'
			});
		}
	};

	/* Intro Animation
	 * ------------------------------------------------------- */
	const ssIntroAnimation = () => {
		$WIN.on('load', function () {
			if (!$("html").hasClass('no-cssanimations')) {
				setTimeout(function () {
					$('.animate-intro').each(function (ctr) {
						const el = $(this);
						let animationEfx = el.data('animate') || null;
						if (!animationEfx) {
							animationEfx = cfg.defAnimation;
						}
						setTimeout(function () {
							el.addClass(animationEfx + ' animated');
						}, ctr * 300);
					});
				}, 100);
			}
		});
	};

	/* Back to Top
	 * ------------------------------------------------------ */
	const ssBackToTop = () => {
		const pxShow = 500;         // height on which the button will show
		const fadeInTime = 400;         // how slow/fast you want the button to show
		const fadeOutTime = 400;         // how slow/fast you want the button to hide
		const scrollSpeed = 300;         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		const goTopButton = $("#go-top");
		// Show or hide the sticky footer button
		$(window).on('scroll', function () {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};

	/* Initialize
	 * ------------------------------------------------------ */
	const ssInit = () => {
		ssPreloader();
		ssMasonryFolio();
		ssLightGallery();
		ssMenuOnScrolldown();
		ssOffCanvas();
		ssSmoothScroll();
		ssPlaceholder();
		ssStatCounter();
		ssAlertBoxes();
		ssAnimations();
		ssIntroAnimation();
		ssBackToTop();
	};

	ssInit();

})(jQuery);
