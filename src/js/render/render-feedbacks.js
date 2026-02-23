import { getFeedbacks } from '../api/feedback-api.js';
import refs from '../refs';
import 'swiper';

async function creatFeedbackList() {
  const feedbacks = await getFeedbacks();

  const markupFeedbacks = feedbacks.data
    .map(({ name, rating, descr }) => {
      const decimal = rating - Math.floor(rating); // целое число
      const integer = Math.floor(rating); // дроброное  число
      let ratingNormalized;

      if (decimal >= 0.1 && decimal <= 0.2) {
        ratingNormalized = integer;
      } else if (decimal > 0.2 && decimal < 0.8) {
        ratingNormalized = `${integer}-${'5'}`;
      } else if (decimal >= 0.8 && decimal <= 0.9) {
        ratingNormalized = integer + 1;
      } else {
        ratingNormalized = integer;
      }

      return `
         <li class="swiper-slide">
            <div class="wrapper">
              <div class="stars-static rating-set-${ratingNormalized}">
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
              </div>
              <p class="user-feedback">
              ${descr}
              </p>
              <p class="user-name">${name}</p>
            </div>
          </li>`;
    })
    .join('');

  refs.listFeedbacks.insertAdjacentHTML('beforeend', markupFeedbacks);
}

creatFeedbackList();

//! Анімація кнопки
const leaveFeedbackBtn = document.querySelector('.btn-feedback-modal');
const startAnimationCycle = () => {
  // Функція для разового запуску анімації
  const triggerAnimation = () => {
    leaveFeedbackBtn.classList.add('shake-bottom');

    // Анімація триває 0.8s, після чого знімаємо клас, щоб вона не "трусилася" постійно
    setTimeout(() => {
      leaveFeedbackBtn.classList.remove('shake-bottom');
    }, 800);
  };

  // Перший запуск одразу при появі
  triggerAnimation();

  // Запускаємо інтервал кожні 10 секунд
  setInterval(triggerAnimation, 10000);
};

startAnimationCycle();
