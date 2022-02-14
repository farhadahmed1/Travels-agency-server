const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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
        const database = client.db("travelAgency");
        // const usersCollection = database.collection('usersData');
        const toureCollection = database.collection('alltours')
        const BookingCollection = database.collection('Bookingtours')



        // get all tours date

        app.get('/tours', async (req, res) => {
            const cursor = toureCollection.find({});
            const tours = await cursor.toArray();
            res.send(tours)
        })

        // get single tours data 

        app.get('/tours/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: ObjectId(id) };
            const tour = await toureCollection.findOne(query);
            res.send(tour);
        })



        //post tours
        app.post('/tourPost', async (req, res) => {
            const newTour = req.body;
            const result = await toureCollection.insertOne(newTour);
            res.send(result);
        })


        //post bookingTours
        app.post('/bookingTours', async (req, res) => {
            const booking = req.body;
            const result = await BookingCollection.insertOne(booking);
            res.send(result);
        })

        // all booking
        app.get('/allBooking', async (req, res) => {
            const cursor = BookingCollection.find({});
            const allbooks = await cursor.toArray();
            res.send(allbooks)
        })
        // get My myBooking 

        app.get("/myBooking/:email", async (req, res) => {
            const result = await BookingCollection.find({
                email: req.params.email,
            }).toArray();
            res.send(result);
        });

        // delate my booking 
        app.delete('/deleteBooking/:id', async (req, res) => {
            const id = req.params.id;
            console.log("deleta", id);
            const query = { _id: ObjectId(id) }
            const result = await BookingCollection.deleteOne(query)
            res.send(result)
        })

        // update booking status

        app.put('/updateStatusBooking/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const updatedBooking = req.body;
            const query = { _id: ObjectId(id) };
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    status: updatedBooking.status
                },
            };
            const result = await BookingCollection.updateOne(query, updatedDoc, options)
            res.send(result)
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', function (req, res) {
    res.send('travel agency')
})

app.listen(port, () => {
    console.log(`travelagency ${port}`);
})