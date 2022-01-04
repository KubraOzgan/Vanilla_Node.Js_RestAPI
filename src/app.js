const http = require("http");
const Books = require("./controllers/Books");

const server = http.createServer((req, res) => {
    if(req.url === "/books" && req.method === "GET")
    {
        Books.getBooks(req, res);
    }
    else if(req.url.match(/\/books\/\w+/) && req.method === "GET") 
    {
        const id = req.url.split('/')[2]
        Books.getBook(req, res, id);
    }
    else if(req.url === "/books" && req.method === "POST") 
    {
        Books.addBook(req, res);
    }
    else if(req.url.match(/\/books\/\w+/) && req.method === "PATCH") 
    {
        const id = req.url.split('/')[2]
        Books.updateBook(req, res, id);
    }
    else if(req.url.match(/\/books\/\w+/) && req.method === "DELETE") 
    {
        const id = req.url.split('/')[2]
        Books.deleteBook(req, res, id);
    }
    else
    {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({ message: 'Page Not Found!'}));
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Application is running on ${port}`);
})