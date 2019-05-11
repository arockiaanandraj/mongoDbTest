
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://arockiaanandraj:arockiaanandraj@cluster0-shard-00-00-1trot.mongodb.net:27017,cluster0-shard-00-01-1trot.mongodb.net:27017,cluster0-shard-00-02-1trot.mongodb.net:27017/sample_airbnb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    findDocuments(db, function () {
        db.close();
    });

});

var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('listingsAndReviews');
    // Find some documents
    collection.find({
        cancellation_policy: 'flexible',
        $and: [{ bedrooms: { $gt: 3 } }, { property_type: { $regex: 'Apartment' } }]
    }).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}
