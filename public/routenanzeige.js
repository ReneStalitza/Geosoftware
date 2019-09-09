var map = L.map('map').setView([51.968804, 7.596188], 13);
var osmLayer = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
osmLayer.addTo(map);

var colors = ['red','blue','green','yellow','purple','brown','cyan','orange', 'darkgreen', 'darkblue'];
console.log(colors[1]);

var overlay = L.layerGroup();
overlay.addTo(map);


var extra = [];
var resource = "/api/";
var load = $('<div>');
var content = '';
load.load(resource, function(result) {
	content = load.html();
	contentJ = JSON.parse(content);
	//console.log(contentJ);
	var routeList = [];
	for(var h = 0; h < contentJ.length; h++) {
        table(contentJ[h].name, contentJ[h].description, contentJ[h].date, colors[h], h)
		var geoj = JSON.parse(contentJ[h].geojson);
//console.log(geoj);
		for(var i = 0; i < geoj.features.length; i++) {
			var line = [];
			for(var j = 0; j < geoj.features[i].geometry.coordinates.length; j++) {
				var point = [geoj.features[i].geometry.coordinates[j][0], geoj.features[i].geometry.coordinates[j][1]];
				line.push(point);
			}

			routeList[i] = L.polyline(line, {color: colors[h], id : h});
			extra.push(routeList[i]);
			routeList[i].addTo(overlay);
			
		}
	}
});




var t = document.getElementById("Table1"); 
console.log(t);
var x = t.getElementsByClassName("ob");
console.log(overlay.getLayers());

function check(){
	if(overlay.getLayers().length >= 1) {
		
		
		console.log(overlay.getLayers().length);
   var zu = overlay.getLayers()[0].toGeoJSON(); 
	
	var zt = overlay.getLayers()[1].toGeoJSON(); 

var intersects = turf.lineIntersect(zu, zt);
console.log(intersects.features.length);
met();
	}
	else {
		setTimeout(check, 1000);
	}
}

check();

function met(){
	
	
	
	for(var a = 0; a < overlay.getLayers().length; a++) {
		
		
		
		for(var b = 0; b < overlay.getLayers().length; b++) {
			console.log(intersects);
	        var zu = overlay.getLayers()[a].toGeoJSON(); 
			var zt = overlay.getLayers()[b].toGeoJSON(); 

            var intersects = turf.lineIntersect(zu, zt);
			
			if (intersects.features.length > 0 && a != b) { 
			    //tab();
				console.log("s");
				var table = document.getElementById("Table2");
				var row = table.insertRow(-1);
				var cell0 = row.insertCell(0);

                var t = document.getElementById("Table1"); 
                var x = t.getElementsByClassName("na").item(a).innerText;
				var y = t.getElementsByClassName("na").item(b).innerText;
				console.log(x);
				var g = new String(" could possibly see ");
				
				cell0.innerHTML = x +g + y;
				intersects ="";
			}			
			
		}
	}
}
met();

function table(name, desc, date, color, h){
var table = document.getElementById("Table1");

var row = table.insertRow(-1);

var cell0 = row.insertCell(0);
var cell1 = row.insertCell(1);
var cell2 = row.insertCell(2);
var cell3 = row.insertCell(3);
var cell4 = row.insertCell(4);

cell4.setAttribute('bgcolor', color);
cell1.setAttribute('class', "na");
var f = '<input type="checkbox" class="ob" value="no" checked="true" onclick = "go();">';

cell0.innerHTML = f;
cell1.innerHTML = name;
cell2.innerHTML = desc;
cell3.innerHTML = date;
cell4.innerHTML = "";

}


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
