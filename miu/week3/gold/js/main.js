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
		/*
		var myForm = $('#gameForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
				var data = myForm.serializeArray();
					storeData(data);
				}
			});
		*/
	
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
			genreSelect.id = "genre";
			genreSelect.name = "genre";
		
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

	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};