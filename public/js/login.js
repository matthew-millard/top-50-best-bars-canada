const loginForm = document.querySelector('.loginForm');
const usernameEl = loginForm.querySelector('#username');
const passwordEl = loginForm.querySelector('#password');

// Show Error Messages Function
function displayErrorMessage(errorMessage) {
  const errorMessageContainer = document.querySelector('.login-error');
  errorMessageContainer.innerHTML = '';
  const errorMessageElement = document.createElement('p');

  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add('error-message');

  errorMessageContainer.appendChild(errorMessageElement);
}

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect email and password values
  const username = usernameEl.value.trim();
  const password = passwordEl.value.trim();

  try {
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'content-type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json();
        displayErrorMessage(data.message);
      } else {
        document.location.replace('/my-account');
      }
    }
  } catch (err) {
    console.log(err);
  }
};

loginForm.addEventListener('submit', loginFormHandler);
