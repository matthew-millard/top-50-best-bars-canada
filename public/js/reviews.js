const reviewForm = document.querySelector('.bar-detail__review-form');
const reviewTextarea = reviewForm.querySelector('.bar-detail__review-input');

// Show Error Messages Function
function displayErrorMessage(errorMessage) {
    const errorMessageContainer = document.querySelector(
      '.bar-detail__review-input-error-message'
    );
    const errorMessageElement = document.createElement('small');
  
    errorMessageElement.textContent = errorMessage;
    errorMessageElement.classList.add('error-message');
  
    errorMessageContainer.appendChild(errorMessageElement);
  }



// Function to post user's comment
const reviewFormHandler = async (event) => {
  event.preventDefault();
  try {
    // Collect value from textarea
    const newReview = reviewTextarea.value.trim();

    // Collect post id from data attribute
    const reviewId = reviewForm.getAttribute('data-id');

    // Clear textarea value
    reviewTextarea.value = '';

    // Check comment is not empty
    if (newReview) {
      // Package up and post comment to database
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
          review_body: newReview,
          review_id: reviewId,
        }),
        headers: { 'content-type': 'application/json' },
      });

      // If unsuccessful, alert user
      if (response.status === 401) {
        displayErrorMessage('You must be logged in to leave a review.');
      }

      // If successful, update page to display new comment.
      if (response.status === 200) {
        document.location.reload();
      }
    }
  } catch (err) {
    console.error(err);
  }
};


// Event Handlers
reviewForm.addEventListener('submit', reviewFormHandler);

// // Function to update user's review
// const updateReview = async (reviewId, updatedReviewBody) => {
//   try {
//     // Send request to update the review
//     const response = await fetch(`/api/reviews/${reviewId}`, {
//       method: 'PUT',
//       body: JSON.stringify({ review_body: updatedReviewBody }),
//       headers: { 'content-type': 'application/json' },
//     });

//     // If successful, update the page to reflect the changes
//     if (response.ok) {
//       document.location.reload();
//     } else {
//       // If unsuccessful, display an error message
//       const errorData = await response.json();
//       displayErrorMessage(errorData.message);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Function to delete user's review
// const deleteReview = async (reviewId) => {
//   try {
//     // Send request to delete the review
//     const response = await fetch(`/api/reviews/${reviewId}`, {
//       method: 'DELETE',
//       headers: { 'content-type': 'application/json' },
//     });

//     // If successful, update the page to reflect the changes
//     if (response.ok) {
//       document.location.reload();
//     } else {
//       // If unsuccessful, display an error message
//       const errorData = await response.json();
//       displayErrorMessage(errorData.message);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Event listener for edit button
// editButton.addEventListener('click', () => {
//   // Get the review ID and current review body from the DOM
//   const reviewId = editButton.getAttribute('data-review-id');
//   const currentReviewBody = editButton.getAttribute('data-review-body');

//   // Display a form or modal where the user can update their review
//   displayEditForm(reviewId, currentReviewBody);
// });

// // Event listener for delete button
// deleteButton.addEventListener('click', () => {
//   // Get the review ID from the DOM
//   const reviewId = deleteButton.getAttribute('data-review-id');

//   // Display a confirmation modal to confirm the deletion
//   displayDeleteConfirmation(reviewId);
// });

// // Event listener for form submission (for updating the review)
// editForm.addEventListener('submit', (event) => {
//   event.preventDefault();

//   // Get the review ID and updated review body from the form
//   const reviewId = editForm.getAttribute('data-review-id');
//   const updatedReviewBody = editForm.reviewBody.value.trim();

//   // Update the review
//   updateReview(reviewId, updatedReviewBody);
// });

// // Event listener for delete confirmation
// deleteConfirmationButton.addEventListener('click', () => {
//   // Get the review ID from the confirmation modal
//   const reviewId = deleteConfirmationButton.getAttribute('data-review-id');

//   // Delete the review
//   deleteReview(reviewId);
// });

// // Event Handlers
// reviewForm.addEventListener('submit', reviewFormHandler);
