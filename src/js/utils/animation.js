import refs from '../refs';

//! Анімація кнопки
const startAnimationCycle = () => {
  // Функція для разового запуску анімації
  const triggerAnimation = () => {
    refs.leaveFeedbackBtn.classList.add('shake-bottom');

    // Анімація триває 0.8s, після чого знімаємо клас, щоб вона не "трусилася" постійно
    setTimeout(() => {
      refs.leaveFeedbackBtn.classList.remove('shake-bottom');
    }, 800);
  };

  // Перший запуск одразу при появі
  triggerAnimation();

  // Запускаємо інтервал кожні 10 секунд
  setInterval(triggerAnimation, 10000);
};

startAnimationCycle();
