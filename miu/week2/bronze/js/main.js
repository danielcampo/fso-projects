/*
Daniel Campo
FSO - Mobile Development
Mobile Interfaces & Usability

App Name: Game Collector
App Description: Keep track of your extensive game library.
*/

//Wait Until DOM is Loaded
window.addEventListener("DOMContentLoaded", function() {


	// @purpose Get Element By ID
	// @return Element
	function $(x) {
		var myElement = document.getElementById(x);
		return myElement;
	}

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
		var platformLabel = document.createElement("label");
			platformLabel.setAttribute("for","platform");
		
		var platformLabelText = document.createTextNode("Platform ");	
		platformLabel.appendChild(platformLabelText);
		
		$("platform_list").appendChild(platformLabel);
		
		// Select
		var platformSelect = document.createElement("select");
			platformSelect.id = "platform";
			platformSelect.name = "platform";
		
		for (n = 0; n < platformList.length; n++) {
			createOption = document.createElement("option");
				createOption.setAttribute("value", platformList[n][0]);
			
			// Option Text
			optionText = document.createTextNode(platformList[n][1]);
			
			// Append Option Text
			createOption.appendChild(optionText);
			
			platformSelect.appendChild(createOption);
			
		};
		
		// Append Select to #platform
		$("platform_list").appendChild(platformSelect);	

	};
	createPlatformList();


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
		var genreLabel = document.createElement("label");
			genreLabel.setAttribute("for","genre");
		
		var genreLabelText = document.createTextNode("Genre ");	
		genreLabel.appendChild(genreLabelText);
		
		$("genre_list").appendChild(genreLabel);
		
		// Select
		var genreSelect = document.createElement("select");
			genreSelect.id = "genre";
			genreSelect.name = "genre";
		
		for (n = 0; n < genreList.length; n++) {
			createOption = document.createElement("option");
				createOption.setAttribute("value", genreList[n][0]);
			
			// Option Text
			optionText = document.createTextNode(genreList[n][1]);
			
			// Append Option Text
			createOption.appendChild(optionText);
			
			genreSelect.appendChild(createOption);
			
		};
		
		// Append Select to #genre
		$("genre_list").appendChild(genreSelect);
	};
	createGenreList();
	
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
	
	// Event Functions
	
		// ##################################
		// ##################################
		// Save Game to Local Storage
		// ##################################
		// ##################################
		function saveGame(key) {
			if (!key) {
				var id = Math.round(new Date().getTime() / 1000);
			} else {
				var id = key;
			};
			// Store Form Fields Value Into an Object
			// Label & Value Will Be Stored.

			var game = {};

				game.title = ["Title", $("title").value];

				game.platform = ["Platform", getOptionText(platformList,$("platform").value)];

				game.genre = ["Genre", getOptionText(genreList,$("genre").value)];

				game.publisher = ["Publisher", $("publisher").value];
				game.developer = ["Developer", $("developer").value];

				if ($("completed_yes").checked) {
					game.completed = ["Completed", "Yes"];
				} else {
					game.completed = ["Completed", "No"];
				};

				// Purchased
				game.purchased = ["Purchased", $("purchased").value];
				game.purchased_amount = ["Purchase Amount", $("purchased_amount").value];

				// Sold
				game.sold = ["Sold", $("sold").value];
				game.sold_amount = ["Sold Amount", $("sold_amount").value];


				// Special Notes
				game.notes = ["Special Notes", $("notes").value];

				// Favorite
				if ($("favorite").checked) {
					game.favorite = ["Favorite", "Yes"];
				} else {
					game.favorite = ["Favorite", "No"];
				};

			// Save Date into Local Storage: Stringify converts Coupon object to a string for local storage capability.
			localStorage.setItem(id, JSON.stringify(game));
			
			alert("Game Has Been Saved!");

		};
		// ##################################
		// Save Game to Local Storage
		// ##################################
	
		// ##################################
		// ##################################
		// Display Game(s) From Local Storage
		// ##################################
		// ##################################
		function displayGames() {
			toggleControls("game_form","hide");
			$("add_game").style.display = "inline";

			if (localStorage.length === 0) {
				alert("There are no games saved so examples were added.");
				exampleCouponData();
			} else {

			// Create the Coupon List Div
			var gameListDiv = document.createElement("div");
				gameListDiv.setAttribute("id", "games");

			// Add A List to Div
			var gameListUl = document.createElement("ul");

				// Add List to Div
				gameListDiv.appendChild(gameListUl);

				// Add Div to Body
				$("games_list").appendChild(gameListDiv);

			for(var i = 0, storageLength = localStorage.length; i < storageLength; i++) {

				// Add New Row to Table
				var makeLi = document.createElement("li");
				gameListUl.appendChild(makeLi);



				// Link List
				var editGameListLi = document.createElement("li");
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var obj = JSON.parse(value);


				var makeSubList = document.createElement("ul");
				makeLi.appendChild(makeSubList);

				// getImage(obj.genre[1], makeSubList);

					for(var n in obj) {

						// Add New Row to Table
						var li_optionName = document.createElement("li");
						makeSubList.appendChild(li_optionName);

							var optName = "<strong>"+obj[n][0]+"</strong>";
							li_optionName.innerHTML = optName;

							var li_optionValue = document.createElement("li");
							makeSubList.appendChild(li_optionValue);

							var optValue = obj[n][1];
							if (optValue == "") {
								li_optionValue.innerHTML = "n/a";
							} else {
								li_optionValue.innerHTML = optValue;
							};


						makeSubList.appendChild(editGameListLi);
					}


					makeEditList(localStorage.key(i), editGameListLi); // Callback to function that creates the edit coupon link list.
				}

				return false;
			}

		}
		// ##################################
		// Display Game(s) From Local Storage
		// ##################################	
		

		// ##################################
		// ##################################
		// Get the image for the game genre
		// ##################################
		// ##################################
		function getImage(imgSrcFull, makeSubTable) {
			var imgSrc = "";

			if (imgSrcFull == "Manufacturer Coupon") {
				imgSrc = "couponKeeper_maCoupon";
			} else if (imgSrcFull == "Store Coupon") {
				imgSrc = "couponKeeper_stCoupon";
			} else {
				imgSrc = "couponKeeper_maCoupon";
			};


			var imageRow = document.createElement("tr");
			var imageCell = document.createElement("td");

			imageRow.appendChild(imageCell);
			makeSubTable.appendChild(imageRow);

			var couponImage = document.createElement("img");
				couponImage.setAttribute("src", "img/" + imgSrc + ".png");

				imageCell.appendChild(couponImage);
		};
		// ##################################
		// Get the image for the game genre
		// ##################################


		// ##################################
		// ##################################
		// Make edit coupon link list
		// ##################################
		// ##################################
		
		// Create the edit and delete links for each store coupon when displayed
		function makeEditList(key, editGameListRow) {

			// Edit Coupon
			var editLinkLi = document.createElement("li");
			var editLink = document.createElement("a");
				editLink.href = "#";
				editLink.key = key; // Key value of the display coupon

				editLink.addEventListener("click", editGame);

			var editText = "Edit Game";

			editLink.innerHTML = editText;

			editLinkLi.appendChild(editLink);
			editGameListRow.appendChild(editLinkLi);



			// Delete Game
			var deleteLinkLi = document.createElement("li");
			var deleteLink = document.createElement("a");
				deleteLink.href = "#";
				deleteLink.key = key; // Key value of the display gameGenres

				deleteLink.addEventListener("click", deleteGame);

			var deleteText = "Delete Game";
				deleteLink.innerHTML = deleteText;

			deleteLinkLi.appendChild(deleteLink);
			editGameListRow.appendChild(deleteLinkLi);

		};
		// ##################################
		// Make edit coupon link list
		// ##################################
		
		
		// ##################################
		// ##################################
		// Edit saved game
		// ##################################
		// ##################################
		function editGame() {
		// Edit saved game's details
			toggleControls("game_form", "show")

			// Grab the data from our item in Local Storage
			var value = localStorage.getItem(this.key);
			var game = JSON.parse(value);

			// populate form fields with data from local storage
			$("title").value = game.title[1];
			
			$("platform").selectedIndex = getOptionValueIndex(platformList,game.platform[1]);

			$("genre").selectedIndex = getOptionValueIndex(genreList,game.genre[1]);

			$("publisher").value = game.publisher[1];
			$("developer").value = game.developer[1];

			if (game.completed[1] === "Yes") {
				$("completed_yes").checked = true;
			} else {
				$("completed_no").checked = true;
			};

			// Purchased
			$("purchased").value = game.purchased[1];
			$("purchased_amount").value = game.purchased_amount[1];


			// Sold
			$("sold").value = game.sold[1];
			if (game.sold[1] != "n/a") {
				$("sold_amount").value = game.sold[1];
			};

			if (game.sold_amount[1] != "n/a") {
				$("sold_amount").value = game.sold_amount[1];
			};

			// Special Notes
			$("notes").value = game.notes[1];
			
			console.log(game.favorite);
			
			// Favorite
			if (game.favorite[1] === "Yes") {
				$("favorite").checked = true;
			};
			
			$("submit").value = "[#] Edit Game";
			
			submit.removeEventListener("click",saveGame);
			
			var editAdd = $("submit");
			editAdd.addEventListener("click", saveEditedGame);
			editAdd.key = this.key;

		};
		// ##################################
		// Edit saved game
		// ##################################
	
		function saveEditedGame(e) {
			saveGame(this.key);
		};
		
		
		
		
		// ##################################
		// ##################################
		// Delete saved game
		// ##################################
		// ##################################
		function deleteGame() {
		// Delete game from local storage
			var value = this.key;

			var confirmDelete = confirm("Are you sure you want to delete this game?")
			if (confirmDelete) {
				localStorage.removeItem(value);
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
		function deleteCoupons() {
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

		// ##################################
		// ##################################
		// Hide form and relevant controls when games are displayed
		// ##################################
		// ##################################
		function toggleControls(obj, n) {
			switch(n) {
				case "hide":
					$(obj).style.display = "none";
					$("clear_games").style.display = "inline";
					$("display_games").style.display = "none";
					// $("add_coupon").style.display = "inline";
					break;
					case "show":
					$(obj).style.display = "block";
					$("clear_games").style.display = "inline";
					$("display_games").style.display = "inline";
					// $("add_coupon").style.display = "none";
					$("games").style.display = "block";
					break;
				default:
					return false;

			};
		};
		// ##################################
		// Hide form and relevant controls when games are displayed
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
	// Event Listeners
	// ##################################
	// ##################################
	
		/* Display Games */
		var displayGamesLink = $("display_games");
		displayGamesLink.addEventListener("click", displayGames);

		/* Clear Games */
		var clearGamesLink = $("clear_games");
		clearGamesLink.addEventListener("click", deleteCoupons);

		/* Save Game */
		var saveGameLink = $("submit");
		saveGameLink.addEventListener("click", saveGame);
		
	// ##################################
	// Event Listeners
	// ##################################

});