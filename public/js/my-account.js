const deleteBtn = document.querySelector('#delete-account-btn');
const changePasswordBtn = document.querySelector('#change-password-btn');
const userId = document.querySelector('#userId');
const id = userId.getAttribute('data-id');

// Delete user account handler
const deleteAccountHandler = async () => {
  try {
    const response = await fetch(`/api/users/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    // If account has been successfully deleted, redirect user to the homepage.
    if (response.status === 200) {
      console.log('User account deleted.');
      return document.location.replace('/');
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
deleteBtn.addEventListener('click', deleteAccountHandler);
changePasswordBtn.addEventListener('click', changePasswordHandler);
