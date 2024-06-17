async function aggregationPipeline(databaseName, collectionName,client, pipeline){
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    const cursor = collection.aggregate(pipeline);
    return  await cursor.toArray(); 
}


module.exports ={aggregationPipeline}