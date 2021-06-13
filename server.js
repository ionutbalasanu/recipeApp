const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://recipe:recipe@cluster0.gazyz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true
}).then(client => {
    console.log('Connected to database')
    const db = client.db('recipe-db')
    const quotesCollection = db.collection('quotes')
    app.listen(3000, function () {
        console.log('listening on 3000');
    })
    app.set('view-engine','ejs')
    app.use(express.static('public'))
    app.use(bodyParser.json())

    app.use(bodyParser.urlencoded({ extended: true }))
    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
            { name: 'Sarmale' },
            {
              $set: {
                name: req.body.name,
                ingredients: req.body.ingredients,
                description:req.body.description
              }
            },
            {
              upsert: true
            }
          )
          .then(result => {
            res.json('Success')
        })
            .catch(error => console.error(error))
      })

    app.get('/', (req, res) => {
        results=db.collection('quotes').find().toArray()
    .then(results => {
        res.render('index.ejs',{quotes:results})
    })
    .catch(error => console.error(error))

    })
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            { name: req.body.name }
          )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No recipe to delete')
                  }
                  res.json(`Deleted recipe`)
            })
            .catch(error => console.error(error))
    })
    
    
})

