require('dotenv').config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

module.exports=  uri = `mongodb+srv://${username}:${password}@atlas-101-workshop.kwb7o.mongodb.net/?retryWrites=true&w=majority&appName=Atlas-101-Workshop`;
