/*
Daniel Campo
FSO - Mobile Development
Mobile Interfaces & Usability

App Name: Game Collector
App Description: Keep track of your extensive game library.
*/

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

$('#add').on('pageinit', function(){
		var myForm = $('#gameForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
				var data = myForm.serializeArray();
					saveGame(data);
				}
			});

	//any other code needed for addItem page goes here.

	/* ################################ */
	/* ################################ */
	/* Form Building Functions */
	/* ################################ */
	/* ################################ */
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

	// ##################################
	// ##################################
	// Event Listeners
	// ##################################
	// ##################################

		/* Display Games */
		$("#display_games").click(displayGames);

		/* Clear Games */
		$("#clear_games").click(deleteGames);

		/* Save Game */

	// ##################################
	// Event Listeners
	// ##################################


		var autofillData = function (){

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


		// ####################################################################
		// Read
		// ####################################################################

		// ##################################
		// ##################################
		// Display Game(s) From Local Storage
		// ##################################
		// ##################################
		function displayGames() {
			toggleControls("game_form","hide");

			if (localStorage.length === 0) {
				alert("There are no games saved so examples were added.");
				exampleCouponData();
			} else {

			// Create the Coupon List Div
			var gameListDiv = $("<div></div>");
				gameListDiv.attr("id", "games");

			// Add A List to Div
			var gameListUl = $("<ul></ul>");

				// Add List to Div
				gameListDiv.append(gameListUl);

				// Add Div to Body
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
				}

				return false;
			}

		}
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

			// Edit Coupon
			var editLinkLi = $("<li></li>");
			var editLink = $("<a></a>");
				editLink.href = "#";
				editLink.key = key; // Key value of the display coupon

				editLink.click(function() {
					editGame(key);
				});

			var editText = "Edit Game";

			editLink.html(editText);

			editLinkLi.append(editLink);
			editGameListRow.append(editLinkLi);



			// Delete Game
			var deleteLinkLi = $("<li></li>");
			var deleteLink = $("<a></a>");
				deleteLink.href = "#";
				deleteLink.key = key; // Key value of the display gameGenres

				deleteLink.click(function() {
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
			toggleControls("game_form", "show")

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

			$("#submit").click(function() {
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
			}else {
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
		$("#cancel a").click(function() {
			window.location.reload();
		});
		// ##################################
		// END Cancel
		// ##################################

		// ##################################
		// ##################################
		// Add Example Coupon Data
		// ##################################
		// ##################################
		function exampleCouponData() {
			// Load example games if there is no data stored
			for (n in json) {
				var id = Math.floor(Math.random()*100000001); // Could not use timestamp since data is populated instantly
				localStorage.setItem(id, JSON.stringify(json[n]));
			};

			displayGames(); // Display example coupons after data has been loaded
		};
		// ##################################
		// Add Example Coupon Data
		// ##################################


		// ##################################
		// ##################################
		// Hide form and relevant controls when games are displayed
		// ##################################
		// ##################################
		function toggleControls(obj, n) {
			switch(n) {
				case "hide":
					$("#"+obj).css("display","none");
					// $("#clear_games").css("display","inline");
					// $("#display_games").css("display","none");
					// $("#add_coupon").css("display","inline");
					break;
					case "show":
					$("#"+obj).css("display","block");
					// $("#clear_games").css("display","inline");
					// $("#display_games").css("display","inline");
					// $("#add_coupon").css("display","none");
					// $("#games").css("display","block");
					break;
				default:
					return false;

			};
		};
		// ##################################
		// Hide form and relevant controls when games are displayed
		// ##################################

		function hideConditionals() {
			$("#sold_d").hide();
		};
		hideConditionals();

		$("#sold_q").change(function() {

			if ($(this).attr("checked")) {
				$("#sold_d").slideDown();
			} else {
				$("#sold_d").slideUp();
			}
		});

});

