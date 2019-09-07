//Marius Lammers 453886
var rou = "x";
var poly = "y";
function f(){
	rou = document.getElementById("routen").value;
	poly = document.getElementById("polygon").value;
	//console.log(rou.type);
	//console.log(gpstracks.type);
	if(routen.type == "FeatureCollection"){
		console.log(rou);
		console.log(poly);
	}
	calcDist(1);
	g();
	calcDist(2);
}
//console.log(polygon.type);
function pip(point, vs){
	    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
	console.log(polygon.features[0].geometry.coordinates);
	console.log(point);
	console.log(inside);
    return inside;
}

//console.log(gpstracks.features[0].geometry.coordinates[0]);
function g() {
	for(var i = 0; i < gpstracks.features.length; i++) {
		for(var j = 0; j < gpstracks.features[i].geometry.coordinates[0].length; j++) {
			console.log(gpstracks.features[i].geometry.coordinates.length);
			if(pip(gpstracks.features[i].geometry.coordinates[j], polygon.features[0].geometry.coordinates[0]) == true) {
				//delete gpstracks.features[i].geometry.coordinates[j];
				if(gpstracks.features[i].geometry.coordinates[j] == gpstracks.features[i].geometry.coordinates[0]) {
					gpstracks.features[i].geometry.coordinates.shift();
					//console.log(true);
				}
				else {
					if(gpstracks.features[i].geometry.coordinates[j] == gpstracks.features[i].geometry.coordinates.length - 1) {
						gpstracks.features[i].geometry.coordinates.splice(gpstracks.features[i].geometry.coordinates.length - 1, 1);
						//console.log(true);
					}
					else {
						var temp = gpstracks.features[i].geometry.coordinates.slice(j);
						gpstracks.features[i].geometry.coordinates.splice(j - 1, j);
						for(k = 0; k < temp.length - 1; k++) {
							gpstracks.features.splice(i, 0, temp[k]);
						}
					} 
				}
				
			}
			else {
				//console.log(false);
			}
			//console.log(gpstracks.features[i].geometry.coordinates.length);
			//console.log(gpstracks.features[i].geometry.coordinates[j]);
		}
		if(gpstracks.features[i].length <= 2) {
			gpstracks.features.splice(i, 1);
		}
	}
}

function calcDist(a) {
	for(var i = 0; i < gpstracks.features.length; i++) {
		var dist = 0;
		for(var j = 0; j < gpstracks.features[i].geometry.coordinates[0].length -1; j++) {
			var hdist = getDistanceFromLatLonInKm(gpstracks.features[i].geometry.coordinates[j][0], gpstracks.features[i].geometry.coordinates[j][1], gpstracks.features[i].geometry.coordinates[j+1][0], gpstracks.features[i].geometry.coordinates[j+1][1]);
			dist = dist + hdist;
		}
		
		if(a == 1) {
			var para = document.createElement("p");
			var node = document.createTextNode(dist);
			para.appendChild(node);
			var element = document.getElementById("div1");
			element.appendChild(para);
		}
		else {
			var para = document.createElement("p");
			var node = document.createTextNode(dist);
			para.appendChild(node);
			var element = document.getElementById("div2");
			element.appendChild(para);
		}
		
	}



}
	
function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}