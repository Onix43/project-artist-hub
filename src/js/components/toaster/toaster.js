import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showSuccessToast() {
  iziToast.show({
    title: '✅ Success!',
    titleColor: '#fff',
    messageColor: '#fff',
    iconColor: '#fff',
    backgroundColor: '#764191',
    position: 'topCenter',
    message: 'Your feedback received successfully!',
  });
}
