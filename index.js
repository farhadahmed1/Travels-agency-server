const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;



// midelwer

app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f6j7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        // console.log('database connn');
        const database = client.db("heroRider");

        // get API

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', function (req, res) {
    res.send('heroRider server')
})

app.listen(port, () => {
    console.log(`heroRider server ${port}`);
})