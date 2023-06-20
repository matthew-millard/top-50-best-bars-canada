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
    favIcon.setAttribute('style', 'display: none');
    favIconSolid.setAttribute('style', 'display: block');
  } else {
    console.log('Error posting to favourites: already added.');
  }
};

const handleDelete = async (event) => {
  event.preventDefault();

  const response = await fetch('/api/favourites/' + barId, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
  });

  if (response.ok) {
    favIconSolid.setAttribute('style', 'display: none');
    favIcon.setAttribute('style', 'display: block');
  } else {
    console.log('An error occured removing favourite');
  }
};

const onLoad = async () => {
  const response = await fetch('/api/favourites/' + barId);

  if (response.ok) {
    favIcon.setAttribute('style', 'display: none');
    favIconSolid.setAttribute('style', 'display: block');
  } else {
    favIconSolid.setAttribute('style', 'display: none');
    favIcon.setAttribute('style', 'display: block');
  }
};

if (window.location.pathname !== '/My-Account') onLoad();

favIcon.addEventListener('click', favIconHandler);
favIconSolid.addEventListener('click', handleDelete);
