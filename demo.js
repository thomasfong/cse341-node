const { MongoClient } = require('mongodb');

async function main() {

    const url = "mongodb+srv://thomasfong1020:F584G64M8840@cluster0.gfeeo.mongodb.net/";

    const client = new MongoClient(url);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    } 
}

main().catch(console.error);

async function listDatabases(client) {
    const databaseList = await client.db().admin().listDatabases();
    
    console.log("Databases:");
    databaseList.databases.forEach(db => {
        console.log(`-${db.name}`);
    })
}