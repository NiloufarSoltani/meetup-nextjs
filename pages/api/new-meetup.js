import { MongoClient } from "mongodb";
// POST  /api/new-meetup

const handler = async (req, res) =>{
    if(req.method === 'POST'){
        const data = req.body;
        //const {title, image, address, descrption} = data;

        const client = await MongoClient.connect('mongodb+srv://nilooooyi:8vg5P7zFu22IlcL5@meetup.wkrlxt6.mongodb.net/?retryWrites=true&w=majority')
        const db = client.db();
        const collection = db.collection('meetups');
        const result = await collection.insertOne(data);
        console.log(result);
        
        client.close();
        res.status('201').json({message: 'Meetup inserted!'})
    }
}

export default handler;