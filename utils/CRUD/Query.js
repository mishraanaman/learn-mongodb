const {connectToDatabase} = require('../utils');
const config = require('../config');
const { uri } = config.mongodb;

const dbname = "test"
const collection_name = "sales"
 
// Document used as a filter for the find() method
const documentsToFind = { balance: { $gt: 4700 } }
 
const main = async () => {
  let connectedClient
 try {
   connectedClient = await connectToDatabase(uri);
   const accountsCollection = client.db(dbname).collection(collection_name)
   console.log("Collection:", accountsCollection.collectionName)
   // find() method is used here to find documents that match the filter
   let result = accountsCollection.find(documentsToFind)
   let docCount = accountsCollection.countDocuments(documentsToFind)
   await result.forEach((doc) => console.log(doc))
   console.log(`Found ${await docCount} documents`)

    // findOne() method is used here to find a the first document that matches the filter
    //let result = await accountsCollection.findOne(documentToFind)
 } catch (err) {
   console.error(`Error finding documents: ${err}`)
 } finally {
   await connectedClient.close()
 }
}

main()