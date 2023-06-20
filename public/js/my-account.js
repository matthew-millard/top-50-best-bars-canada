const deleteBtn = document.querySelector('#delete-account-btn');
const changePasswordBtn = document.querySelector('#change-password-btn');
const userId = document.querySelector('#userId');
const id = userId.getAttribute('data-id');

// Show Error Messages Function
function displayErrorMessage(errorMessage) {
  const errorMessageContainer = document.querySelector('.register__error-message');
  errorMessageContainer.innerHTML = '';
  const errorMessageElement = document.createElement('p');

  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add('error-message');

  errorMessageContainer.appendChild(errorMessageElement);
}

// Function to display the pop-up modal with the specified message
function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.querySelector('.my-account__modal-message');

  // Set the message
  modalMessage.textContent = message;

  // Display the modal by adding 'show' class
  modal.classList.add('show');
}

// Function to close the pop-up modal
function closeModal() {
  const modal = document.getElementById('modal');

  // Hide the modal by removing 'show' class
  modal.classList.remove('show');
}

// Event listener for delete account button
deleteBtn.addEventListener('click', () => {
  showModal('Are you sure you want to delete your account?');
});

// Event listener for modal confirm button
document.querySelector('.my-account__modal-button--confirm').addEventListener('click', async () => {
  await deleteAccountHandler();
  const confirmButton = document.querySelector('.my-account__modal-button--confirm');
  const cancelButton = document.querySelector('.my-account__modal-button--cancel');
  confirmButton.style.display = 'none';
  cancelButton.style.display = 'none';
});

// Event listener for modal cancel button
document.querySelector('.my-account__modal-button--cancel').addEventListener('click', () => {
  closeModal();
});

// Delete user account handler
const deleteAccountHandler = async () => {
  try {
    const response = await fetch(`/api/users/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const err = await response.json();
      displayErrorMessage(err.message);
    } else {
      showModal('Account deleted successfully!');
      setTimeout(() => {
        document.location.replace('/');
      }, 2000); // Redirect after 2 seconds
    }
  } catch (err) {
    console.error(err);
  }
};

// Change user password handler
const changePasswordHandler = () => {
  return document.location.replace('/change-password');
};

// Event listeners
changePasswordBtn.addEventListener('click', changePasswordHandler);


