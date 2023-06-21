const moreInfoButtons = Array.from(document.querySelectorAll('.bar-list__info-button'));

// Adds event listeners to each "more info" button, then redirects to the bar's url
moreInfoButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-id');
    const url = `/api/bars/${id}`;
    window.location.href = url;
    console.log('clicked');
  });
});
