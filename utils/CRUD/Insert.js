const {connectToDatabase} = require('../utils');
const config = require('../config');
const { uri } = config.mongodb;

const dbname = "test"
const collection_name = "sales"

const sampleAccount = {
 account_holder: "Jeff Bezos",
 account_id: "ICIC829001337",
 account_type: "savings",
 balance: 187352434,
}
let client = null

// const sampleAccounts = [
//     {
//       account_id: "MDB011235813",
//       account_holder: "Ada Lovelace",
//       account_type: "checking",
//       balance: 60218,
//     },
//     {
//       account_id: "MDB829000001",
//       account_holder: "Muhammad ibn Musa al-Khwarizmi",
//       account_type: "savings",
//       balance: 267914296,
//     },
//    ]

const main = async () => {
 let connectedClient
 try {
    connectedClient = await connectToDatabase(uri)
   // insertOne method is used here to insert the sampleAccount document
   const accountsCollection = connectedClient.db(dbname).collection(collection_name);
   console.log("Collection:", accountsCollection.collectionName);
   let result = await accountsCollection.insertOne(sampleAccount)
   console.log(`Inserted document: ${result.insertedId}`)
   //let result = await accountsCollection.insertMany(sampleAccounts)
   // console.log(`Inserted ${result.insertedCount} documents`)
 } catch (err) {
   console.error(`Error inserting document: ${err}`)
 } finally {
   await connectedClient.close();
   console.log("Database connection closed");
 }
}
 
main()