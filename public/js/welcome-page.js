
const cta = document.querySelector('[data-js="cta"]');
const header = document.querySelector('.header');

header.classList.add('display-none');

cta.addEventListener('click', () => {
  document.location.replace('/the-list');
  console.log('clicked');
});
