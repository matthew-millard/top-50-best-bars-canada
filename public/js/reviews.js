const reviewForm = document.querySelector('.review-form');
const reviewTextarea = reviewForm.querySelector('.review-textarea');

// Show Error Messages Function
function displayErrorMessage(errorMessage) {
    const errorMessageContainer = document.querySelector(
      '.error-message-container'
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
