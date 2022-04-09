require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

var uri = process.env.MONGODB_URL;
    
try {
    const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });         

    client.connect(err => {

        const collection = client.db("V25").collection("OnOff");
        
        obj = {status: 0};

        collection.insertOne(obj, function(err, res) {
          if (err) throw err;
          console.log("OnOff initialized with value 0");
      });
    
    }); 

    client.close()

} catch (e) {
    console.error(e);
} 


