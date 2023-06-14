const loginForm = document.querySelector('.loginForm');
const emailEl = loginForm.querySelector('[type="email"]');
const passwordEl = loginForm.querySelector('[type="password"]');

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect email and password values
  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'content-type': 'application/json' },
    });

    if (response.status === 200) {
      return document.location.replace('/');
    } else {
      console.error('Not found.');
    }
  }
};

loginForm.addEventListener('submit', loginFormHandler);
