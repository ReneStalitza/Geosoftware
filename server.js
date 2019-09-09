const express = require('express');
const app = express();
var router = express.Router();
var fs = require('fs');
app.use(express.json());
app.use(express.static(__dirname + '/public'));
const mongodb = require('mongodb');

app.use(express.static(__dirname + '/test'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/qunit', express.static(__dirname + '/node_modules/qunit/qunit'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});
app.get('/test', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});


app.get('/home', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});
app.get('/routeneditor', (req, res) => {
	res.sendFile(__dirname + '/routeneditor.html');
});
app.get('/routenanzeige', (req, res) => {
	res.sendFile(__dirname + '/routenanzeige.html');
});

app.use(express.urlencoded({ extended: false }))

var website = '<a href="/routenanzeige"</a>OK<br /><br />';

// item storage with items that have unique names
var itemStorage = [];

// routehandler for get, post, put, and delete / using querystring via req.query



var getitemcontroller = function(req, res) {
	console.log(req.query);
	(async () => {
		try {
	 	dbConnection = await mongodb.MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true });
	 	db = await dbConnection.db("itemdb");
	 } catch (error) {
	 	console.dir(error);
	 }
	 if(req.query.name == "") {
		 
		 db.collection("item").find({}).toArray(
 			(error, result) => {
 				if(error) throw error;
 				console.log(result);
 				if(result != "") {
 					res.send(website + JSON.stringify(result));
 				}
 				else {
 					res.send(website + "No Routes exist");
 				}
 			}
 		);
		 
	 }
	 else{
	 	db.collection("item").find({'name': req.query.name}).toArray(
			(error, result) => {
				if(error) throw error;
				console.log(result);
				if(result != "") {
					res.send(website + JSON.stringify(result));
				}
				else {
					res.send(website + "Route does not exist");
				}
			}
		);
	}
	})();
};


var postitemcontroller = function(req, res) {
	(async () => {
		try {
		dbConnection = await mongodb.MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true });
		db = await dbConnection.db("itemdb");
	 } catch (error) {
		console.dir(error);
	 }

	if(req.body.name == "") {
		res.send(website + "Error: a name is required");
	}
	else {
	 db.collection("item").find({'name': req.body.name}).toArray(
		 (error, result) => {
			 if(error) throw error;
			 console.log(result);
			 if(result != "") {
				 res.send(website + "Error: Item " + req.body.name + " is already in storage, use Update Route instead.");
                 
			 }
			 else {
					var obj = req.body;
					var dt = new Date();
					var date = (("0"+dt.getDate()).slice(-2)) +"."+ (("0"+(dt.getMonth()+1)).slice(-2)) +"."+ (dt.getFullYear()) +" "+ (("0"+dt.getHours()).slice(-2)) +":"+ (("0"+dt.getMinutes()).slice(-2));
					obj.date = date;
					db.collection('item').insertOne(req.body,
					(error, result) => {
					if(error) throw error;
					console.log(req.body);
				});

				//res.send(website + JSON.stringify(req.body));
				res.redirect('/routenanzeige');
			 }
		 }
	 );
 }
})();
};

var putitemcontroller = function (req, res) {
	console.log(req.body.name);
	(async () => {
		try {
		dbConnection = await mongodb.MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true });
		db = await dbConnection.db("itemdb");
	 } catch (error) {
		console.dir(error);
	 }


	 db.collection("item").find({name: req.body.name}).toArray(
		 (error, result) => {
			 if(error) throw error;
			 var change = result;
			 console.log(result);
			 if(result == "") {
				 res.send(website + "Error: Item " + req.body.name + " does not exist, use Add Route instead");

			 }
			 else {
					console.log(req.body);
					var set = { $set : req.body};
					db.collection('item').updateOne({name: req.body.name}, set,
					(error, result) => {
					if(error) throw error;
					console.log(req.body);
				});

				res.send(website + "Changes: " + JSON.stringify(req.body));
			 }
		 }
	 );
})();
};

var deleteitemcontroller = function(req, res) {
	(async () => {
		try {
		dbConnection = await mongodb.MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true });
		db = await dbConnection.db("itemdb");
	 } catch (error) {
		console.dir(error);
	 }


	 db.collection("item").find({'name': req.query.name}).toArray(
		 (error, result) => {
			 if(error) throw error;
			 console.log(result);
			 if(result == "") {
				 res.send(website + "Error: Item " + req.query.name + " does not exist.");

			 }
			 else {
					db.collection('item').deleteOne({name: req.query.name},
					(error, result) => {
					if(error) throw error;
					console.log(req.query);
				});

				res.redirect('/routenanzeige');
			 }
		 }
	 );
})();
};

app.get("/api/", (req, res) => {
  // find all
	(async () => {
		try {
		dbConnection = await mongodb.MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true });
		db = await dbConnection.db("itemdb");
	 } catch (error) {
		console.dir(error);
	 }
  db.collection('item').find({}).toArray((error, result) => {
    if(error){
      console.dir(error);
    }
    res.json(result);
  });
	})();
});

app.get("/", (req, res) => {
  res.send(website + JSON.stringify(itemStorage));
});

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.get("/item", getitemcontroller);

app.post("/item/create", postitemcontroller);

app.post("/item/update", putitemcontroller);

app.get("/item/delete", deleteitemcontroller);



app.listen(3000);
