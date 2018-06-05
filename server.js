const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/post');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/views'));

app.use(express.static(__dirname + '/static'));

//Make connection with mongoose 
mongoose.connect('mongodb://alemv18:alejandra23@ds157639.mlab.com:57639/girlcodemxale');
const db = mongoose.connection;

//In case mongoose has an error
db.on('error', () => { console.log('connection error:')});

app.get('/', (req, res) => {
 res.render('index');
});

//POST /Show list of all posts 
app.get('/api/all_posts', (req, res, next) => {

  Post.find({}).exec(function (error, results) {
    if (error) {
      throw Error(error);
    }
    res.send(results)
  })
});

// POST /Create a new post 
app.post('/api/create_post', (req, res, next) => {
  const {title, categories, content} = req.body;

  const postData = {title, categories, content}

  Post.create(postData, (error, user) => {
    if(error) {
      return next(error)
    } else {
      return res.send(user);
    }
  });
});

//GET / Get the information of a single Post 
app.get('/api/get_post/:postId', (req, res, next) => {
  var postId = req.params.postId;
  if(!postId) {
    const err = new Error('This post is not available');
    err.status = 403;
    return next(err);
  } 

  Post.findById(postId) 
    .exec((error, result) => {
      if(error) {
        return next(error);
      } else {
        res.send(result);
      }
    })
});

//Update the post 
app.put('/api/update_post', (req, res) => {
  db.collection('posts')
  .findOneAndUpdate({name: 'Hello'}, {
    $set: {
      title: req.body.title,
      categories: req.body.categories, 
      message: req.body.message
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
});

//Delete the post
app.delete('/api/delete_post', (req, res) => {
  db.collection('posts').findOneAndDelete({title: req.body.title},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: ''})
  })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

