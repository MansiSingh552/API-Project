const express = require("express");

//Database
const database = require("./database");

//Initialise express
const booky = express();

/*
Route            /
Description      Get all the books
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
booky.get("/",(req,res) => {
  return res.json({books: database.books});
});

/*
Route            /is
Description      Get specific book on ISBN
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
booky.get("/is/:isbn",(req,res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN ===  req.params.isbn
  );

  if(getSpecificBook.length === 0) {
    return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
  }

  return res.json({book: getSpecificBook});
});


/*
Route            /book
Description      Get specific book on Language
Access           PUBLIC
Parameter        lan
Methods          GET
*/
booky.get("/book/:lan",(req,res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.language ===  req.params.lan
  );

  if(getSpecificBook.length === 0) {
    return res.json({error: `No book found for the language of ${req.params.lan}`});
  }

  return res.json({book: getSpecificBook});
});


/*
Route            /c
Description      Get specific book based on category
Access           PUBLIC
Parameter        category
Methods          GET
*/

booky.get("/c/:category",(req,res) => {
  const getSpecificBook = database.books.filter( (book) => book.category.includes(req.params.category));

  if(getSpecificBook.length === 0){
    return res.json({error:`NO book found based for the category of ${req.params.category}`});
  }

  return res.json({books: getSpecificBook});
})

/*
Route            none
Description      Get all the authors
Access           PUBLIC
Parameter        none
Methods          GET
*/
booky.get("/author",(req,res) => {
  return res.json({author: database.author});
});

/*
Route            /author
Description      Get author based on id
Access           PUBLIC
Parameter        id
Methods          GET
*/

booky.get("/author/:id", (req,res) => {
  const getSpecificAuthor = database.author.filter( (author) => author.id === parseInt(req.params.id))

  if(getSpecificAuthor.length === 0){
    return res.json({
      error: `No author found based on ID of ${req.params.id}`
    })
  }
  return res.json({author: getSpecificAuthor})
});

/*
Route            /author/book
Description      Get author based on isbn
Access           PUBLIC
Parameter        isbn
Methods          GET
*/

booky.get("/author/book/:isbn", (req,res) => {
  const getSpecificAuthor = database.author.filter( (author) => author.books.includes(req.params.isbn))//include is used bcoz i m searching inside array

  if(getSpecificAuthor.length === 0){
    return res.json({
      error: `No author found based on ISBN of ${req.params.isbn}`
    })
  }
  return res.json({author: getSpecificAuthor})
});

/*
Route            none
Description      Get all the publications
Access           PUBLIC
Parameter        none
Methods          GET
*/
booky.get("/publication",(req,res) => {
  return res.json({publication: database.publication});
});

/*
Route            /publication
Description      Get publication based on id
Access           PUBLIC
Parameter        id
Methods          GET
*/

booky.get("/publication/:id", (req,res) => {
  const getSpecificPublication = database.publication.filter( (publication) => publication.id === parseInt(req.params.id))

  if(getSpecificPublication.length === 0){
    return res.json({
      error: `No publication found based on ID of ${req.params.id}`
    })
  }
  return res.json({publication: getSpecificPublication})
});

/*
Route            /publication/book
Description      Get publication based on isbn
Access           PUBLIC
Parameter        isbn
Methods          GET
*/

booky.get("/publication/book/:isbn", (req,res) => {
  const getSpecificPublication = database.publication.filter( (publication) => publication.books.includes(req.params.isbn))//include is used bcoz i m searching inside array

  if(getSpecificPublication.length === 0){
    return res.json({
      error: `No author found based on ISBN of ${req.params.isbn}`
    })
  }
  return res.json({author: getSpecificPublication})
});



booky.listen(3000,() => {
  console.log("the server is up and running");
})