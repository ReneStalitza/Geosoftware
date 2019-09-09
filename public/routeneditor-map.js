var map = L.map('map').setView([51.968804, 7.596188], 13);
var osmLayer = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
osmLayer.addTo(map);


var overlay = L.layerGroup();
overlay.addTo(map);




map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);

    updateText(drawnItems);
});

map.on("draw:edited", function (event) {
    updateText("");
});

function updateText(text){
  document.getElementById("geojsontextarea").value = JSON.stringify(text.toGeoJSON());

}
function updateText2(text){
  document.getElementById("geojsontextarea").value = JSON.stringify(text);

}

var control = L.Routing.control({
    waypoints: [],
    routeWhileDragging: true,
	geocoder: L.Control.Geocoder.nominatim()
})
var routes = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[]}}]}
control.on("routeselected", function(e) {
	var route = e.route;
	for (var i = 0; i < route.coordinates.length; i++) {
			var coor = [route.coordinates[i].lat, route.coordinates[i].lng];
            routes.features[0].geometry.coordinates[i] = coor;
        }
	updateText2(routes);
});
control.addTo(map);

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
		
		L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });
	L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
    });
});