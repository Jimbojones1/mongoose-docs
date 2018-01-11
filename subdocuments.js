const mongoose = require('mongoose');
require('./db')


const articleSchema = new mongoose.Schema({
  title: {type: String},
  author: String,
  body: String
})

const authorSchema = new mongoose.Schema({
  name: String,
  articles: [articleSchema]
})

// defining our models
const Article = mongoose.model('Article', articleSchema);
const Author = mongoose.model('Author', authorSchema);


const ernie = new Author({name: 'Ernest Hemmingway'});
const article1 = new Article({title: 'Farwell to arms', author: 'Hems'})

ernie.articles.push(article1);

// the save actually writes to mongodb
ernie.save();
article1.save();



// update it
ernie.articles.id(article1.id).title = 'what ever';
ernie.save();
// saving the parent saves the child, but not the orginal saved in the articles collection

ernie.articles.id(article1.id).remove();
ernie.save();
console.log(ernie.articles.id(article1.id))

const subdoc_article = ernie.articles.create({title: 'the sun also rises', author: 'hems'})

ernie.articles.push(subdoc_article);

ernie.save();

// Article.create(subdoc_article, (err, arr) => {
//   console.log(arr)
//   ernie.articles.push(arr)
// })









