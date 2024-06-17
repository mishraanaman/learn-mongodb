const {connectToDatabase} = require('../utils');
const ObjectId = require('mongodb').ObjectId;
const config = require('../config');
const { uri } = config.mongodb;

const dbname = "test"
const collection_name = "sales"

const documentToDelete = { _id: new ObjectId("663904e2f2db7f25704d0ec7") }

const main = async () => {
 let connectedClient

  try {
    connectedClient = await connectToDatabase(uri)
    const accountsCollection = client.db(dbname).collection(collection_name)
    let result = await accountsCollection.deleteOne(documentToDelete)
    result.deletedCount === 1
      ? console.log("Deleted one document")
      : console.log("No documents deleted")

    // let result = await accountsCollection.deleteMany(documentsToDelete)
    //   result.deletedCount > 0
    //     ? console.log(`Deleted ${result.deletedCount} documents`)
    //     : console.log("No documents deleted")
  } catch (err) {
    console.error(`Error deleting documents: ${err}`)
  } finally {
    await connectedClient.close()
  }
}

main()