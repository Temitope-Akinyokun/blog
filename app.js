const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//const { title } = require("process");
const mongoose = require('mongoose');
const _ = require('lodash');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let pathParam;

mongoose.connect('mongodb+srv://Temitope2000:Klaroline1.@cluster0.af7d8h0.mongodb.net/blogDB');

const postsSchema = {
  title: String,
  content: String
};

const Post = mongoose.model('post', postsSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// HOME PAGE

app.get('/', (req, res) => {

  Post.find((err, posts) => {
    res.render('home', {
      homeStartingContent: homeStartingContent,
      posts: posts
    })
  });

})

// ABOUT PAGE

app.get('/about', (req, res) => {
  res.render('about', {
    aboutStartingContent: aboutContent
  });
})

// CONTACT PAGE

app.get('/contact', (req, res) => {
  res.render('contact', {
    contactStartingContent: contactContent
  });
})

// COMPOSE PAGE

app.get('/compose', (req, res) => {
  res.render('compose');
})

app.post('/compose', (req, res) => {

  const postTitle = req.body.postTitle;
  const postEntry = req.body.postEntry;

  const newPost = new Post({
    title: postTitle,
    content: postEntry
  });

  newPost.save((err) => {
    if(!err) {
      res.redirect('/');
    }
  });
  
})

// DYNAMIC URL

app.get('/posts/:entry', (req, res) => {
  pathParam = _.lowerCase(req.params.entry);

  Post.find((err, posts) => {
    posts.forEach(post => {

      let storedTitle = _.lowerCase(post.title);

      if (pathParam === storedTitle) {
        console.log('Match  found!');
        res.render('post', {
          title: post.title,
          content: post.content
        })

      }
    })
  });


})

// app.get('/post', (req, res) => {

//   Post.find((err, posts) => {
//     res.render('post', {
//       title: posts.postTitle,
//       content: posts.postEntry
//     })
//   });

// })


app.listen(3000, function () {
  console.log("Server started on port 3000");
});