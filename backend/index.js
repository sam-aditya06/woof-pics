import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { MongoClient } from 'mongodb';
dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.get('/', (req, res) => {
    console.log(process.env.CLIENT_URL);
    res.send('Server running');
})

app.get('/api/page/:pageNum', async (req, res) => {
    const pageNum = parseInt(req.params.pageNum);
    const contentPerPage = parseInt(req.query.contentPerPage);
    const skip = (pageNum - 1) * contentPerPage;
    try{
        await client.connect();
        const alldogsList = await client.db('woof-pics').collection('breeds').find().toArray();
        const requiredDogsList = await client.db('woof-pics').collection('breeds').find().skip(skip).limit(contentPerPage).sort({name: 1}).project({imageList: 0}).toArray();
        const pageCount = alldogsList.length % contentPerPage === 0 ? alldogsList.length / contentPerPage : Math.ceil(alldogsList.length / contentPerPage);
        res.send({pageCount, content: requiredDogsList});
    }catch(err){
        res.send(err);
    }
})

app.get('/api/search', async(req, res) => {
    const contentPerPage = parseInt(req.query.contentPerPage);
    const page = parseInt(req.query.page);
    const value = req.query.value;
    const firstElementIndex = (page - 1) * contentPerPage;
    const lastElementIndex = firstElementIndex + contentPerPage - 1;
    var regexPattern = new RegExp(value.toLowerCase(), 'i');
    try {
        await client.connect();
        const matchedDogsList = await client.db('woof-pics').collection('breeds').find({name: regexPattern}).toArray();
        const pageCount = matchedDogsList.length % contentPerPage === 0 ? matchedDogsList.length / contentPerPage : Math.ceil(matchedDogsList.length / contentPerPage);
        res.send({pageCount, content: matchedDogsList.slice(firstElementIndex, lastElementIndex + 1)});
    } catch (error) {
        console.log(error);
    }
})

app.get('/api/images/:breedName', async (req, res) => {
    const breedName = req.params.breedName;
    try{
        await client.connect();
        const result = await client.db('woof-pics').collection('breeds').find({breed: breedName}).toArray();
        res.send(result[0]);
    }catch(err){
        console.log(err);
    }
})

app.get('/api/images/:breedName/:sub_breedName', async (req, res) => {
    const breedName = req.params.breedName;
    const sub_breedName = req.params.sub_breedName;
    try{
        await client.connect();
        const result = await client.db('woof-pics').collection('breeds').find({$and: [{breed: breedName}, {sub_breed: sub_breedName}]}).toArray();
        res.send(result[0]);
    }catch(err){
        console.log(err);
    }
})

app.listen(4000, () => {
    console.log('Server listening on 4000...')
})