const favIcon = document.querySelector('.bar-detail__fav-icon');
const favIconSolid = document.querySelector('.bar-detail__fav-icon--solid');
const barId = favIcon.getAttribute('data-id');
const added = document.querySelector('.bar-detail__fav-message');

const favIconHandler = async (event) => {
  event.preventDefault();

  const response = await fetch('/api/favourites', {
    method: 'POST',
    body: JSON.stringify({ bar_id: barId }),
    headers: { 'content-type': 'application/json' },
  });

  if (response.ok) {
    favIcon.classList.add('display-none');
    favIconSolid.classList.remove('display-none');
    console.log('Successful post to favourites');
    added.setAttribute('style', 'display: block');
  } else {
    console.log('Error posting to favourites: already added.');
    added.innerHTML = 'Already added to favourites!';
    added.setAttribute('style', 'display: block');
  }
};

favIcon.addEventListener('click', favIconHandler);
