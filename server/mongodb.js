const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb://a21ismalgelo:Informatica_1@clusterprueba-shard-00-00.zv0tb.mongodb.net:27017,clusterprueba-shard-00-01.zv0tb.mongodb.net:27017,clusterprueba-shard-00-02.zv0tb.mongodb.net:27017/?replicaSet=atlas-7zayxy-shard-0&ssl=true&authSource=admin";

let dbName = "TR3G2";
let skins;
let users;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    poolSize: 15,
  },
});

function connectToSkins() {
  return new Promise((resolve, reject) => {
    client
      .connect()
      .then(() => {
        const database = client.db(dbName);
        skins = database.collection("skins");
        resolve();
      })
      .catch((error) => {
        console.error("Error connecting to skins collection: ", error);
        reject(error);
      });
  });
}

function connectToUsers() {
  return new Promise((resolve, reject) => {
    client
      .connect()
      .then(() => {
        const database = client.db(dbName);
        users = database.collection("users");
        resolve();
      })
      .catch((error) => {
        console.error("Error connecting to users collection: ", error);
        reject(error);
      });
  });
}

function getSkins() {
  return new Promise((resolve, reject) => {
    client
      .connect()
      .then(() => {
        skins
          .find()
          .toArray()
          .then((result) => {
            console.log(result);
            resolve(result);
          })
          .catch((error) => {
            console.error("Error getting skins: ", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
        reject(error);
      });
  });
}

module.exports = { connectToSkins, connectToUsers, getSkins };
