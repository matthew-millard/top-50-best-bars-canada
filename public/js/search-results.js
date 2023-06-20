const bars = Array.from(document.querySelectorAll('.search-results__bar'));

bars.forEach((bar) => {
  bar.addEventListener('click', (event) => {
    event.stopPropagation();
    const barId = event.currentTarget.getAttribute('data-bar-id');
    const url = `api/bars/${barId}`;
    redirect(url, barId);
  });
});

// Redirect to bar page
async function redirect(url, barId) {
  console.log(barId);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(response);
      return document.location.replace('/search');
    }
    document.location.replace(`/api/bars/${barId}`);
  } catch (err) {
    console.error(err);
  }
}
