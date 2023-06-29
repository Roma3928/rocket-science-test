import Message from './Message.js';

function init() {
    const userChat = document.querySelector('.chat__user .chat__body');
    const adminChat = document.querySelector('.chat__admin .chat__body');
    const messageInputUser = document.querySelector('.chat__user .chat__input');
    const messageInputAdmin = document.querySelector('.chat__admin .chat__input');

    return {
        userChat,
        adminChat,
        messageInputUser,
        messageInputAdmin,
    };
}

const { userChat, adminChat, messageInputUser, messageInputAdmin } = init();

function sendMessage(sender, input) {
    const messageText = input.value.trim();
    if (messageText !== '') {
        const currentTime = Date.now();
        const avatar = sender === 'user' ? 'img/ava-user.jpg' : 'img/ava-admin.jpg';

        const message = new Message(avatar, messageText, currentTime);

        userChat.appendChild(message.createMessageElement(sender));
        adminChat.appendChild(message.createMessageElement(sender === 'user' ? 'admin' : 'user'));

        input.value = '';
    }
}

function sendMessageFromUser() {
    sendMessage('user', messageInputUser);
}

function sendMessageFromAdmin() {
    sendMessage('admin', messageInputAdmin);
}

export { sendMessageFromUser, sendMessageFromAdmin };
