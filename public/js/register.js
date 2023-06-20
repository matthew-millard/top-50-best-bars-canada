const registerForm = document.querySelector('.register__form-container');
const usernameEl = registerForm.querySelector('#username');
const emailEl = registerForm.querySelector('#email');
const passwordEl = registerForm.querySelector('#password');
const confirmPasswordEl = registerForm.querySelector('#confirmPassword');

// Show Error Messages Function
function displayErrorMessage(errorMessage) {
  const errorMessageContainer = document.querySelector('.register__error-message');
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
      showModal('Registration successful! Redirecting to login...');
      setTimeout(() => {
        document.location.replace('login');
      }, 2000); // Redirect after 2 seconds
    }
  }
};

// Function to display the pop-up modal with the specified message
function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');

  // Set the message
  modalMessage.textContent = message;

  // Display the modal
  modal.style.display = 'block';

  // Automatically hide the modal after 3 seconds
  setTimeout(() => {
    closeModal();
  }, 2000); // Redirect after 2 seconds
}

// Function to close the pop-up modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Attach click event listener to the close button
const closeButton = document.querySelector('.modal__close');
closeButton.addEventListener('click', closeModal);


registerForm.addEventListener('submit', signupFormHandler);