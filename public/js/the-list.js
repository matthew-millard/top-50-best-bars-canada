const infoBtn = Array.from(document.querySelectorAll('.bar-list__info-button'));

infoBtn.forEach((button) => {
  button.addEventListener('click', async () => {
    const id = button.getAttribute('data-id');
    const url = `/api/bars/${id}`;
    window.location.href = url;
  });
});
