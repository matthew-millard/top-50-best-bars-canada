const favIcon = document.querySelector('.fa-heart');
const barId = favIcon.getAttribute('data-id');
const added = document.querySelector('.added');

const handleClick = async (event) => {
  event.preventDefault();

  const response = await fetch('/api/favourites', {
    method: 'POST',
    body: JSON.stringify({ bar_id: barId }),
    headers: { 'content-type': 'application/json' },
  });

  if (response.ok) {
    console.log('Successful post to favourites');
    added.setAttribute('style', 'display: block');
  } else {
    console.log('Error posting to favourites: already added.');
    added.innerHTML = 'Already added to favourites!';
    added.setAttribute('style', 'display: block');
  }
};

favIcon.addEventListener('click', handleClick);
