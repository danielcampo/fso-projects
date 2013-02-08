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


	// Event Functions

		// Display Game(s) From Local Storage
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

		// Get the image for the coupon type
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


		// Make edit coupon link list
		// Create the edit and delete links for each store coupon when displayed
		function makeEditList(key, editGameListRow) {

			// Edit Coupon
			var editLinkCell = document.createElement("td");
			var editLink = document.createElement("a");
				editLink.href = "#";
				editLink.key = key; // Key value of the display coupon

				editLink.addEventListener("click", editGame);

			var editText = "Edit Coupon";

			editLink.innerHTML = editText;

			editLinkCell.appendChild(editLink);
			editGameListRow.appendChild(editLinkCell);



			// Delete Coupon
			var deleteLinkCell = document.createElement("td");
			var deleteLink = document.createElement("a");
				deleteLink.href = "#";
				deleteLink.key = key; // Key value of the display gameGenres

				// deleteLink.addEventListener("click", deleteCoupon);

			var deleteText = "Delete Coupon";
				deleteLink.innerHTML = deleteText;

			deleteLinkCell.appendChild(deleteLink);
			editGameListRow.appendChild(deleteLinkCell);

		};

		function editGame() {
			// Grab the data from our item in Local Storage
			var value = localStorage.getItem(this.key);
			var coupon = JSON.parse(value);

			// populate form fields with data from local storage

		};





		// Clear Game(s) From Local Storage
		function clearCoupons() {
			if (localStorage.length === 0){
				alert("There are no games saved.");
			}else {
				localStorage.clear();
				alert("Your games have been cleared.");
				window.location.reload();
				return false;
			};

		};


		// Delete Single Game
		function clearCouponsSingle() {
			localStorage.clear();
			alert("Your game has been cleared.");
			window.location.reload();
			return false;
		};


		// Save Coupon to Local Storage
		function saveGame() {
			var id = Math.round(new Date().getTime() / 1000);
			// Store Form Fields Value Into an Object
			// Label & Value Will Be Stored.

			var game = {};

				game.title = ["Title", $("title").value];

				game.platform = ["Platform", $("platform").value];

				game.genre = ["Genre", $("genre").value];

				game.publisher = ["Publisher", $("publisher").value];
				game.developer = ["Developer", $("developer").value];

				if ($("completion_yes").checked) {
					game.completion = ["Completed", "Yes"];
				} else {
					game.completion = ["Completed", "No"];
				};

				// Dates
				game.purchased = ["Purchased", $("purchased").value];
				game.sold = ["Sold", $("sold").value];

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


		// Hide form and relevant controls when games are displayed
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


	// Event Listeners
		/* Display Games */
		var displayGamesLink = $("display_games");
		displayGamesLink.addEventListener("click", displayGames);

		/* Clear Games */
		var clearGamesLink = $("clear_games");
		clearGamesLink.addEventListener("click", clearCoupons);

		/* Save Game */
		var saveGameLink = $("submit");
		saveGameLink.addEventListener("click", saveGame);



	// Add Example Coupon Data
	function exampleCouponData() {
		// Load example games if there is no data stored
		for (n in json) {
			var id = Math.floor(Math.random()*100000001); // Could not use timestamp since data is populated instantly
			localStorage.setItem(id, JSON.stringify(json[n]));
		};

		displayGames(); // Display example coupons after data has been loaded

	};



});