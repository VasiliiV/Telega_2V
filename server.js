const host = 'localhost';
const port = 8000;


const http = require("http");
const fs = require("fs");
const { response } = require("express");
const mock = require('./mock');
const { parse } = require("path");
const console = require("console");

const messages = {};



const requestListener = function (req, res) {
    if (req.url === '/') {
        const html = fs.readFileSync("./index.html");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end('');
    } else if (req.url === '/login') {
        if (req.method === 'GET') {
            const html = fs.readFileSync("./login.html");
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end('');
        } else if(req.method === 'POST') {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });
            req.on('end', () => {
                let answer;
                if (checkUserInFile(data)) {
                    answer = 'Exists'
                } else {
                    answer = 'No such user'
                }
                res.end(answer);
            })
        } else {
            req.end();
        }
        
    }
    else if (req.url === '/register') {
        const html = fs.readFileSync("./register.html");
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
    else if (req.url.includes('/messages')) {
        if (req.method === 'GET') {
            const queriString = req.url.split('?')[1];
            if (!queriString) {
                return res.end('[]');
            }
            let [myPhone, sobesednik] = queriString.split('&');
            myPhone = myPhone.split('=')[1]; //определяет user авторизованного, например 444
            sobesednik = sobesednik.split('=')[1]; //определяет Phone number собеседника, например 123
            
            


            const msgsByPhone = getMessagesByPhone(myPhone, sobesednik);
            const stringMessages = JSON.stringify(msgsByPhone);
            res.end(stringMessages);
        } else if(req.method === 'POST') {
                let data = '';
                req.on('data', (chunk) => {
                    data += chunk;
                });
                req.on('end', () => {
                    saveMessageToFile(data);
                })
        } else {
            req.end('[]');
        }
        
    }
    else if (req.url === '/chats') {
    //add users in server
        /* const users = getUserFromFile();
        const usersArray = Object.values(users); */
        const usersArray = getUserFromFile();
        const chats = usersArray.map((user) => {
            return {
                avatar: './imgs/user.png',
                header: user.nick + ' ' + user.phone,
                previewMessage: 'Hello friends!',
                lastTime: '00:20'
            }
        })
        const stringData = JSON.stringify(chats);
        res.end(stringData);
    }
    else if (req.url === '/req') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            const user = JSON.parse(data);
           /* user ->  {
                phone: string,
                login: string
            }; */
            let answer;
            if (checkUserInFile(user.phone)) {
                answer = {msg: 'User exists', type: 'error'};

            } else {
                addUserToFile(user.nick + ' ' + user.phone)
                answer = {msg: 'User added', type: 'success'};

            }
            res.end(JSON.stringify(answer));            
        })
    } else {
        const html = fs.readFileSync("./error.html");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end('')
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

//for database from files
//userString -> Feda 123123
function addUserToFile(userString) {
    
    const usersFromFiles = fs.readFileSync("./users.txt", "utf8");
    if (!usersFromFiles) {
        fs.writeFileSync("./users.txt", userString)
    } else {
        fs.writeFileSync("./users.txt", usersFromFiles + "\n" + userString)
    }
}

//чтения файла и возврата его содержимого
function getUserFromFile() {
    const usersFromFiles = fs.readFileSync("./users.txt", "utf8");

    if (usersFromFiles === '') {
        return[]
    }

    return usersFromFiles.split('\n').map((raw) => {
        const arrayOfUser = raw.split(' ');
        const nick = arrayOfUser[0];
        const phone = arrayOfUser[1];
        return {
            nick: nick,
            phone: phone,
        };
    });
}

function checkUserInFile(phone) {
    const UserFromFile = getUserFromFile();
    return UserFromFile.find((user) => {
        return user.phone === phone
    })
}

function getAllMessages() {
    const messages = fs.readFileSync("./messages.txt", "utf-8");
    if (!messages) {
        return [];
    }

    return messages.split('/n').map((raw) => {
        return JSON.parse(raw);
    });
}

function getMessagesByPhone(our, his) {
    let msgs = getAllMessages();

    msgs = msgs.filter(({ourNumber, sebesednik}) => {

        typeof sobesednik;
        console.log(sobesednik); 
        const sobesednikPhone = sebesednik.split(' ')[1];
        
                
        if (our === ourNumber && his === sobesednikPhone) {
            return true;
        }
        if (his === ourNumber && our === sobesednikPhone) {
            return true;
        }
        return false;   
    });

    return msgs.map((msg) => {
        const sobesednikPhone = msg.sebesednik.split(' ')[1];
        if (our === msg.ourNumber && his === sobesednikPhone) {
            return {
                ...msg,
                type: 'my'
            };
        } else {
            return {
                ...msg,
                type: 'your'
            };
        }
    })
}

function saveMessageToFile(msg) {
    const filename = "./messages.txt";
    const messages = fs.readFileSync(filename, "utf8");

    if (!messages) {
        fs.writeFileSync(filename, msg)
    } else {
        fs.writeFileSync(filename, messages + "\n" + msg)
    }
}
