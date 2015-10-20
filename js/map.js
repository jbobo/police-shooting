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
	console.log(data);
	// Be sure to add each layer to the map
	// var circle = new L.circleMarker([latitude, longitude], options)
	//alert(data[0]["Victim's Age"])
	var armed = new L.LayerGroup([])
	var unarmed = new L.LayerGroup([])

	data.forEach(function(d) {
		if(d["Victim's Age"] <18) {
			var color = "blue"
		}else{
			var color = "red"
		}
		var circle = new L.CircleMarker([d.lat, d.lng], {fill:color,
		})
		circle.bindPopup('<strong>City: </strong>' + d.City + '<br><strong>State: </strong>'+d.State+'<br><strong>Name: </strong>' + d["Victim Name"] + '<br><strong>Age: </strong>' + d["Victim's Age"] + '<br><strong>Gender: </strong>' + d["Victim's Gender"] + '<br><strong>Weapon Used: </strong>' + d["Weapon"] + '<br><strong>Date of Altercation: </strong>' + d["Timestamp"] + '<br><strong>Summary of Altercation: </strong>' + d["Summary"] + '<br><strong>Result of Altercation: </strong>' + d["Hit or Killed?"] + '<br><strong></strong>' + d["Victim's Age"])
		if(d["Weapon"] = "Unarmed") {
			circle.addTo(unarmed)	
		}else{
			circle.addTo(armed)
		}
	})
	// circle.addTo(layer)
	// Once layers are on the map, add a leaflet controller that shows/hides layers
	var overlayMaps = {
    		"Armed Suspects": armed,
		"Unarmed Suspects": unarmed
	};
	L.control.layers(null,armed, unarmed).addTo(map);

}

