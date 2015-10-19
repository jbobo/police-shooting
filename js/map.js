// Function to draw your map
var drawMap = function() {

  // Create map and set view
 	var map = L.map('container').setView([39, 15028], 4)
	// [39, 15028], 4
	// [latitude, longitude], zoom

  // Create a tile layer variable using the appropriate url
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')

  // Add the layer to your map
 	layer.addTo(map)

  // Execute your function to get data
 	getData().done(customBuild);
	//getData()
}

// Function for getting data
var getData = function() {

  // Execute an AJAX request to get the data in data/response.js
	return $.ajax( {
			url: "data/response.json", 
			type: 'GET',
			dataType:"json"
		});
	//Found an example of decoupling the success callback from the AJAX handling here: http://stackoverflow.com/questions/14754619/jquery-ajax-success-callback-function-definition	
	
	//var data; 

	//$.ajax({
   	//	url:'data/response.json',
    	//	type: "get",
   	// 	success: customBuild(dat) {
    	// 		data = dat
   	// 	}
   	//	//dataType:"json"
	//}); 

  // When your request is successful, call your customBuild function
	
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(data) {
	alert(data);
	// Be sure to add each layer to the map
	// var circle = new L.circleMarker([latitude, longitude], options)
	var incidents = new L.LayerGroup([])
	// circle.addTo(layer)
	// Once layers are on the map, add a leaflet controller that shows/hides layers
  L.control.layers(null,layers).addTo(map);

}

