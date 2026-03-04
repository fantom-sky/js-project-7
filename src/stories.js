import "css-star-rating/css/star-rating.css";

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BASE_URL = `https://paw-hut.b.goit.study`;
const ANDROID_URL = `/api/feedbacks`;
const feedbacks = document.querySelector('.feedbacks');

fetch(`${BASE_URL}${ANDROID_URL}`)
    .then(response => response.json())
    .then(data => createFeedbackCard(data.feedbacks))
  .catch(error => console.error('Error fetching data:', error));

  function renderStars(rate) {
  const rating = Math.round(rate * 2) / 2;

  const full = Math.floor(rating);
  const half = rating % 1 !== 0 ? 1 : 0;
  const empty = 5 - full - half;

  const fullStars = `
    <svg class="star star-filled">
      <use href="../img/icons.svg#star-filled"></use>
    </svg>
  `.repeat(full);

  const halfStar = half ? `
    <svg class="star star-half">
      <use href="../img/icons.svg#star-half"></use>
    </svg>
  ` : '';

  const emptyStars = `
    <svg class="star star-outline">
      <use href="../img/icons.svg#star-outline"></use>
    </svg>
  `.repeat(empty);

  return fullStars + halfStar + emptyStars;
}
  
function createFeedbackCard(items) {
    const marcupFeedback = items.map(review => `
       <div class="feedback-card">
             <div class="rating">
        <div class="stars">${renderStars(review.rate)}</div>
      </div>
            <p class="feedback-description">${review.description}</p>
            <p class="feedback-author">${review.author}</p>
            </div> `).join('');
    feedbacks.insertAdjacentHTML('beforeend', marcupFeedback);
}


