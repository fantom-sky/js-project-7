import axios from 'axios';

const orderForm = document.querySelector('.order-form');
const orderBackdrop = document.querySelector('.order-modal-overlay');
const orderCloseBtn = document.querySelector('.order-close-btn');
const orderSubmitBtn = document.querySelector('.order-submit-btn');

export default function openOrderModal(animalId) {
  // Add animal id to order form data set
  orderForm.dataset.animalId = animalId;

  // Show modal order window
  orderBackdrop.classList.add('is-open');

  // Add listener to close button
  orderCloseBtn.addEventListener('click', closeOrderModal);

  // Add listener to order submit button
  orderForm.addEventListener('submit', onOrderSubmit);

  // Add listener to backdrop
  orderBackdrop.addEventListener('click', handleBackdropClick);

  // Add listener for Esc key
  document.addEventListener('keydown', handleEscKeydown);
}

function closeOrderModal() {
  // Hide modal order window
  orderBackdrop.classList.remove('is-open');

  // Remove listener from close button
  orderCloseBtn.removeEventListener('click', closeOrderModal);

  // Remove listener to order submit button
  orderForm.removeEventListener('submit', onOrderSubmit);

  // Remove listener from backdrop
  orderBackdrop.removeEventListener('click', handleBackdropClick);

  // Remove listener from Esc key
  document.removeEventListener('keydown', handleEscKeydown);

  // Remove animal id from order form data set
  delete orderForm.dataset.animalId;

  // Clear order form
  orderForm.reset();
}

function handleBackdropClick(event) {
  if (event.target === orderBackdrop) {
    closeOrderModal();
  }
}

function handleEscKeydown(event) {
  if (event.key === 'Escape' && orderBackdrop.classList.contains('is-open')) {
    closeOrderModal();
  }
}

async function onOrderSubmit(event) {
  event.preventDefault();
  orderSubmitBtn.disabled = true;

  const { name, phone, comment } = event.currentTarget.elements;
  const animalId = event.currentTarget.dataset.animalId;

  const formData = {
    name: name.value.trim(),
    phone: phone.value,
    animalId: animalId,
    comment: comment.value.trim(),
  };

  try {
    const response = await axios.post(
      'https://paw-hut.b.goit.study/api/orders',
      formData
    );

    const orderData = response.data;

    closeOrderModal();

    alert(orderData);
  } catch (error) {
    alert(error.message);
  } finally {
    orderSubmitBtn.disabled = false;
  }
}
