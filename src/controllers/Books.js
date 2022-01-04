const Book = require("../models/Books");
const { getPostData } = require("../utils/helper");

async function getBooks(req, res) {
    try {
        const books = await Book.listBooks();
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(books));
    }
    catch(error) {
        console.log(error);
    }
};

async function getBook(req, res, id) {
    try {
        const book = await Book.findBook(id);
        if(!book) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book Not Found' }));
        }
        else {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(book));
        }
    }
    catch(error) {
        console.log(error);
    }
};

async function addBook(req, res) {
    try {
        const body = await getPostData(req);
        const { name, author, description } = JSON.parse(body);
        const book = { name, author, description };

        const newBook = await Book.createBook(book);
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newBook));  
    }
    catch(error) {
        console.log(error);
    }
};

async function updateBook(req, res, id) {
    try {
        const book = await Book.findBook(id);
        if(!book) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book Not Found' }));
        }
        else {
            const body = await getPostData(req);
            const { name, author, description } = JSON.parse(body);
            const data = { 
                name: name || book.name, 
                author: author || book.author, 
                description: description || book.description 
            };
            const updatedBook = await Book.modifyBook(id, data);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(updatedBook));
        } 
    }
    catch(error) {
        console.log(error);
    }
};

async function deleteBook(req, res, id) {
    try {
        const book = await Book.findBook(id);
        if(!book) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book Not Found' }));
        }
        else {
            await Book.removeBook(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: `id: ${id} book deleted.`}));
        }
    }
    catch(error) {
        console.log(error);
    }
};

module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
}