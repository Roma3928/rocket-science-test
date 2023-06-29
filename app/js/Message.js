export default class Message {
  constructor(avatar, text, time) {
    this.avatar = avatar;
    this.text = text;
    this.time = time;
  }

  formatDate() {
    const messageDate = new Date(this.time);
    const currentDate = new Date();

    if (messageDate.toDateString() === currentDate.toDateString()) {
      return 'Сегодня';
    } else if (messageDate.toDateString() === new Date(currentDate - 86400000).toDateString()) {
      return 'Вчера';
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return messageDate.toLocaleDateString(undefined, options);
    }
  }

  formatTime() {
    const date = new Date(this.time);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  createMessageElement(sender) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('chat-message');

    const avatarImage = document.createElement('img');
    avatarImage.classList.add('chat-message__ava');
    avatarImage.src = this.avatar;
    avatarImage.alt = 'Avatar';

    const messageContent = document.createElement('div');
    messageContent.classList.add('chat-message__content');

    const messageText = document.createElement('p');
    messageText.classList.add('chat-message__text');
    messageText.textContent = this.text;

    const messageTime = document.createElement('p');
    messageTime.classList.add('chat-message__time');
    messageTime.innerHTML = `<span>${this.formatDate()}</span> в <span>${this.formatTime()}</span>`;

    messageContent.appendChild(messageText);
    messageContent.appendChild(messageTime);

    messageContainer.appendChild(avatarImage);
    messageContainer.appendChild(messageContent);

    if (sender === 'user') {
      messageContainer.classList.add('chat-message--sender');
    } else if (sender === 'admin') {
      messageContainer.classList.add('chat-message--recipient');
    }

    return messageContainer;
  }
}

