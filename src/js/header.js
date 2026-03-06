const menu = document.querySelector('[data-menu]');
const openBtn = document.querySelector('[data-menu-open]');
const closeBtn = document.querySelector('[data-menu-close]');
const menuLinks = document.querySelectorAll('.mobile-nav a');

openBtn.addEventListener('click', () => {
  menu.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
  menu.classList.remove('is-open');
  document.body.style.overflow = '';
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('is-open')) {
    menu.classList.remove('is-open');
  }
});

menu.addEventListener('click', e => {
  if (e.target === menu) {
    menu.classList.remove('is-open');
  }
});
