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
				var editCouponListLi = document.createElement("li");
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var obj = JSON.parse(value);


				var makeSubList = document.createElement("ul");
					makeSubList.setAttribute("data-role", "listview");
				makeLi.appendChild(makeSubList);

				getImage(obj.ctype[1], makeSubList);

					for(var n in obj) {

						// Add New Row to Table
						var li_optionName = document.createElement("li");
						makeSubList.appendChild(li_optionName);

							var optName = "<strong>"+obj[n][0]+"</strong>";
							li_optionName.innerHTML = optName;

						var li_optionValue = document.createElement("li");
						makeSubList.appendChild(li_optionValue);

							var optValue = obj[n][1];
							li_optionValue.innerHTML = optValue;

						makeSubList.appendChild(editCouponListLi);
					}


					makeEditList(localStorage.key(i), editCouponListLi); // Callback to function that creates the edit coupon link list.
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
		function makeEditList(key, editCouponListRow) {

			// Edit Coupon
			var editLinkCell = document.createElement("td");
			var editLink = document.createElement("a");
				editLink.href = "#";
				editLink.key = key; // Key value of the display coupon

				editLink.addEventListener("click", editCoupon);

			var editText = "Edit Coupon";

			editLink.innerHTML = editText;

			editLinkCell.appendChild(editLink);
			editCouponListRow.appendChild(editLinkCell);



			// Delete Coupon
			var deleteLinkCell = document.createElement("td");
			var deleteLink = document.createElement("a");
				deleteLink.href = "#";
				deleteLink.key = key; // Key value of the display gameGenres

				// deleteLink.addEventListener("click", deleteCoupon);

			var deleteText = "Delete Coupon";
				deleteLink.innerHTML = deleteText;

			deleteLinkCell.appendChild(deleteLink);
			editCouponListRow.appendChild(deleteLinkCell);

		};

		function editCoupon() {
			// Grab the data from our item in Local Storage
			var value = localStorage.getItem(this.key);
			var coupon = JSON.parse(value);

			// populate form fields with data from local storage

				// Coupon Type
				$("ctype").value = coupon.ctype[1];

				// Coupon Name
				$("pname").value = coupon.pname[1];

				$("manufacturer").value = coupon.manufacturer[1];
				$("store").value = coupon.store[1];

				// Dates
				$("effective").value = coupon.effective[1];
				$("expiration").value = coupon.expiration[1];

				// Discount
				coupon.minimum = ["Minimum Purchase", amountMinimum];
				coupon.amount = ["Discount Amount", $("amount").value];

				// Special Notes
				coupon.notes = ["Special Notes", $("notes").value];
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
		function saveCoupon() {
			var id = Math.round(new Date().getTime() / 1000);
			// Store Form Fields Value Into an Object
			// Label & Value Will Be Stored.

			// Set Button Values
			getAmountMinimum(); // @output amountMinimum


			var coupon = {};

				// Coupon Type
				coupon.ctype = ["Coupon Type", $("ctype").value];

				// Coupon Name
				coupon.pname = ["Product Name", $("pname").value];

				// TODO - Create these form items dynamically with the array function
				// TODO - Hide items until corresponding option is select in the dropdown
				coupon.manufacturer = ["Manufacturer Name", $("manufacturer").value];
				coupon.store = ["Store Name", $("store").value];

				// Dates
				coupon.effective = ["Start Date", $("effective").value];
				coupon.expiration = ["Expiration Date", $("expiration").value];

				// Discount
				coupon.minimum = ["Minimum Purchase", amountMinimum];
				coupon.amount = ["Discount Amount", $("amount").value];

				// Special Notes
				coupon.notes = ["Special Notes", $("notes").value];

			// Save Date into Local Storage: Stringify converts Coupon object to a string for local storage capability.
			localStorage.setItem(id, JSON.stringify(coupon));
			alert("Coupon Has Been Saved!");
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
		saveGameLink.addEventListener("click", saveCoupon);



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