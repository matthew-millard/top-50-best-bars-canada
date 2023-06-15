const deleteBtn = document.querySelector('#delete-account-btn');
const changePasswordBtn = document.querySelector('#change-password-btn');
const userId = document.querySelector('#userId');
const id = userId.getAttribute('data-id');

// Show Error Messages Function
function displayErrorMessage(errorMessage) {
  const errorMessageContainer = document.querySelector('.register-error');
  errorMessageContainer.innerHTML = '';
  const errorMessageElement = document.createElement('p');

  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add('error-message');

  errorMessageContainer.appendChild(errorMessageElement);
}

// Delete user account handler
const deleteAccountHandler = async () => {
  try {
    const response = await fetch(`/api/users/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    // If account has been successfully deleted, redirect user to the homepage.
    if (!response.ok) {
      const err = await response.json();
      displayErrorMessage(err.message);
    }
    document.location.replace('/');
  } catch (err) {
    console.error(err);
  }
};

// Change user password handler
const changePasswordHandler = () => {
  return document.location.replace('/change-password');
};

// Event listeners
deleteBtn.addEventListener('click', deleteAccountHandler);
changePasswordBtn.addEventListener('click', changePasswordHandler);
