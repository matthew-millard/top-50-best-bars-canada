const changePasswordForm = document.querySelector('.change-password-form');
const currentPasswordEl = document.querySelector('#oldPassword');
const newPasswordEl = document.querySelector('#newPassword');
const checkPasswordEl = document.querySelector('#confirmPassword');

const changePasswordHandler = async (event) => {
  event.preventDefault();

  const currentPassword = currentPasswordEl.value.trim();
  const newPassword = newPasswordEl.value.trim();
  const confirmPassword = checkPasswordEl.value.trim();

  if (newPassword !== confirmPassword) {
    console.log('New password and confirm password must match.');
    return;
  }

  const response = await fetch('/api/users/change-password', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, newPassword }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status === 200) {
    console.log('Password changed.');
    return document.location.replace('/account');
  } else {
    const error = await response.json();
    console.log(error.message);
  }
};

changePasswordForm.addEventListener('submit', changePasswordHandler);
