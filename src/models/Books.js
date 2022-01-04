let books = require("../data/books.json");
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require("../utils/helper");

function listBooks() {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
};

function findBook(id) {
    return new Promise((resolve, reject) => {
        const book = books.find((b) => b.id === id);
        resolve(book);
    });
};

function createBook(book) {
    return new Promise((resolve, reject) => {
        const newBook = {id: uuidv4(), ...book};
        books.push(newBook);
        writeDataToFile('src/data/books.json', books);
        resolve(newBook);
    });
};

function modifyBook(id, book) {
    return new Promise((resolve, reject) => {
        const index = books.findIndex((b) => b.id === id);
        books[index] = {id, ...book};
        writeDataToFile('src/data/books.json', books);
        resolve(books[index]);
    });
};

function removeBook(id) {
    return new Promise((resolve, reject) => {
        books = books.filter((b) => b.id != id)
        writeDataToFile('src/data/books.json', books);
        resolve();
    });
};


module.exports = {
    listBooks,
    findBook,
    createBook,
    modifyBook,
    removeBook
}