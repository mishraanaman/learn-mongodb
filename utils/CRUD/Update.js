const {connectToDatabase} = require('../utils');
const config = require('../config');
const { uri } = config.mongodb;
const ObjectId = require('mongodb').ObjectId;

const dbname = "test"
const collection_name = "sales"

const documentToUpdate = { _id: new ObjectId("66385701d7d50c5ddb575784") }

const update = { $inc: { balance: 100 } }


const main = async () => {
  let connectedClient
  try {
    connectedClient = await connectToDatabase(uri)
    const accountsCollection = connectedClient.db(dbname).collection(collection_name) 
    let result = await accountsCollection.updateOne(documentToUpdate, update)
    result.modifiedCount === 1
      ? console.log("Updated one document")
      : console.log("No documents updated")

    // let result = await accountsCollection.updateMany(documentsToUpdate, update)
    //   result.modifiedCount > 0
    //     ? console.log(`Updated ${result.modifiedCount} documents`)
    //     : console.log("No documents updated")


    //db.podcasts.updateOne(
    //{ title: "The Developer Hub" },
    //{ $set: { topics: ["databases", "MongoDB"] } },
    //{ upsert: true }
    //)

    //The $push operator adds a new value to the hosts array field. Here's an example:
    // db.podcasts.updateOne(
    //   { _id: ObjectId("5e8f8f8f8f8f8f8f8f8f8f8") },
    //   { $push: { hosts: "Nic Raboy" } }
    // )
  } catch (err) {
    console.error(`Error updating document: ${err}`)
  } finally {
    await connectedClient.close()
  }
}

main()