const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt : new Date()
    });
    res.status(201).send();
});

router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://abc123:321cba@cluster0-shard-00-00-ypuvn.mongodb.net:27017,cluster0-shard-00-01-ypuvn.mongodb.net:27017,cluster0-shard-00-02-ypuvn.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
        useUnifiedTopology: true
    });

    return client.db('abc123').collection('posts');
}

module.exports = router;