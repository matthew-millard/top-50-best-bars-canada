document.addEventListener('DOMContentLoaded', (event) => {
  const barLinks = Array.from(document.querySelectorAll('.bar-link'));

  // Adds an event listener for each bar link and fetches bar information from database for each bar
  barLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const barId = link.getAttribute('data-id');

      fetch(`/api/bars/${barId}`)
        .then((response) => response.json())
        .then((bar) => {
          // Adds bar description to front-end
          document.querySelector('#descript .text-sub').textContent = bar.description;
        })
        .catch((error) => console.error(error));
    });
  });
});
