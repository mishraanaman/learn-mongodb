const { MongoClient, ServerApiVersion } = require('mongodb');
const atlas_uri = require('./atlas_uri');
const { findDocuments } = require('./utils/find');


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(atlas_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Use the findDocuments function to fetch documents
    const documents = await findDocuments('sample_airbnb', 'listingsAndReviews',client, 5);

    // Print the documents
    documents.forEach(doc => console.log(doc));
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
