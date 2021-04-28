"use strict";

/* Default Variables */
var SiteOptions = {
}

if ( typeof Site !== 'undefined' ) {
	$.extend( SiteOptions, Site );
}

var Site = {
	init: function( ) {
		// resize
		$(window).resize(Site.onResize);

		Site.initVegas();
		Site.kbzJquery();
	},
	isMobile: function(){
		return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
	},
	onResize: function(){

	},
	initVegas: function(){
		$('body').vegas({
			slides: [
				{ src: '/images/backgrounds/background_1.jpg' },
				{ src: '/images/backgrounds/background_2.jpg' }
			]
		});
	},
	// kbzJquery
	kbzJquery: function(){

	}
}

// Initialize
Site.init( );