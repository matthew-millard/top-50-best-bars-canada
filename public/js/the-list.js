const moreInfoButtons = Array.from(document.querySelectorAll('.bar-list__info-button'));


moreInfoButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-id');
    const url = `/api/bars/${id}`;
    window.location.href = url;
    console.log('clicked')
  });
});
