const signupForm = document.querySelector('.signupForm');
const usernameEl = signupForm.querySelector('#your-name');
const emailEl = signupForm.querySelector('#your-email');
const passwordEl = signupForm.querySelector('#your-password');
const passwordRepeatEl = signupForm.querySelector('#repeat-password');

const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect email and password values
  const username = usernameEl.value.trim();
  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();
  const passwordRepeat = passwordRepeatEl.value.trim();

  console.log(username, email, password, passwordRepeat);
  if (password !== passwordRepeat) {
    return console.error('Passwords do not match!');
  }

  if (username && email) {
    const response = await fetch('/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'content-type': 'application/json' },
    });
    if (response.status === 200) {
      return document.location.replace('login');
    }
  }
};

signupForm.addEventListener('submit', signupFormHandler);
