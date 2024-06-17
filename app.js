const { MongoClient, ServerApiVersion } = require('mongodb');
const atlas_uri = require('./atlas_uri');
const { findDocuments } = require('./utils/find');
const { aggregationPipeline } = require('./utils/aggregate');


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
    documents.forEach(doc => console.log(doc));


    const pipeline = [
      // Stage 1: match the accounts with a balance less than $1,000
      { $match: { number_of_reviews: { $gt: 50 } } },
      //Stage 2: Filling out zero values
      {
        $project: {
          _id: 1,
          name: 1,
          price: { $ifNull: ["$price", 0] },
          cleaning_fee: { $ifNull: ["$cleaning_fee", 0] }
        }
      },
      // Stage 3: Calculate average balance and total balance
      {
        $project: {
          _id: 1,
          name: 1,
          price:1,
          cleaning_fee:1,
          total_pay: { $add: ["$price","$cleaning_fee"] }
            },
      },
    ]

    const agg_documents = await aggregationPipeline('sample_airbnb', 'listingsAndReviews',client, pipeline)
    console.log("Aggregation results:",agg_documents)
    agg_documents.forEach(doc=>console.log(doc)  )

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
