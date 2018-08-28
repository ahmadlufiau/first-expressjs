// Setup
var express = require('express');
var app = express();

// MongoDB
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/node-blog");

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var postSchema = new mongoose.Schema({
    body: String
});

var Post = mongoose.model('Post', postSchema);

// Routes
// Tampil Data Post
app.get("/", (_req, res) => {
    Post.find({}, (_err, posts) => {
        res.render('index', { posts: posts})
    });
});

// Simpan Data Post
app.post('/addpost', (req, res) => {
    var postData = new Post(req.body);
    postData.save().then( _result => {
        res.redirect('/');
    }).catch(_err => {
        res.status(400).send("Unable to save data");
    });
});

// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})