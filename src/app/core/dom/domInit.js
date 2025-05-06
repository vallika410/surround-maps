(function($) {
	'use strict';
	$(function() {
		//Event initializations
		$('.collapse').sideNav();
		$('input#search').focus(function() {
			$(this).parent().addClass('focused');
		});
		$('input#search').blur(function() {
			if (!$(this).val()) {
				$(this).parent().removeClass('focused');
			}
		});
		if (is_touch_device()) {
			$('#nav-mobile').css({
				overflow: 'auto'
			});
		}
	}); // end of document ready
	window.NOTIFY = {
		success_message: function(message, duration) {
			Materialize.toast(message, duration, 'card-panel teal lighten-2');

		},
		error_message: function(message, duration) {
			Materialize.toast(message, duration, 'card-panel red lighten-2');
		},
	};
	/*
	 * to check whether the device has touch enabled
	 */
	function is_touch_device() {
		try {
			document.createEvent("TouchEvent");
			return true;
		} catch (e) {
			return false;
		}
	}
	
})(jQuery); // end of jQuery name space
