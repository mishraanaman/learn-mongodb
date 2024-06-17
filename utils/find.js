async function findDocuments(databaseName, collectionName,client, numberOfDocuments) {
    // Ensure the client is connected before attempting to query
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }
  
    // Specify the database and collection
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
  
    // Query for the specified number of documents
    const cursor = collection.find().limit(numberOfDocuments);
  
    // Fetch and return the documents as an array
    return await cursor.toArray();
  }

  module.exports = { findDocuments };
