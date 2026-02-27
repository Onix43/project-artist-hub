import { postFeedback } from '../../api/feedback-api';
import { showErrorToast, showSuccessToast } from '../toaster/toaster.js';

//

const closeBtn = document.querySelector('.feedback-close-btn');
const leaveFeedbackBtn = document.querySelector('.btn-feedback-modal');
const feedbackModal = document.querySelector('.feedback-modal');
const feedbackForm = document.querySelector('.feedback-form');
const feedbackInpName = document.querySelector('.feedback-name-inp');
const feedbackInpMsg = document.querySelector('.feedback-msg-inp');
const feedbackErrorTxtName = document.querySelector('.feedback-error-txt-name');
const feedbackErrorTxtMsg = document.querySelector('.feedback-error-txt-msg');
const feedbackRatingError = document.querySelector(
  '.feedback-error-rating-msg'
);
const feedbackStar = document.querySelector('.feedback-rating');

// form

feedbackForm.addEventListener('submit', async event => {
  event.preventDefault();

  const feedbackData = new FormData(feedbackForm);

  const feedbackName = feedbackData.get('feedback-name').trim();
  const feedbackRating = feedbackData.get('star-rating');
  const feedbackMsg = feedbackData.get('feedback-msg').trim();

  let hasError = false;

  if (feedbackName.length < 2 || feedbackName.length > 16) {
    feedbackInpName.classList.add('feedback-error');
    feedbackErrorTxtName.classList.add('is-open');
    hasError = true;
  }

  if (!feedbackRating) {
    feedbackRatingError.classList.add('is-open');
    hasError = true;
  }

  if (feedbackMsg.length < 10 || feedbackMsg.length > 512) {
    feedbackInpMsg.classList.add('feedback-error');
    feedbackErrorTxtMsg.classList.add('is-open');
    hasError = true;
  }

  if (hasError) return;

  try {
    const feedback = await postFeedback({
      name: feedbackName,
      rating: Number(feedbackRating),
      descr: feedbackMsg,
    });
    feedbackForm.reset();
    closeModal();
    showSuccessToast();
  } catch (error) {
    showErrorToast(error.message);
    closeModal();
  }
});

// open-close modal

leaveFeedbackBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
feedbackModal.addEventListener('click', event => {
  const clickInside = event.target.closest('.container');
  if (!clickInside) {
    closeModal();
  }
  return;
});
feedbackModal.addEventListener('cancel', () => {
  document.body.style.overflow = '';
});

function openModal() {
  feedbackModal.showModal();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  feedbackModal.close();
  document.body.style.overflow = '';
}

// style-remover

feedbackInpName.addEventListener('click', delErrorStyle);
feedbackInpMsg.addEventListener('click', delErrorStyle);
feedbackStar.addEventListener('click', delErrorStyle);

function delErrorStyle(event) {
  if (
    event.target.closest('.feedback-name-inp') &&
    feedbackInpName.classList.contains('feedback-error')
  ) {
    feedbackInpName.classList.remove('feedback-error');
    feedbackErrorTxtName.classList.remove('is-open');
  }
  if (
    event.target.closest('.feedback-msg-inp') &&
    feedbackInpMsg.classList.contains('feedback-error')
  ) {
    feedbackInpMsg.classList.remove('feedback-error');
    feedbackErrorTxtMsg.classList.remove('is-open');
  }
  if (
    event.target.closest('.feedback-rating') &&
    feedbackRatingError.classList.contains('is-open')
  ) {
    feedbackRatingError.classList.remove('is-open');
  }
}
// textarea rows resize

window.addEventListener('resize', rowsResize);

function rowsResize() {
  if (window.innerWidth >= 768) {
    feedbackInpMsg.rows = 6;
  } else {
    feedbackInpMsg.rows = 4;
  }
}

rowsResize();
