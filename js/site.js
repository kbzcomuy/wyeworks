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
				{ src: '/images/backgrounds/bob-dylan-1.jpg' },
				{ src: '/images/backgrounds/bob-dylan-2.jpg' }
			]
		});
	},
	// kbzJquery
	kbzJquery: function(){


		function readTextFile(file) {
			var rawFile = new XMLHttpRequest();
			rawFile.open("GET", file);
			rawFile.onreadystatechange = function () {
				if(this.readyState === this.DONE) {

					// kbz: obtengo el texto
					var allText = rawFile.responseText;
					// console.log(allText);

					// kbz: creo un array1 con cada renglón como elemento del mismo
					var myArray1 = allText.split("\n");
					// console.log(myArray1);

					// kbz: lo ordeno
					myArray1.sort();

					// kbz: función para crear cada disco
					function Album(year, title, decade) {
						this.year = year;
						this.title = title;
						this.decade = decade;
					}

					// kbz: creo otro array2 para ir agregando los objetos de cada disco
					var myArray2 = new Array();
					var myArrayDecades = new Array();
					var checkDecade;


					// kbz: recorro el array1 oteniendo el año y el título por separado y los agrego al array2
					for (let i = 0; i < myArray1.length; i++) {
						var yearAlbum = myArray1[i].substr(0,4);
						var titleAlbum = myArray1[i].substr(5);
						var decadeAlbum = myArray1[i].substr(0,3) + "0";

						// console.log(i + " año = " + yearAlbum);
						// console.log(i + " título = " + titleAlbum);
						// console.log(i + " título = " + decadeAlbum);

						if (checkDecade != decadeAlbum) {
							myArrayDecades.push(decadeAlbum);
						}
						checkDecade = decadeAlbum;

						myArray2.push(new Album(yearAlbum, titleAlbum, decadeAlbum));
						// console.log(new Album(yearAlbum, titleAlbum));
					}

					console.log(myArray2);
					console.log(myArrayDecades);

					for (let i = 0; i < myArray2.length; i++) {
						if (checkDecade != myArray2[i].decade) {
							var kk = '<div class="decade-separator">' + myArray2[i].decade.substr(2) + '</div>';
  							$('#albums').append(kk);
						}
						checkDecade = myArray2[i].decade;
						var bloque = '<div class="album box" id="album' + i + '">\
									<div class="album-title">' + myArray2[i].title + '</div>\
									<div class="album-year">' + myArray2[i].year + '</div>\
									<div class="search-spotify"><a href="https://open.spotify.com/search/Bob Dylan ' + myArray2[i].title + '" target="_blank"><i class="fab fa-spotify"></i> Listen Album</a></div>\
								</div>';
  						$('#albums').append(bloque);
					}
		        }
		    }
		    rawFile.send(null);
		}

		readTextFile("/data/discography.txt");

		var authenticationSuccess = function() {
		  console.log('Successful authentication');
		};
		var authenticationFailure = function() {
		  console.log('Failed authentication');
		};
		window.Trello.authorize({
			type: 'popup',
			name: 'Getting Started Application',
			token: '144f3aed13959f5ea7369a796d84c9ce25d0bb5f9ea6b2111bd696484329c587',
			scope: {
				read: 'true',
				write: 'true' },
			expiration: 'never',
			success: authenticationSuccess,
			error: authenticationFailure
		});

		var myList = '6092fa7c26191c5f8b092683';

		var creationSuccess = function (data) {
		  console.log('Card created successfully.');
		  console.log(JSON.stringify(data, null, 2));
		};

		var newCard = {
		  name: 'kbz test 1',
		  desc: 'This is the description of our new card.',
		  // Place this card at the top of our list
		  idList: myList,
		  pos: 'top'
		};

		// window.Trello.post('/cards/', newCard, creationSuccess);
	}
}

// Initialize
Site.init( );