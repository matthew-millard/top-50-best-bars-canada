const loginForm = document.querySelector('.login__form');
const usernameEl = loginForm.querySelector('#username');
const passwordEl = loginForm.querySelector('#password');

// Show Error Messages Function
function displayErrorMessage(errorMessage) {
  const errorMessageContainer = document.querySelector('.login__error');
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
        const data = await response.json();
        showModal(data.message); // Display success message in modal
        setTimeout(() => {
          document.location.replace('/my-account');
        }, 2000); // Redirect after 2 seconds
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// Function to display the pop-up modal with the specified message
function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');

  // Set the message
  modalMessage.textContent = message;

  // Display the modal by adding 'show' class
  modal.classList.add('show');

  // Automatically hide the modal after 3 seconds
  setTimeout(() => {
    closeModal();
  }, 3000);
}

// Function to close the pop-up modal
function closeModal() {
  const modal = document.getElementById('modal');

  // Hide the modal by removing 'show' class
  modal.classList.remove('show');
}

loginForm.addEventListener('submit', loginFormHandler);
