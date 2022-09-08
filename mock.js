//Боковая левая панель

const chats = [
    {
        avatar: './imgs/tor.jpeg',
        header: 'Pupkin',
        previewMessage: 'FUCK! Am I gay?',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/tor2.jpg',
        header: 'Pupkin',
        previewMessage: 'Some kind of bullshit is going on',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/doc.jpeg',
        header: 'Pupkin',
        previewMessage: 'Hi! What are you doing?',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/tor.jpeg',
        header: 'Pupkin',
        previewMessage: 'Hi! How are you doing?',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/tor.jpeg',
        header: 'Pupkin',
        previewMessage: 'FUCK! Am I gay?',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/tor2.jpg',
        header: 'Pupkin',
        previewMessage: 'Some kind of bullshit is going on',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/doc.jpeg',
        header: 'Pupkin',
        previewMessage: 'Hi! What are you doing?',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/tor.jpeg',
        header: 'Pupkin',
        previewMessage: 'Hi! How are you doing?',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/tor.jpeg',
        header: 'Pupkin',
        previewMessage: 'FUCK! Am I gay?',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/tor2.jpg',
        header: 'Pupkin',
        previewMessage: 'Some kind of bullshit is going on',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/doc.jpeg',
        header: 'Pupkin',
        previewMessage: 'Hi! What are you doing?',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/tor.jpeg',
        header: 'Pupkin',
        previewMessage: 'Hi! How are you doing?',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/tor.jpeg',
        header: 'Pupkin',
        previewMessage: 'FUCK! Am I gay?',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/tor2.jpg',
        header: 'Pupkin',
        previewMessage: 'Some kind of bullshit is going on',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/doc.jpeg',
        header: 'Pupkin',
        previewMessage: 'Hi! What are you doing?',
        lastTime: '19:50'
    },
    {
        avatar: './imgs/tor.jpeg',
        header: 'Pupkin',
        previewMessage: 'Hi! How are you doing?',
        lastTime: '19:50'
    }
];

let messages = [
    {
        text: '123sdfsdfsdf',
        time: '19:10'
    },
    {
        text: '123sdfsdfsdf',
        time: '19:10'
    },
];

messages = messages.map((message, index) => {
    if (index % 2) {
        message.type = 'my'
    } else {
        message.type = 'your';
    }
    return message;
});
console.log(messages)

module.exports = {
    messages,
    chats
}
