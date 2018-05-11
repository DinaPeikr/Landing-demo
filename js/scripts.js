$(function() {

	/* Menu */
	$(".menuToggle").on('click', function() {
		if ($(document).width() < 992) {
			$(".nav__menu").slideToggle(500, function() {
				if ($(this).css('display') === 'none') {
					$(this).removeAttr('style');
				}

			});
		}
	});
	$(window).on('resize', function() {

		if ($(document).width() > 992) {
			if ($(".nav__menu").css('display') === 'block') {
				$(".nav__menu").removeAttr('style');
			}
		}
	});

/* Dropdown onClick */

$("li.dropdown").on('click', function() {
	 $(this).find('ul.submenu').slideToggle(500);
	 $('li.dropdown').not(this).find('ul.submenu').slideUp(500);
});


	/* Search */

$('.search__label').on('click', function(e){
  e.preventDefault();
  
  var $this = $(this),
      form = $this.closest('.search__form'),
      input = form.find('.search__input');
      input.toggleClass('show');
});

$(document).mouseup(function (e) {
  var container = $('.search__input');
  if (container.has(e.target).length === 0 && 
      $(e.target).closest('form').length === 0){
    container.removeClass('show');
  }
});

/* Contactable */
$('#contactable').contactable();

	/* Slider */
$('.slider__items').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		autoplay: true,
		autoplaySpeed: 4000,
		fade: false
	});

	$(".slider__arrow-prev").on("click", function() {
		$('.slider__items').slick("slickPrev");

	});

	$(".slider__arrow-next").on("click", function() {
		$('.slider__items').slick("slickNext");
	});
});

