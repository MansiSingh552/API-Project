const express = require("express");
var bodyParser = require("body-parser");

//Database
const database = require("./database");

//Initialise express
const booky = express();


booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

/*****************GET**************/
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

/******************POST********************/

/*
Route            /book
Description      add new book
Access           PUBLIC
Parameter        none
Methods          POST
*/
booky.post("/book/new",(req,res) => {
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({updatedBooks: database.books});
});

/*
Route            /author
Description      add new author
Access           PUBLIC
Parameter        NONE
Methods          POST
*/
booky.post("/author/new",(req,res) => {
  const newAuthor = req.body;
  database.author.push(newAuthor);
  return res.json({updatedBooks: database.author})
})

/*
Route            /publication/new
Description      add new publication
Access           PUBLIC
Parameter        NONE
Methods          POST
*/
booky.post("/publication/new",(req,res) => {
  const newPublication = req.body;
  database.publication.push(newPublication);
  return res.json({updatedBooks: database.publication});
})

/*
Route            /book/update/new
Description      add new publication
Access           PUBLIC
Parameter        NONE
Methods          POST
*/
booky.post("/publication/update/new",(req,res) => {
   const newBook = req.body;
   const updateLanguage = database.books.filter((book) => book.ISBN !== req.body.ISBN);
   database.books = updateLanguage;

   database.books.push(newBook);
   return res.json({updateBooks : database.book});
})




/*
Route            /publication
Description      Update/add new publication
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("/publication/update/book/:isbn",(req,res) => {
    database.publication.forEach((pub) => {
      //Update the publication database
      if(pub.id === req.body.pubId){
        return pub.books.push(req.params.isbn);
      }
    });

    //update the book database
    database.books.forEach((books) => {
      if(books.ISBN === req.params.isbn) {
        books.publication = req.body.pubId;
        return;
      }
    });

    return res.json(
      {
        books:database.books,
        publication: database.publication,
        message:"Successfully updated publication"
      }
    )
});



/****DELETE*****/
/*
Route            /book/delete
Description      Delete a book
Access           PUBLIC
Parameter        isbn
Methods          DELETE
*/

booky.delete("/book/delete/:isbn", (req,res) => {
  //Whichever book that doesnot match with the isbn , just send it to an updatedBookDatabase array
  //and rest will be filtered out

  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  )
  database.books = updatedBookDatabase;

  return res.json({books: database.books});
});

/*
Route            /book/delete
Description      Delete a book
Access           PUBLIC
Parameter        isbn
Methods          DELETE
*/

booky.delete("/delete/author/:id",(req,res) => {
  const updateAuthorDatabase = database.author.filter( (authorId) => authorId.id !== req.params.id) ;

  database.author = updateAuthorDatabase;
  return;
})

/****DELETE*****/
/*
Route            /book/delete/author
Description      delete author from book and vice-versa
Access           PUBLIC
Parameter        isbn and authorId
Methods          DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
      //update the book database
      database.books.forEach((books) => {
        if(books.ISBN === req.params.isbn) {
          const newAuthorList = books.author.filter((authorid) => authorid !== parseInt(req.params.authorId)
          );
          books.author = newAuthorList;
          return;
        }
        
      })
      //update the author database
      database.author.forEach((eachAuthor) => {
        if(eachAuthor.id === parseInt(req.params.authorId)) {
          const newBookList = eachAuthor.books.filter(
              (book) => book !== req.params.isbn
          );
          eachAuthor.books = newBookList;
          return;
        }
      });

      return res.json({
        book: database.books,
        author: database.author,
        message: ""
      })
});


booky.listen(3000,() => {
  console.log("the server is up and running");
})