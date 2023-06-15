document.addEventListener('DOMContentLoaded', (event) => {
  const barLinks = Array.from(document.querySelectorAll('.bar-link'));

  barLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const barId = link.getAttribute('data-id');

      fetch(`/api/bars/${barId}`)
        .then((response) => response.json())
        .then((bar) => {
          document.querySelector('#descript .text-sub').textContent =
            bar.description;
        })
        .catch((error) => console.error(error));
    });
  });
});
