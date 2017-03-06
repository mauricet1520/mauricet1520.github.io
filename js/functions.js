function initMap() {
	var $map = document.getElementById("gmap"),
	lat = $map.getAttribute('data-lat'),
	lng = $map.getAttribute('data-lng'),
	mapOptions = {
		center: null,
		zoom: 13,
		disableDefaultUI: true
	}

	var styles = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#fcfcfc"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#fcfcfc"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]}];

	mapOptions.center = new google.maps.LatLng(lat, lng);
	map = new google.maps.Map($map, mapOptions);
	map.setOptions({ styles: styles });

	google.maps.event.addDomListener(window, 'resize', function() {
		var center = map.getCenter();

		google.maps.event.trigger(map, 'resize');
		map.setCenter(center);
	});
}

$(document).ready(function() {
	// Go to Next Section
	$('.next').on('click', function(event) {
		event.preventDefault();

		var nextPoint = $(this).closest('.section').siblings('.section-about').offset().top;

		$('body, html').animate({
			'scrollTop': nextPoint
		}, 1000);
	});

	// Go Top
	$('.go-top').on('click', function(event) {
		event.preventDefault();

		$('body, html').animate({
			'scrollTop': 0
		}, 1000);
	});

	// Scroll to Section
	$('.nav a').on('click', function(event) {
		event.preventDefault();

		$(this).parent().addClass('active').siblings().removeClass('active');

		var $scrollSection = $('section' + $(this).attr('href'));
		var scrollPos = $scrollSection.offset().top - 60;

		$('.nav, .nav-btn').removeClass('active');

		$('body, html').animate({
			'scrollTop': scrollPos
		}, 500);
	});

	// Form Validation
	$('.form-contact').validate({
		submitHandler : function (form) {
			var $form = $(form);
			$.ajax({
				type : $form.attr('method'),
				url : $form.attr('action'),
				dataType : 'json',
				data : $form.serializeArray(),
				success : function (data, status) {
					$form.append($(data));
				}
			});
		}
	});

	// Placeholders
	$('input, textarea').placeholder();

	// Toggle Navigation
	$('.nav-btn').on('click', function() {
		$(this).toggleClass('active');
		$('.nav').toggleClass('active');
	});

	// Toggle Map Visibility
	var isClicked = false;

	$('.map-toggle').on('click', function() {
		var showText = $(this).attr('data-show-text');
		var hideText = $(this).attr('data-hide-text');

		if( !isClicked ) {
			$(this).find('span').text( showText );
			$('.gmap').slideUp();
			isClicked = true;
		} else {
			$(this).find('span').text( hideText );
			$('.gmap').slideDown();
			isClicked = false;
		}
	});

	$(window).on('load', function() {
		// Hide Loader when page is loaded
		setTimeout(function() {
			$('.loader').fadeOut(1000);

			animation = new WOW({
				boxClass: 'animate'
			}).init();
		}, 500);
	});

	$(window).on('load resize', function() {
		// Set Height to Home Section
		$('.section-home').css({
			'height': function() {
				return $(window).height();
			}
		});
	});

	$(window).on('scroll', function() {
		var winO = $(window).scrollTop();

		if( winO > $('.go-top').height() + 20 ) {
			$('.go-top').addClass('show');
		} else {
			$('.go-top').removeClass('show');
		}
	});

	$(window).on('load scroll', function() {
		var winO = $(window).scrollTop();

		if( winO > $(window).height() ) {
			$('.nav').addClass('nav-fixed');
		} else {
			$('.nav').removeClass('nav-fixed');
		}

		$('.section').each(function() {
			if( winO >= $(this).offset().top - 70 ) {
				var id = '#' + $(this).attr('id');

				$('.nav a[href=' + id + ']').parent().addClass('active').siblings().removeClass('active');
			}
		});
	});
});