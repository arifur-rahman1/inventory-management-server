const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
var cors = require('cors')
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

// username: admin1
// password: nTLJ0s8GdmJ6levn



const uri = "mongodb+srv://admin1:nTLJ0s8GdmJ6levn@cluster0.wa54gsl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
       await client.connect();
       const itemCollection = client.db('Inventory-management').collection('item');

        //Post 
        app.post('/item', async (req, res) => {
            const newItem = req.body;
            const result = await itemCollection.insertOne(newItem);
            res.send(result);
        })

        // get items
        app.get('/item', async (req, res) => {
            const category=req.query.category;
            const query = {category:category};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        })



    }
    finally{

    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Inventroy managment')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})