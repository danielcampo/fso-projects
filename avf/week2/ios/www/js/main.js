$(function() {
	$("#api_twitter_data").css("display","none"); //hide twitter container

	//twitter data
	$("#api_twitter").on("click", function() {
		$("#api_twitter_data").slideDown(); //show twitter container
		$.getJSON("http://search.twitter.com/search.json?q=games&rpp=5&include_entities=true&result_type=popular&callback=?",
			function(data) {
				console.log(data);
				$("#api_twitter_data_status").html("Loading Tweets...");
				loadTwitter(data);
			}
		);
	});

	function loadTwitter(data) {
		$("#api_twitter_data_list").append(
			"<li>" + data.results[1].created_at + "</li>");
	};
	//END twitter

//end
});