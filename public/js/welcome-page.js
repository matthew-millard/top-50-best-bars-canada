const cta = document.querySelector('.welcome-cta');
const header = document.querySelector('.header');

// Add display none from header
header.classList.add('display-none');

cta.addEventListener('click', () => {
  document.location.replace('/the-list');
  console.log('clicked');
});
