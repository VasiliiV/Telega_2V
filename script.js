/* if (localStorage.getItem('user')) {
    main();
} else {
    location.assign('./login');
} */

const newMessage = document.querySelector('.Content_newMassageInput');
const sendIcon = document.querySelector('.Content_newMassageRecord');

newMessage.addEventListener('input', (e) => {
    const message = e.target.value;
    if (message) {
        sendIcon.classList.remove('record');
        sendIcon.classList.add('send');
    }
    else {
        sendIcon.classList.add('record');
        sendIcon.classList.remove('send');
    }
})

//Отправка сообщения --my
const ContentMassages = document.querySelector('.Content_messages');

sendIcon.addEventListener('click', () => {
    const hoursMinutes = new Date().getHours() + ':' + new Date().getMinutes();
    const msg = newMessage.value

//добавили messages в localStorage, чтобы сообщения не пропадали, а в браузере сохранялись
    const msgsFromLS = localStorage.getItem('messages');
    if (!msgsFromLS) {
        localStorage.setItem('messages', JSON.stringify([msg]));
    } else {
        const msgsArr = JSON.parse(msgsFromLS);
        msgsArr.push(msg);
        localStorage.setItem('messages', JSON.stringify(msgsArr));
    };

    ContentMassages.insertAdjacentHTML('beforeend', `
    <div class="Content_messagesRaw Content_myMessage">
        <div class="Content_message Content_message--my">
            <span class="Content_messageText">${msg}</span>
            <span class="Content_messageTimes--my">${hoursMinutes}</span>
        </div>
        <svg class="Content_myMessageSvg" width="9" height="20" xmlns="http://www.w3.org/2000/svg"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="a"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g fill="none" fill-rule="evenodd"><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#000" filter="url(#a)"></path><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#9fe4ff" class="corner"></path></g></svg>
    </div>
`);

    newMessage.value = '';
});

//Рендер чатов (массив с контактами ушел в mock.js)

const SidebarLeftBody = document.querySelector('.SidebarLeft_body');

function renderChats(chats) {
    SidebarLeftBody.innerHTML = '';
    if (chats.length === 0) {
        SidebarLeftBody.insertAdjacentHTML('beforeend', `
        <div style='display: flex; justify-content: center; align-items: center; height: 100%; flex-direction: column;'> 
        <h4>No Result</h4>
        <span>No chats</span>
        </div>
        `);
    }
}
function renderNewChats(chats) {
    chats.forEach((chat) => {
        SidebarLeftBody.insertAdjacentHTML('beforeend', `
        <div class="SidebarLeft_chat"; onclick="chooseChat(event)";>
                        <div style="display: flex; flex-grow: 1;">
                            <div class="SidebarLeft_avatar">
                                <img src=${chat.avatar}>
                            </div>
                            <div class="SidebarLeft_HeaderChatInfo">
                                <div id="info_h">
                                    <h3>${chat.header}</h3>
                                </div>
                                <div id="info_span">
                                    <span>${chat.previewMessage}</span>
                                </div>
                                <p class="SidebarLeft_searchTime">${chat.lastTime}</p>
                            </div>
                        </div>
                    </div>
        `);
    });
}

function chooseChat(event) {
    const contentHeader = document.querySelector('.Content_header');
        contentHeader.style.display = 'flex';
        const contentBody = document.querySelector('.Content_body');
        contentBody.style.display = 'flex';
        const header = event.currentTarget.querySelector('.SidebarLeft_HeaderChatInfo h3')
        console.log(header.innerHTML);
}

/* renderChats(chats); */


//поиск по контактам. Фильтр. SearchChat

const SidebarLeftSearchInput = document.querySelector('.SidebarLeft_searchInput');

SidebarLeftSearchInput.addEventListener('input', (e) => {
    const filteredChats = chats.filter((chat) => chat.header.includes(e.target.value));

    renderChats(filteredChats);
})

function renderMessagesArray(msgArr) {
    msgArr.forEach((msg) => {
        if (msg.type === 'my') {
            ContentMassages.insertAdjacentHTML('beforeend', `
            <div class="Content_messagesRaw Content_myMessage">
                                <div class="Content_message Content_message--my">
                                    <div class="Content_messageText">
                                        <span>${msg.text}</span>
                                    </div>
                                    <div class="Content_messageTimes--my">
                                        <span>${msg.time}</span>
                                    </div>
                                </div>
                                <svg class="Content_myMessageSvg" width="9" height="20" xmlns="http://www.w3.org/2000/svg"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="a"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g fill="none" fill-rule="evenodd"><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#000" filter="url(#a)"></path><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#9fe4ff" class="corner"></path></g></svg>
                            </div>
            `);
        } else {
            ContentMassages.insertAdjacentHTML('beforeend', `
                <div class="Content_messagesRaw Content_yourMessage">
                <svg class="Content_yourMessageSvg" width="9" height="20" xmlns="http://www.w3.org/2000/svg"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="a"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g fill="none" fill-rule="evenodd"><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#000" filter="url(#a)"></path><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#EEFFDE" class="corner"></path></g></svg>
                <div class="Content_message Content_message--your">
                    <div class="Content_messageText">
                        <span >${msg.text}</span>
                    </div>
                    <div class="Content_messageTimes--your">
                        <span>${msg.time}</span>
                    </div>
                </div>
            </div>
        `);
        }
        
    });
}

//Render messages для localStorage

function renderChatsFromLS() {
    const msgs = localStorage.getItem('messages');
    if (msgs) {
        const msgsArr = JSON.parse(msgs)
        renderMessagesArray(msgsArr);
    }
    
}

renderChatsFromLS();

//Render from Server
//По сути создали новый запрос 
function readerMessagesFromServer() {
    fetch('/messages', {
        method: 'GET'
    }).then((response) => {
        response.json().then((data) => {
            renderMessagesArray(data);
        });
    })
}
readerMessagesFromServer();

function renderChatsFromServer() {
    fetch('/chats', {
        method: 'GET'
    }).then((response) => {
        response.json().then((data) => {
            renderChats(data);
        });
    })
}

function renderOnlyNewChats(){
    fetch('/chats', {
        method: 'GET'
    }).then((response) => {
        response.json().then((data) => {
            const headersElement = document.querySelectorAll('.SidebarLeft_HeaderChatInfo h3');
            const headersText = {};
            for (let i = 0; i < headersElement.length; i++) {
                const element = headersElement[i];
                headersText[element.innerHTML] = true;
                console.log();
            }
            const newChats = data.filter((chat) => {
                const header = chat.header;
                if (headersText[header]) {
                    return false;
                } else {
                    return true;
                }
            });
            renderNewChats(newChats);
        });
    })
}

renderChatsFromServer();
setInterval(() => {
    renderOnlyNewChats();
}, 1000)
