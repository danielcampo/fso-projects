// Daniel Campo | FSO | AVF1306
$(function() {

$.fn.scrollY = function(speed,offset) {
var scrollOffset;var elementOffset=$(this).offset();if(offset!==undefined){scrollOffset=elementOffset.top-offset}else{scrollOffset=elementOffset.top}$("html, body").animate({scrollTop:scrollOffset},speed)
};

	// ################################################################
	// ################################################################
	//twitter

	$('#api_twitter_data').css('display','none'); //hide twitter container
	$('#api_twitter_data_list').css('display','none'); //hide twitter container

	//open twitter data
	$('#api_twitter').on('click', function(e) {
		e.preventDefault();
		$('#api_twitter_data_status').html('Loading Tweets...');
		if ($('#api_twitter_data_list').children('div').hasClass('tw_tweet') != true) { //prevent list from being loaded once already loaded
			$('#api_twitter_data').slideDown(); //show twitter container
			$.getJSON('https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4',
				function(data) {
					loadTwitter(data);
				}
			);
		} else {
			alert('List is already loaded.');
		};
	});

		//load tweets
		function loadTwitter(data) {
			$('#api_twitter_data_list').append(
				'<header>' +
					'<span class="tw_current_display">Displaying latest tweets for: "' + data.query + '"</span>' +
				'</header>'
			);

			for (i = 0; i < data.results.length; i++) {
				var tw_tweet_avatar = data.results[i].profile_image_url,
					tw_tweet_user = data.results[i].from_user_name,
					tw_tweet_username = data.results[i].from_user,
					tw_tweet_text = data.results[i].text,
					tw_tweet_created = data.results[i].created_at.substring(0,25);

				$('#api_twitter_data_list').append(
					'<div class="tw_tweet">' +
						'<header>' +
							'<div class="tw_tweet_avatar">' +
								'<img src="' + tw_tweet_avatar + '" />' +
							'</div>' +
							'<div class="tw_tweet_user">' +
								tw_tweet_user + '<br /><span class="tw_username">(<a href="http://twitter.com/' + tw_tweet_username + '">@' + tw_tweet_username + '</a>)</span><br />' +
							'</div>' +
						'</header>' +
						'<article>' +
							tw_tweet_text +
						'</article>' +
						'<footer>' +
							'<span class="tw_tweet_created">' + tw_tweet_created + '</span>' +
						'</footer>' +

					'</div>'
				);
			};

			$('#api_twitter_data_list').append(
				'<footer>' +
					'<a class="api_twitter_close" href="#">[x] close</a>' +
				'</footer>'
			);

			showTwitter();
		};

	//show twitter data
	function showTwitter() {
		$('#api_twitter_data_status').html(''); //clear loading message
		$('#api_twitter_data_list').delay(800).slideDown();
		$('#api_twitter').scrollY();
	};

	//close twitter data
	$('#api_twitter_data_list').on('click', '.api_twitter_close', function(e) {
		e.preventDefault();
		$('#api_twitter_data').slideUp(400,clearTwitter); //clear twitter data list once animation is complete
			function clearTwitter() {
				$('#api_twitter_data_list').html('');
			};
	});

	//END twitter
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