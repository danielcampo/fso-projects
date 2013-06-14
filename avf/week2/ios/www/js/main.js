// Daniel Campo | FSO | AVF1306
$(function() {

$.fn.scrollY = function(speed,offset) {
var scrollOffset;var elementOffset=$(this).offset();if(offset!==undefined){scrollOffset=elementOffset.top-offset}else{scrollOffset=elementOffset.top}$("html, body").animate({scrollTop:scrollOffset},speed)
};

	// ################################################################
	// ################################################################
	//instagram

	$('#api_instagram_data').css('display','none'); //hide instagram container
	$('#api_instagram_data_list').css('display','none'); //hide instagram container

	//open instagram data
	$('#api_instagram').on('click', function(e) {
		e.preventDefault();
		$('#api_instagram_data_status').html('Loading Media...');
		if ($('#api_instagram_data_list').children('div').hasClass('insta_media') != true) { //prevent list from being loaded once already loaded
			$('#api_instagram_data').slideDown(); //show instagram container
			$.getJSON('https://api.instagram.com/v1/tags/playstation/media/recent?access_token=36527161.6b20cd8.9e1d6a3874074510b7cc0884fc25b89b&count=4&callback=?',
				function(data) {
					loadInstagram(data.data);
				}
			);
		} else {
			alert('List is already loaded.');
		};
	});

		//load photos
		function loadInstagram(data) {
			$('#api_instagram_data_list').append(
				'<header>' +
					'<span class="insta_current_display">Displaying latest media for tags including: PlayStation</span>' +
				'</header>'
			);

			for (i = 0; i < data.length; i++) {
				var insta_media_avatar = data[i].user.profile_picture,
					insta_media_user = data[i].user.full_name,
					insta_media_username = data[i].user.username,
					insta_media_image = data[i].images.standard_resolution.url,
					insta_media_link = data[i].link;
				
				var	insta_media_created = new Date(data[i].created_time*1000),
					insta_media_created_month = insta_media_created.getUTCMonth() + 1,
					insta_media_created_day = insta_media_created.getUTCDay(),
					insta_media_created_year = insta_media_created.getUTCFullYear();

				$('#api_instagram_data_list').append(
					'<div class="insta_media">' +
						'<header>' +
							'<div class="insta_media_avatar">' +
								'<img src="' + insta_media_avatar + '" />' +
							'</div>' +
							'<div class="insta_media_user">' +
								insta_media_user + '<br /><span class="insta_username">(<a href="http://instagram.com/' + insta_media_username + '">@' + insta_media_username + '</a>)</span><br />' +
							'</div>' +
						'</header>' +
						'<article>' +
							'<a href="' + insta_media_link + '"><img class="insta_media_image" src="' + insta_media_image + '" /></a>' +
						'</article>' +
						'<footer>' +
							'<span class="insta_media_created">Posted: ' + insta_media_created_month + '/' + insta_media_created_day + '/' + insta_media_created_year + '</span>' +
						'</footer>' +

					'</div>'
				);
			};

			$('#api_instagram_data_list').append(
				'<footer>' +
					'<a class="api_instagram_close" href="#">[x] close</a>' +
				'</footer>'
			);

			showTwitter();
		};

	//show instagram data
	function showTwitter() {
		$('#api_instagram_data_status').html(''); //clear loading message
		$('#api_instagram_data_list').delay(800).slideDown();
		$('#api_instagram').scrollY();
	};

	//close instagram data
	$('#api_instagram_data_list').on('click', '.api_instagram_close', function(e) {
		e.preventDefault();
		$('#api_instagram_data').slideUp(400,clearTwitter); //clear instagram data list once animation is complete
			function clearTwitter() {
				$('#api_instagram_data_list').html('');
			};
	});

	//END instagram
	// ################################################################
	// ################################################################


	// ################################################################
	// ################################################################
	//giantbomb

	$('#api_giantbomb_data').css('display','none'); //hide giantbomb container
	$('#api_giantbomb_data_list').css('display','none'); //hide giantbomb container

	//open giantbomb data
	$('#api_giantbomb').on('click', function(e) {
		e.preventDefault();
		$('#api_giantbomb_data_status').html('Loading Games...');
		if ($('#api_giantbomb_data_list').children('div').hasClass('gb_game') != true) { //prevent list from being loaded once already loaded
			$('#api_giantbomb_data').slideDown(); //show giantbomb container
			$.getJSON('http://api.giantbomb.com/games/1/?api_key=90d0b1324112a43544db0531637f8437ef473c2b&format=jsonp&limit=5&json_callback=?',
				function(data) {
					loadGiantbomb(data);
				}
			);
		} else {
			alert('List is already loaded.');
		};
	});

		//load games
		function loadGiantbomb(data) {
			$('#api_giantbomb_data_list').append(
				'<header>' +
					'<span class="gb_current_display">Displaying 5 games</span>' +
				'</header>'
			);
			for (i = 0; i < data.results.length; i++) {
				var gb_game_name = data.results[i].name,
					gb_game_platforms = data.results[i].platforms,
					gb_game_link = data.results[i].site_detail_url,
					gb_game_desc = data.results[i].deck,
					gb_game_release = data.results[i].original_release_date.substring(0,10);

				//set placholder image if one doesn't exist
				if (data.results[i].image != undefined ) {
					gb_game_image = data.results[i].image['icon_url']
				} else {
					gb_game_image = 'http://placehold.it/48/F16529/F16529'
				};
				// ---

				//create platforms string
				var gb_game_platforms_string = '';

				for (n = 0; n < gb_game_platforms.length; n++) {
					gb_game_platforms_string += gb_game_platforms[n]['abbreviation'];
					if (n < gb_game_platforms.length -1) { gb_game_platforms_string += ', ' };
				};
				//---

				$('#api_giantbomb_data_list').append(
					'<div class="gb_game">' +
						'<header>' +
							'<div class="gb_game_avatar">' +
								'<img src="' + gb_game_image + '" />' +
							'</div>' +
							'<div class="gb_game_name">' +
								gb_game_name + '<br /><span class="gb_gameplats">(' + gb_game_platforms_string + ')</span><br />' +
							'</div>' +
						'</header>' +
						'<article>' +
							gb_game_desc +
						'</article>' +
						'<footer>' +
							'<span class="gb_game_release">Original release date: ' + gb_game_release + '</span>' +
						'</footer>' +

					'</div>'
				);
			};

			$('#api_giantbomb_data_list').append(
				'<footer>' +
					'<a class="api_giantbomb_close" href="#">[x] close</a>' +
				'</footer>'
			);

			showGiantbomb();
		};

			//show giantbomb data
			function showGiantbomb() {
				$('#api_giantbomb_data_status').html(''); //clear loading message
				$('#api_giantbomb_data_list').delay(800).slideDown();
				$('#api_giantbomb').scrollY();
			};

		//close giantbomb data
		$('#api_giantbomb_data_list').on('click', '.api_giantbomb_close', function(e) {
			e.preventDefault();
			$('#api_giantbomb_data').slideUp(400,clearTwitter); //clear giantbomb data list once animation is complete
				function clearTwitter() {
					$('#api_giantbomb_data_list').html('');
				};
		});

//end
});