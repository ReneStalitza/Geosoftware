var map = L.map('map').setView([51.968804, 7.596188], 13);
var osmLayer = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
osmLayer.addTo(map);


var overlay = L.layerGroup();
overlay.addTo(map);



var resource = "/api/";
var load = $('<div>');
var content = '';
load.load(resource, function(result) {
	content = load.html();
	contentJ = JSON.parse(content);
	var routeList = [];
	for(var h = 0; h < contentJ.length; h++) {

		var geoj = JSON.parse(contentJ[h].geojson);

		for(var i = 0; i < geoj.features.length; i++) {
			var line = [];
			for(var j = 0; j < geoj.features[i].geometry.coordinates.length; j++) {
				var point = [geoj.features[i].geometry.coordinates[j][0], geoj.features[i].geometry.coordinates[j][1]];
				line.push(point);
			}

			routeList[i] = L.polyline(line, {color: 'red'})
			routeList[i].addTo(overlay);
		}
	}
});

/**
$.ajax({
    url: 'http://localhost:27017', // URL der Abfrage,
    //data: {foo: "bar"},

    type: "GET"
  })
  .done (function( response) {
    // parse + use data here
    $("#content").text(JSON.stringify(response,null,4));
  })
  .fail (function( xhr, status, errorThrown ) {
    // handle errors
  })
  .always (function( xhr, status ) {
    // completed ajax
  });*/

	$.get(resource);

	$("#geojsontextarea").load(resource);

	$(document).ready(function(){
    $('#geojsontextarea').load('/ p#name', function(result) {
        var obj = $(this).find('p#name'), html = obj.html();
        obj.css({'font-size':40});
        $(this).append($('<div>').text(html));
    });
	});
//const mongodb = require('mongodb');
/**
var aroute = [];
for(var i = 0; i < gpstracks.features.length; i++) {
	var line = [];
	for(var j = 0; j < gpstracks.features[i].geometry.coordinates.length; j++) {
		var point = [gpstracks.features[i].geometry.coordinates[j][1], gpstracks.features[i].geometry.coordinates[j][0]];
		line.push(point);
	}

	aroute[i] = L.polyline(line, {color: 'red'})
	aroute[i].addTo(overlay);
}

*/
/**
var coll = [];

(async () => {
	try {
	dbConnection = await mongodb.MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true });
	db = await dbConnection.db("itemdb");
 } catch (error) {
	console.dir(error);
 }

 coll = db.collection("item").find({}).toArray(
 	(error, result) => {
 		if(error) throw error;
 		console.log(result);
 		if(result != "") {

 		}
 		else {

 		}
 	}
 );

})();
console.log(coll);*/
/**
var routeList = [];
for(var h = 0; h < itemStorage.length; h++) {
	var geoj = JSON.parse(itemStorage[h].geojson);
	for(var i = 0; i < geoj.features.length; i++) {
		var line = [];
		for(var j = 0; j < geoj.features[i].geometry.coordinates.length; j++) {
			var point = [geoj.features[i].geometry.coordinates[j][0], geoj.features[i].geometry.coordinates[j][1]];
			line.push(point);
		}

		routeList[i] = L.polyline(line, {color: 'red'})
		routeList[i].addTo(overlay);
	}
}

//var drawnItems = L.featureGroup().addTo(map);*/

/**map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        },
		polygon: {
            allowIntersection: false,
           showArea: true
         }
    },
    draw: {
		polyline: false,
		circle: false,
		polygon: true,
		marker: false,
		circlemarker: false,
		rectangle: false

    }
}));*/

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);

    updateText();
});

map.on("draw:edited", function (event) {
    updateText();
});

function updateText(){
  document.getElementById("geojsontextarea").value = JSON.stringify(drawnItems.toGeoJSON());

}
