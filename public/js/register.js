const registerForm = document.querySelector('.registerForm');
const usernameEl = registerForm.querySelector('#username');
const emailEl = registerForm.querySelector('#email');
const passwordEl = registerForm.querySelector('#password');
const confirmPasswordEl = registerForm.querySelector('#confirmPassword');

// Show Error Messages Function
function displayErrorMessage(errorMessage) {
  const errorMessageContainer = document.querySelector('.register-error');
  errorMessageContainer.innerHTML = '';
  const errorMessageElement = document.createElement('p');

  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add('error-message');

  errorMessageContainer.appendChild(errorMessageElement);
}

const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect email and password values
  const username = usernameEl.value.trim();
  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();
  const confirmPassword = confirmPasswordEl.value.trim();

  if (password !== confirmPassword) {
    return displayErrorMessage('Passwords do not match');
  }

  if (username && email) {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'content-type': 'application/json' },
    });
    if (!response.ok) {
      const data = await response.json();
      displayErrorMessage(data.message);
    } else {
      return document.location.replace('login');
    }
  }
};

registerForm.addEventListener('submit', signupFormHandler);
