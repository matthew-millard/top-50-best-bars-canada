const cta = document.querySelector('.welcome-cta');

cta.addEventListener('click', () => {
  document.location.replace('/the-list');
  console.log('clicked');
});
