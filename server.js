const host = 'localhost';
const port = 8000;


const http = require("http");
const fs = require("fs");
const { response } = require("express");
const mock = require('./mock');


const requestListener = function (req, res) {
    if (req.url === '/') {
        const html = fs.readFileSync("./index.html");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end('');
    } 
//js    
    else if(req.url === '/mock.js') {
        const javascript = fs.readFileSync("./mock.js");
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(javascript);
        res.end('');
    }
    else if(req.url === '/script.js') {
        const javascript = fs.readFileSync("./script.js");
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(javascript);
        res.end('');
    }
    else if(req.url === '/server.js') {
        const javascript = fs.readFileSync("./server.js");
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(javascript);
        res.end('');
    }
//css
    else if(req.url === '/SidebarLeft.css') {
        const css = fs.readFileSync("./SidebarLeft.css");
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(css, 'utf8');
        res.end('');
    }
    else if(req.url === '/Content.css') {
        const css = fs.readFileSync("./Content.css");
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(css);
        res.end('');
    }
    else if(req.url === '/font-awesome-4.7.0/css/font-awesome.css') {
        const css = fs.readFileSync("./font-awesome-4.7.0/css/font-awesome.css");
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(css);
        res.end('');
    }
    else if(req.url === '/style.css') {
        const css = fs.readFileSync("./style.css");
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(css);
        res.end('');
    } 
    else if(req.url === '/common.css') {
        const css = fs.readFileSync("./common.css");
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(css);
        res.end('');
    }
//jpeg    
    /* else if(req.url === '/doc.jpeg') {
        const jpeg = fs.readFileSync("./doc.jpeg");
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.write(jpeg);
        res.end('');
    }
    else if(req.url === '/tor.jpeg') {
        const jpeg = fs.readFileSync("./tor.jpeg");
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.write(jpeg);
        res.end('');
    }
    else if(req.url === '/tor2.jpg') {
        const jpeg = fs.readFileSync("./tor2.jpg");
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.write(jpeg);
        res.end('');
    }
    else if(req.url === '/background_white.jpeg') {
        const jpeg = fs.readFileSync("./background_white.jpeg");
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.write(jpeg);
        res.end('');
    }
    else if(req.url === '/background2.jpeg') {
        const jpeg = fs.readFileSync("./background2.jpeg");
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.write(jpeg);
        res.end('');
    }
    else if(req.url === '/1646438278_4-damion-club-p-obezyana-s-sigaroi-art-4.jpg') {
        const jpeg = fs.readFileSync("./1646438278_4-damion-club-p-obezyana-s-sigaroi-art-4.jpg");
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.write(jpeg);
        res.end('');
    } */

//ниже решение с загрузкой картинок с папки. Выше просто каждую отдельно с кореной папки.
//includes определяет, есть ли папка в нашем случае или содержит ли массив определённый элемент, возвращая в зависимости от этого true или false
//split разбивает на массив

    else if (req.url.includes('imgs')) {
        const mineType = req.url.split('.')[1];
        const image = fs.readFileSync('.' + req.url);
        res.writeHead(200, {'Content-Type': mineType});
        res.write(image);
        res.end();
    }
    else if (req.url === '/messages') {
        const stringMessages = JSON.stringify(mock.messages);
        res.end(stringMessages);
    }
    else if (req.url === '/chats') {
        const stringData = JSON.stringify(mock.chats);
        res.end(stringData);
    }
    else {
        res.end('')
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});