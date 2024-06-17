const {connectToDatabase} = require('../utils');
const ObjectId = require('mongodb').ObjectId;
const config = require('../config');
const { uri } = config.mongodb;

const dbname = "test"
const collection_name = "sales"

const main = async () => {
  let connectedClient
 try {
   connectedClient = await connectToDatabase(uri);
   const accountsCollection = client.db(dbname).collection(collection_name)
   console.log("Collection:", accountsCollection.collectionName)
   // find() method is used here to find documents that match the filter
   let result = await accountsCollection.replaceOne(
    {
      _id: new ObjectId("66385701d7d50c5ddb575784"),
    },
    {
      account_holder: "Vitalik Buterin",
      account_id: "AXIS29001337",
      account_type: "current",
      balance: 87972434,
    }
  )
   console.log(`Found ${result.matchedCount} documents`)
   console.log(`Replaced ${result.modifiedCount} documents`)

    // findOne() method is used here to find a the first document that matches the filter
    //let result = await accountsCollection.findOne(documentToFind)
 } catch (err) {
   console.error(`Error finding documents: ${err}`)
 } finally {
   await connectedClient.close()
 }
}

main()

