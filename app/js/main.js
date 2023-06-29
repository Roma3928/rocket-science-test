'use strict';

import { sendMessageFromUser, sendMessageFromAdmin } from './chat.js';
import Rating from './Rating.js';
import ReadMore from './ReadMore.js';

document.addEventListener('DOMContentLoaded', () => {
  initRating();
  initReadMore();
  initChat();
  initSwiper();
  initLightGallery();
});

function initRating() {
  const ratingElements = document.querySelectorAll('.chat-recipient__rating');
  ratingElements.forEach((element) => new Rating(element));
}

function initReadMore() {
  const readMore = new ReadMore(".about__btn", ".about__text", 262);
}

function initChat() {
  const userSendButton = document.querySelector('.chat__user .chat__btn');
  const adminSendButton = document.querySelector('.chat__admin .chat__btn');
  const userInput = document.querySelector('.chat__user .chat__input');
  const adminInput = document.querySelector('.chat__admin .chat__input');

  userSendButton.addEventListener('click', sendMessageFromUser);
  adminSendButton.addEventListener('click', sendMessageFromAdmin);

  userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessageFromUser();
    }
  });

  adminInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessageFromAdmin();
    }
  });
}

function initSwiper() {
  const swiper = new Swiper('.reviews__slider', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    pagination: {
      el: '.reviews__pagination',
      clickable: true,
      bulletClass: 'reviews__dot',
      bulletActiveClass: 'reviews__dot--active',
    },
    breakpoints: {
      440: {
        spaceBetween: 20,
      }
    },
  });
}

function initLightGallery() {
  const reviewsImgLists = document.querySelectorAll('.reviews-img__list');

  reviewsImgLists.forEach((imgList) => {
    lightGallery(imgList, {
      cssEasing: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
      speed: 1000,
    });
  });
}