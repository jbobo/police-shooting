// Function to draw your map
var map;

var drawMap = function() {

  // Create map and set view
 	 map = L.map('container').setView([39, -94], 4);
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
	
	var armedMinorCount = 0
	var unarmedMinorCount = 0
	var armedAdultCount = 0
	var unarmedAdultCount = 0
	var armedUndefinedCount = 0
	var unarmedUndefinedCount = 0

	data.forEach(function(d) {
		var weapon = d["Armed or Unarmed?"]
		var age = d["Victim's Age"]
		if(age >= 18) {
			var fillColor = "red"
			var color = "transparent"
			if (weapon == "Armed") {
				armedAdultCount += 1
			}else{
				unarmedAdultCount += 1
			}
		}else if (age <= 17){
			var fillColor = "blue"
			var color = "transparent"
			if (weapon == "Armed") {
				armedMinorCount += 1
			}else{
				unarmedMinorCount += 1
			}
		} else {
			var fillColor = "green"
			var color = "transparent"
			if (weapon == "Armed") {
				armedUndefinedCount += 1
			}else{
				unarmedUndefinedCount += 1
			}
		}
		
		var circle = new L.CircleMarker([d.lat, d.lng], {fillColor: fillColor, color: color, radius:12})
		circle.bindPopup('<strong>City: </strong>' + d.City + '<br><strong>State: </strong>'+d.State+'<br><strong>Name: </strong>' + d["Victim Name"] + '<br><strong>Age: </strong>' + d["Victim's Age"] + '<br><strong>Gender: </strong>' + d["Victim's Gender"] + '<br><strong>Weapon Used: </strong>' + d["Weapon"] + '<br><strong>Date of Altercation: </strong>' + d["Timestamp"] + '<br><strong>Summary of Altercation: </strong>' + d["Summary"] + '<br><strong>Result of Altercation: </strong>' + d["Hit or Killed?"])
		if(d["Weapon"] == "Unarmed") {
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
	unarmed.addTo(map);
	armed.addTo(map);
	L.control.layers(null,overlayMaps).addTo(map);

	$('.title').append( '<table class = "table-striped table-hover">' + '<tr>' + '<td>  </td>' + '<th class = "c"> Undefined </th>' + '<th class = "c"> Minors </th>'+ '<th> Adults </th>' + '</tr>' + '<tr>' + '<th class = "l"> Armed </th>' + '<td class = "c"> ' + armedUndefinedCount + ' </td>' + '<td class = "c">' + armedMinorCount + '</td>' + '<td>' + armedAdultCount + '</td>' + '</tr>' + '<tr>' + '<th class = "l"> Unarmed </th>' + '<td class = "c">' + unarmedUndefinedCount + '</td>' + '<td class = "c">' + unarmedMinorCount + '</td>' + '<td>' + unarmedAdultCount + '</td>' + '</tr>' + '</table>' );
}

