const express = require("express");
const _ = require("lodash");
const ejs = require("ejs");
// 1. required mongoose package
const mongoose = require("mongoose");

// 2. connect to the url at which my mongodb database hosted
// mongoose.connect("mongodb+srv://sunny9325:brago9325@cluster0.legztwk.mongodb.net/blogDB", {useNewUrlParser: true});

// 3. create a new mongoose model using the schema to define your posts collection.
const postSchema = {
  title: String,
  content: String
};

// 4. Define model using postSchema
const Post = mongoose.model("Post", postSchema);

// const home = new Post({
//   title: "Home",
//   content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
// });

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


// home route
app.get("/", function(req, res) {
  
  Post.find({})            // it will find the collection created using Post model
  .then((posts)=> {
    res.render("home", {startingContent : homeStartingContent, posts: posts});
  })
  .catch((err)=> {
    console.log(err);
  });

});


// about route
app.get("/about", function(req, res) {
  res.render("about", {aboutContent : aboutContent});
});


// contact route
app.get("/contact", function(req, res){
  res.render("contact", {contactContent :contactContent});
});


// compose page'

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res){
// creating a document using Post model 
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody 
  });
  
  //saving inside posts collection
  post.save()
  .then(()=>{
    res.redirect("/"); 
  })
  .catch((err)=>{
    console.log(err);
  });
});



// handling Route parameters

app.get("/posts/:postid", function(req, res) {
  const requestedPostId = req.params.postid;

  Post.findById({_id: requestedPostId})
  .then((post)=> {
    res.render("post", {post: post});
  })
  .catch((err)=>{
    console.log(err);
  });

});



mongoose.connect("mongodb+srv://sunny9325:brago9325@cluster0.legztwk.mongodb.net/blogDB", {useNewUrlParser: true}).then(
  app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
  })
);