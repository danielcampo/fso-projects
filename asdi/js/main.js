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
	["platform_ps3","PlayStation 3"],
	["platform_psvitapsp","PlayStation Vita / PSP"],
	["platform_wii", "Wii / Wii U"],
	["platform_xbox360", "XBOX 360"]
];

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
			createOption = $("<option></option>");
				createOption.attr("value", platformList[n][0]);

			// Option Text
			optionText = platformList[n][1];

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
			createOption = $("<option></option>");
				createOption.attr("value", genreList[n][0]);

			// Option Text
			optionText = genreList[n][1];

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

			// Free
			game.free = ["Acquired", $("#free").val()];

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
		localStorage.setItem(id, JSON.stringify(game));

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
	displayGames();

	$("#games_load_json").on("click", loadGamesDataJSON);
	$("#games_load_csv").on("click", loadGamesDataCSV);
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
// Display Game(s) From Local Storage
// ##################################
// ##################################
function displayGames() {

	if (localStorage.length != 0) {
		$("#games_load").slideUp();
	};

	// Create the Games List DIV
	var gameListDiv = $("<div></div>");
		gameListDiv.attr("id", "games");

	// Create Game List UL
	var gameListUl = $("<ol></ol>");

		// Add UL to Games List DIV
		gameListDiv.append(gameListUl);

		// Add Games List DIV to Games List SECTION
		$("#games_list").append(gameListDiv);

	for(var i = 0, storageLength = localStorage.length; i < storageLength; i++) {

		// Add New Row to Table
		var makeLi = $("<li></li>");
		gameListUl.append(makeLi);



		// Link List
		var editGameListLi = $("<li></li>");
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);


		var makeSubList = $("<ul></ul>");
		makeLi.append(makeSubList);

		// getImage(obj.genre[1], makeSubList);

			for(var n in obj) {

				// Add New Row to Table
				var li_optionName = $("<li></li>");
				makeSubList.append(li_optionName);

					var optName = "<strong>"+obj[n][0]+"</strong>";
					li_optionName.html(optName);

					var li_optionValue = $("<li></li>");
					makeSubList.append(li_optionValue);

					var optValue = obj[n][1];
					if (optValue == "") {
						li_optionValue.html("n/a");
					} else {
						li_optionValue.html(optValue);
					};


				makeSubList.append(editGameListLi);
			}


			makeEditList(localStorage.key(i), editGameListLi); // Callback to function that creates the edit game link list.
		};

		return false;
};
// ##################################
// Display Game(s) From Local Storage
// ##################################

// ##################################
// ##################################
// Make edit coupon link list
// ##################################
// ##################################

// Create the edit and delete links for each store coupon when displayed
function makeEditList(key, editGameListRow) {

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
		deleteLink.key = key; // Key value of the display gameGenres

		deleteLink.on("click", function() {
			deleteGame(key);
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
function deleteGame(key) {
// Delete game from local storage

	var confirmDelete = confirm("Are you sure you want to delete this game?")
	if (confirmDelete) {
		localStorage.removeItem(key);
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
// Load Games Using AJAX
// ##################################
// ##################################
function loadGamesDataJSON() {
    $.ajax({
        type: "GET",
        url: "xhr/data.js",
        success: function(data) {processDataJSON(data);}
     });

     function processDataJSON(data) {

		// Load example games if there is no data stored
		for (n in json) {
			var id = Math.floor(Math.random()*100000001); // Could not use timestamp since data is populated instantly
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
		displayGamesNow();	
	};
};
// ##################################
// END Load Games Using AJAX
// ##################################


// ##################################
// ##################################
//	Load Games Using CSV
// ##################################
// ##################################
function loadGamesDataCSV() {
    $.ajax({
        type: "GET",
        url: "xhr/data.csv",
        success: function(data) {processDataCSV(data);}
     });
	 
	function processDataCSV(data) {
		var dataLines = data.split('\n');
		var headers = dataLines[0].split(',');
		var lines = [];

		for (var i=1; i<dataLines.length; i++) {
			var data = dataLines[i].split(',');
	
			if (data.length == headers.length) {
				
				var temp_tarr = [];
				var tarr = [];
				
				// create separate arrays for each field name and corresponding user data
				for (var j=0; j<headers.length; j++) {	
					
					// create [field name, user data] array 
					temp_tarr.push([headers[j],data[j]]);
					
					// push to final array
					tarr.push(temp_tarr);
				}
				lines.push(tarr);
				
				// console.log("interval: "+j);
			}
			
		}
		
		for (n in lines) {
			if (n != 0) {
				var id = Math.floor(Math.random()*100000001); // Could not use timestamp since data is populated instantly
				localStorage.setItem(id, JSON.stringify(lines[n][0]));
			};
		};
		
		displayGamesNow();
	}
}

// ##################################
// END Load Games Using CSV
// ##################################


		function displayGamesNow() { 
		
			// Make sure items were saved
			if (localStorage.length != 0) {
				confirm("Your games have been loaded. View them now?");

				if (displayGamesNow) {
					$("#games_load").slideUp();
					displayGames(); // Display example coupons after data has been loaded
				} else {
					alert("Your games will not be displayed");
				};
			};
		
		};

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


