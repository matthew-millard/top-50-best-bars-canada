const navList = document.querySelector('.header__nav-list');
const navToggle = document.querySelector('.header__nav-toggle');
const openIcon = document.querySelector('.fa-bars');
const closeIcon = document.querySelector('.fa-xmark');

// Event listener for nav toggle button
// Toggles the nav list visibility
// Toggles the aria-expanded attribute
navToggle.addEventListener('click', () => {
  const visibliity = navList.getAttribute('data-visible');
  if (visibliity === 'false') {
    navList.setAttribute('data-visible', 'true');
    navToggle.setAttribute('aria-expanded', 'true');
    closeIcon.classList.remove('display-none');
    openIcon.classList.add('display-none');
  } else {
    navList.setAttribute('data-visible', 'false');
    navToggle.setAttribute('aria-expanded', 'false');
    openIcon.classList.remove('display-none');
    closeIcon.classList.add('display-none');
  }
});
