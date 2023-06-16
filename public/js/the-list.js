const moreInfoBtn = Array.from(document.querySelectorAll('.more-info-btn'));


moreInfoBtn.forEach((button) => {
  button.addEventListener('click', async () => {
    const id = button.getAttribute('data-id');
    const url = `/api/bars/${id}`;
    window.location.href = url;
  });
});
