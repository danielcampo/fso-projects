/*
Daniel Campo
FSO - Mobile Development
Advanced Scalable Data Infrastructures - 1303

App : Game Collector
File: Main JS
*/
var platformList = [
	["platform_choose","Choose a Platform"],
	["platform_3ds","3DS / DS"],
	["platform_ios","iOS"],
	["platform_pc","PC"],
	["platform_psvitapsp","PlayStation Vita / PSP"],
	["platform_ps3","PlayStation 3"],
	["platform_wii", "Wii / Wii U"],
	["platform_xbox360", "XBOX 360"]
];



/***********/
/* Couch */
/**********/
$("#home").on("pageinit", function() {
	$.couch.db("asdi").view("gamecollector/games", {
		success: function(data) {

			$("homeitems").empty();
			$.each(data.rows, function(index, value) {
				var item = (value.value || value.doc);
					$("#homeitems").append(
						$("<li>").append(
							$("<a>")
								.attr("href", "games.html?platform=" + item.platform[1].toLowerCase())
								.text(item.title)
							)
						);
			});

			$("homeitems").listview("refresh");
		}
	});

});

var urlVars = function() {
	var urlData = $($.mobile.activePage).data("url");

	var urlParts = urlData.split("?");
	var urlPairs = urlParts[1].split("&");
	var urlValues = {};

	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split("=");
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);

		urlValues[key] = value;
	}
	return urlValues;
}

$("#games").live("pageshow", function() {

	var platform = urlVars()["platform"];
	console.log(platform);

	$.couch.db("asdi").view("gamecollector/games", {
		platform: "platform:" + platform
	});

});


/***********/
/* END Couch */
/**********/

$('#add').on('pageinit', function(){

	/* ################################ */
	/* ################################ */
	/* Form Validation */
	/* ################################ */
	/* ################################ */
	var myForm = $('#gameForm');
	    myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
			var data = myForm.serializeArray();
				saveGame(data);
			}
		});


	/* ################################ */
	/* ################################ */
	/* Form Building Functions */
	/* ################################ */
	/* ################################ */
	function createPlatformList() {

		// Label
		var platformLabel = $("<label></label>");
			platformLabel.attr("for","platform");

		var platformLabelText = "Platform ";
		platformLabel.append(platformLabelText);

		$("#platform_list").append(platformLabel);

		// Select
		var platformSelect = $("<select></select>");
			platformSelect.attr("id","platform");
			platformSelect.attr("name","platform");

		for (n = 0; n < platformList.length; n++) {
			var createOption = $("<option></option>");
				createOption.attr("value", platformList[n][0]);

			// Option Text
			var optionText = platformList[n][1];

			// Append Option Text
			createOption.append(optionText);

			platformSelect.append(createOption);

		};

		// Append Select to #platform
		$("#platform_list").append(platformSelect);

	};

	createPlatformList();
	// END Platform List

	var genreList = [
		["genre_choose","Choose a Genre"],
		["genre_action","Action"],
		["genre_adventure","Adventure"],
		["genre_dancemusic","Dance / Music"],
		["genre_fighting","Fighting"],
		["genre_platform","Platform"],
		["genre_puzzle","Puzzle"],
		["genre_rpg","RPG"],
		["genre_shooter","Shooter"],
		["genre_simulation","Simulation"],
		["genre_sports","Sports"],
		["genre_strategy","Strategy"]
	];

	function createGenreList() {

		// Label
		var genreLabel = $("<label></label>");
			genreLabel.attr("for","genre");

		var genreLabelText = "Genre ";
			genreLabel.append(genreLabelText);

		$("#genre_list").append(genreLabel);

		// Select
		var genreSelect = $("<select></select>");
			genreSelect.attr("id","genre");
			genreSelect.attr("name","genre");

		for (n = 0; n < genreList.length; n++) {
			var createOption = $("<option></option>");
				createOption.attr("value", genreList[n][0]);

			// Option Text
			var optionText = genreList[n][1];

			// Append Option Text
			createOption.append(optionText);

			genreSelect.append(createOption);

		};

		// Append Select to #genre
		$("#genre_list").append(genreSelect);
	};
	createGenreList();
	// END Genre List

	/* ################################ */
	/* END Form Building Functions
	/* ################################ */

	// Set Defaults
	function setDefaults(input) {
	    var now = new Date();
	    var month = (now.getMonth() + 1);
	    var day = now.getDate();
	    if(month < 10)
	        month = "0" + month;
	    if(day < 10)
	        day = "0" + day;
	    var today = now.getFullYear() + '-' + month + '-' + day;
	    $(input).val(today);
	};
	// END Set Defaults

	// Remove Defaults
	function removeDefaults(input) {
		$(input).val("");
	};
	// END Remove Defaults

	function getOptionText(option,value) {
		// Cycles through the Genre list array to find a match using the value of the selected option
		for (n = 0; n < option.length; n++) {
			if (option[n].indexOf(value) != -1) {
				text = option[n][1];
				return text;
			};
		};
	};

	function getOptionValue(option,value) {
	// Cycles through the Genre list array to find a match using the value of the selected option
		for (n = 0; n < option.length; n++) {
			if (option[n].indexOf(value) != -1) {
				text = option[n][0];
				return text;
			};
		};
	};

	function getOptionValueIndex(option,value) {
	// Cycles through the Genre list array to find a match using the value of the selected option
		for (n = 0; n < option.length; n++) {
			if (option[n].indexOf(value) != -1) {
				return n;
			};
		};
	};

	// ####################################################################
	// Create
	// ####################################################################

	// ##################################
	// ##################################
	// Save Game to Local Storage
	// ##################################
	// ##################################
	function saveGame(data) {
		//if (!key) {
			var id = Math.round(new Date().getTime() / 1000);
		/* } else {
			var id = key;
		};
		*/
		// Store Form Fields Value Into an Object
		// Label & Value Will Be Stored.

		var game = {};

			// Append _game prefix and make lowercase
			var id = "game_" + $("#title").val();
				id = id.replace(" ","_");
				id = id.toLowerCase();


			game._id = id;
			game.title = ["Title", $("#title").val()];

			game.platform = ["Platform", getOptionText(platformList,$("#platform").val())];

			game.genre = ["Genre", getOptionText(genreList,$("#genre").val())];

			game.publisher = ["Publisher", $("#publisher").val()];
			game.developer = ["Developer", $("#developer").val()];

			if ($("#completed_yes").checked) {
				game.completed = ["Completed", "Yes"];
			} else {
				game.completed = ["Completed", "No"];
			};

			// Purchased
			game.purchased = ["Purchased", $("#purchased").val()];
			game.purchased_amount = ["Purchase Amount", $("#purchased_amount").val()];

/*
			// Free
			game.free = ["Acquired", $("#free").val()];
*/

			// Sold
			game.sold = ["Sold", $("#sold").val()];
			game.sold_amount = ["Sold Amount", $("#sold_amount").val()];


			// Special Notes
			game.notes = ["Special Notes", $("#notes").val()];

			// Favorite
			if ($("#favorite").checked) {
				game.favorite = ["Favorite", "Yes"];
			} else {
				game.favorite = ["Favorite", "No"];
			};


		// Save Date into Local Storage: Stringify converts Coupon object to a string for local storage capability.
		$.couch.db("asdi").saveDoc(game, {
		    success: function(data) {
		        console.log(data);
		    },
		    error: function(status) {
		        console.log(status);
		    }
		});

		alert("Game Has Been Saved!");

		window.location.reload();

	};
	// ##################################
	// Save Game to Local Storage
	// ##################################

	// ####################################################################
	// END Create
	// ####################################################################



	function hideConditionals() {
		$("#free_d").hide();
		$("#purchased_d").hide();
		$("#sold_d").hide();
	};
	hideConditionals();

	$("#purchased_q").change(function() {
		if ($(this).attr("checked")) {
			$("#purchased_d").slideDown();
			setDefaults("#purchased");
		} else {
			$("#purchased_d").slideUp();
			removeDefaults("#purchased");
		}
	});

	$("#free_q").change(function() {
		if ($(this).attr("checked")) {
			$("#free_d").slideDown();
			setDefaults("#free");
		} else {
			$("#free_d").slideUp();
			removeDefaults("#free");
		}
	});

	$("#sold_q").change(function() {
		if ($(this).attr("checked")) {
			$("#sold_d").slideDown();
			setDefaults("#sold");
		} else {
			$("#sold_d").slideUp();
			removeDefaults("#sold");
		}
	});

});
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// END Create
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################



// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// Page : Display
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################

$('#display').on('pageinit', function(){
	// display games if there are games in local storage
	$("#games_load").slideDown();

	$("#games_load_db_json").on("click", loadGamesDataDBJSON);
});
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// END Page : Display
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################



// ####################################################################
// Read
// ####################################################################



// ##################################
// ##################################
// Make edit coupon link list
// ##################################
// ##################################

// Create the edit and delete links for each store coupon when displayed
function makeEditList(doc, editGameListRow) {

	/* Edit Game
	var editLinkLi = $("<li></li>");
	var editLink = $("<a></a>");
		editLink.href = "#";
		editLink.key = key; // Key value of the display coupon

		editLink.on("click",function() {
			editGame(key);
		});

	var editText = "Edit Game";

	editLink.html(editText);

	editLinkLi.append(editLink);
	editGameListRow.append(editLinkLi);
	*/



	// Delete Game
	var deleteLinkLi = $("<li></li>");
	var deleteLink = $("<a></a>");
		deleteLink.href = "#";
		deleteLink.doc = doc; // Key value of the display gameGenres

		$(deleteLink).css("cursor","pointer"); // CSS

		deleteLink.on("click", function() {
			deleteGame(doc);
		});

	var deleteText = "Delete Game";
		deleteLink.html(deleteText);

	deleteLinkLi.append(deleteLink);
	editGameListRow.append(deleteLinkLi);

};
// ##################################
// Make edit coupon link list
// ##################################


// ####################################################################
// END Read
// ####################################################################


// ####################################################################
// Update
// ####################################################################

// ##################################
// ##################################
// Edit saved game
// ##################################
// ##################################
function editGame(key) {
// Edit saved game's details

	// Grab the data from our item in Local Storage
	var value = localStorage.getItem(key);
	var game = JSON.parse(value);

	// populate form fields with data from local storage
	$("#title").val(game.title[1]);

	$("#platform").selectedIndex = getOptionValueIndex(platformList,game.platform[1]);

	$("#genre").selectedIndex = getOptionValueIndex(genreList,game.genre[1]);

	$("#publisher").val(game.publisher[1]);
	$("#developer").val(game.developer[1]);

	if (game.completed[1] === "Yes") {
		$("#completed_yes").attr("checked",true).checkboxradio("refresh");
	} else {
		$("#completed_no").attr("checked",true).checkboxradio("refresh");
	};

	// Purchased
	$("#purchased").val(game.purchased[1]);
	$("#purchased_amount").val(game.purchased_amount[1]);

	// Free
	$("#sold").val(game.free[1]);

	// Sold
	$("#sold").val(game.sold[1]);

	if (game.sold[1] != "n/a") {
		$("#sold_q").attr("checked",true).checkboxradio("refresh");
		$("#sold_d").css("display","block");
		$("#sold_amount").val(game.sold[1]);
	};

	if (game.sold_amount[1] != "n/a") {
		$("#sold_amount").val(game.sold_amount[1]);
	};

	// Special Notes
	$("#notes").val(game.notes[1]);

	// Favorite
	if (game.favorite[1] === "Yes") {
		$("#favorite").attr("checked","true");
	};

	var editSubmit = $("#submit")
		editSubmit.val("[#] Edit Game");

	$("#submit").on("click",function() {
		saveEditedGame(key);
	});

};
// ##################################
// Edit saved game
// ##################################


// ##################################
// Save Edited Game
// ##################################
function saveEditedGame(key) {
	saveGame(key);
};
// ##################################
// END Save Edited Game
// ##################################

// ####################################################################
// END Update
// ####################################################################


// ####################################################################
// Delete
// ####################################################################

// ##################################
// ##################################
// Delete saved game
// ##################################
// ##################################
function deleteGame(doc) {
// Delete game from local storage

	var confirmDelete = confirm("Are you sure you want to delete this game?")
	if (confirmDelete) {

		$.couch.db("asdi").removeDoc(doc, {
		     success: function(data) {
		         console.log(data);
		    },
		    error: function(status) {
		        console.log(status);
		    }
		});

		alert("Your game has been deleted.");
		window.location.reload();
	} else {
		alert("Game was not deleted.")
	}
	return false;
};
// ##################################
// Delete saved game
// ##################################




// ##################################
// ##################################
// Deleted ALL Game(s) From Local Storage
// ##################################
// ##################################
function deleteGames() {
	if (localStorage.length === 0){
		alert("There are no games saved.");
	} else {
		localStorage.clear();
		alert("Your games have been deleted.");
		window.location.reload();
		return false;
	};

};
// ##################################
// Deleted ALL Game(s) From Local Storage
// ##################################

// ####################################################################
// END Delete
// ####################################################################




//
// Utiliy Functions
//

// ##################################
// ##################################
// Cancel
// ##################################
// ##################################
$("#cancel a").on("click",function() {
	window.location.reload();
});
// ##################################
// END Cancel
// ##################################

// ##################################
// ##################################
// Load Games from Couch App
// ##################################
// ##################################
function loadGamesDataDBJSON() {
    $.ajax({
        type: "GET",
        url: "_view/games",
        dataType: "json",
        success: function(data) {processDataDBJSON(data);}
     });

    function processDataDBJSON(data) {

    if (!data) {
	    alert("Unable to load games. There are no games saved.");
    } else {

    		$("#games_load").slideUp();

			var gameListDiv = $("<div></div>");
				gameListDiv.attr("id", "games");

			// Create Game List UL
			var gameListUl = $("<ul></ul>");
				gameListDiv.append(gameListUl); // Add UL to Games List DIV

			// Add Games List DIV to Games List SECTION
			$("#games_list").append(gameListDiv);

				// Array to Hold All Games
				var games = [];
				var games_records = [];

				// Load example games if there is no data stored
				$.each(data.rows, function(index, value) {

					var game_record = {};
						game_record._id = value.id,
						game_record._rev = value.value._rev

					games_records.push(game_record);


					var game = {};
						game.title = value.value.title,
						game.platform = value.value.platform,
						game.genre = value.value.genre,
						game.publisher = value.value.publisher,
						game.developer = value.value.developer,
						game.completed = value.value.completed,
						game.purchased = value.value.purchased,
						game.purchased_amount = value.value.purchased_amount,
						game.sold = value.value.sold,
						game.sold_amount = value.value.sold_amount,
						game.notes = value.value.notes,
						game.favorite = value.value.favorite;

					games.push(game);
				});


				// Add Each Game to Full Games List
				for (var i = 0; i < games.length; i++) {
					var gamesListLi = $("<li></li>");
					$("#games_list_ul").append(gamesListLi);

					$(gamesListLi).append("<li>" + games[i].title[1]  + "<br /><span class=\"option_platform\">Platform: " + games[i].platform[1] + "</li>");

					// Create Single Game UL
					var gamesSubList = $("<ul></ul>");
						gamesSubList.attr("class","game");

						// Append to Full Games List
						$(gamesListLi).append(gamesSubList);

					for (n in games[i]) {

						var gamesSubListLi = $("<li></li>");
						$(gamesSubList).append(gamesSubListLi);

						var optionName = games[i][n][0],
							optionDetail = games[i][n][1];

							if (!optionDetail) { optionDetail = "N/A"; }

						$(gamesSubListLi).append("<strong class=\"option_name\">" + optionName + "</strong>: <span class=\"option_detail\">" + optionDetail + "</span>");
					}

					var doc = {};
						doc = {
							_id: games_records[i]._id,
							_rev: games_records[i]._rev
						};


					// Add Edit List
					makeEditList(doc, gamesSubListLi);


					$(".game").css("marginBottom","20px");
					$(".game").css("listStyleType","none");
					$(".game").css("paddingLeft","0");


				};

									$("#games_list_ul").listview("refresh");


			};
	};

};
// ##################################
// END Load Games from Couch App
// ##################################


// ##################################
// ##################################
// Event Listeners
// ##################################
// ##################################

/* Clear Games */
$(".clear_games").click(deleteGames);

// ##################################
// Event Listeners
// ##################################


