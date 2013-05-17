$(function() {
	$('#api_twitter_data').css('display','none'); //hide twitter container
	$('#api_twitter_data_list').css('display','none'); //hide twitter container

	//open twitter data
	$('#api_twitter').on('click', function() {
		if ($('#api_twitter_data_list').children('div').hasClass('tw_tweet') != true) { //prevent list from being loaded once already loaded
			$('#api_twitter_data').slideDown(); //show twitter container
			$.getJSON('http://search.twitter.com/search.json?q=videogames&rpp=5&include_entities=true&result_type=recent&callback=?',
				function(data) {
					$('#api_twitter_data_status').html('Loading Tweets...');
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
				$('#api_twitter_data_list').append(
					'<div class="tw_tweet">' +
						'<header>' + 
							'<div class="tw_tweet_avatar">' +
								'<img src="' + data.results[i].profile_image_url + '" />' +
							'</div>' +
							'<div class="tw_tweet_user">' +
								data.results[i].from_user_name + '<br /><span class="tw_username">(<a href="http://twitter.com/' + data.results[i].from_user + '">@' + data.results[i].from_user + '</a>)</span><br />' +		 
							'</div>' +
						'</header>' +
						'<article>' + 
							data.results[i].text + 
						'</article>' +
						'<footer>' +
							'<span class="tw_tweet_created">' + data.results[i].created_at.substring(0,25) + '</span>' +
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
	};
	
	//close twitter data
	$('#api_twitter_data_list').on('click', '.api_twitter_close', function(e) {
		e.preventDefault();
		$('#api_twitter_data').slideUp(400,clearTwitter); //clear twitter data list once animation is complete
			function clearTwitter() {	
				$('#api_twitter_data_list').html('');
			};
		console.log('closing');
	});

	//END twitter

//end
});