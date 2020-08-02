//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to the launch of the new website and my first blog post! My name is Ritik Dhanore a B Tech student at IIT Bhilai and I am so excited to share with you MORE of what I have to offer! The amount of ideas, how-to’s and inspiration whirling around in my head is ready to jump out. I wanted to start by telling you why I created this blog, what you will be seeing more of in my posts, and my overall experience of revamping my website.";
const aboutContent = "Since I started my business, many of my friends have asked me “Why don’t you start a blog?!” and up until a few months ago did I truly know what a “blog” was. I never clicked on blog links, I never understood WHY people wrote blogs, I just thought it was a waste of time to even look into it. WRONG I WAS. After doing much research and making friends with a few bloggers along the way, who have been so kind to offer much support and advice, I have become completely consumed with inspiration to start a blog for others. I have finally realized all of the benefits that blogging can bring.";
const contactContent = "You can contact me via email (ritik@gmail.com). You can also contact me through my phone no. 345366767 or leave a message on my instagram.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

var posts = [];

app.get("/", function(req, res) {

  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });

});

app.get("/about", function(req, res) {

  res.render("about", {
    aboutPageContent: aboutContent
  });

})


app.get("/contact", function(req, res) {

  res.render("contact", {
    contactPageContent: contactContent
  });

})

app.get("/compose", function(req, res) {

  res.render("compose");

})

app.post("/compose", function(req, res) {

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");

});


app.get("/posts/:postName", function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      res.render("post",{
        title: post.title,
        content: post.content
      });
    }
  });
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
