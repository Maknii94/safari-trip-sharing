export function initBooking() {
  console.log("initBooking() called");

  // Use event delegation for any modal that is shown.
  document.addEventListener('shown.bs.modal', (e) => {
    const modal = e.target;
    console.log("Modal shown:", modal.id);
    attachBookingEvents(modal);
  });

  attachBookingFormSubmissions();
}

function attachBookingEvents(modal) {
  // Avoid attaching multiple times.
  if (modal.dataset.bookingInitialized === 'true') {
    return;
  }
  modal.dataset.bookingInitialized = 'true';

  // Plus button inside the modal
  const plusButtons = modal.querySelectorAll('.seat-plus');
  plusButtons.forEach((button) => {
    button.addEventListener('click', () => {
      console.log("Plus button clicked", button);
      const availableSeats = parseInt(button.getAttribute('data-available-seats'), 10);
      const pricePerPerson = parseFloat(button.getAttribute('data-price-per-person'));
      const days = parseInt(button.getAttribute('data-days'), 10); 
      const seatCountEl = modal.querySelector('.seat-count');
      const seatsInput = modal.querySelector('.seats-input');
      const computedPriceEl = modal.querySelector('.computed-price');

      let currentCount = parseInt(seatCountEl.textContent, 10);
      if (currentCount < availableSeats) {
        currentCount++;
      }
      seatCountEl.textContent = currentCount;
      seatsInput.value = currentCount;
      computedPriceEl.textContent = (pricePerPerson * currentCount * days).toFixed(2);
    });
  });

  // Minus button inside the modal
  const minusButtons = modal.querySelectorAll('.seat-minus');
  minusButtons.forEach((button) => {
    button.addEventListener('click', () => {
      console.log("Minus button clicked", button);
      const pricePerPerson = parseFloat(button.getAttribute('data-price-per-person'));
      const days = parseInt(button.getAttribute('data-days'), 10);
      const seatCountEl = modal.querySelector('.seat-count');
      const seatsInput = modal.querySelector('.seats-input');
      const computedPriceEl = modal.querySelector('.computed-price');

      let currentCount = parseInt(seatCountEl.textContent, 10);
      if (currentCount > 1) {
        currentCount--;
      }
      seatCountEl.textContent = currentCount;
      seatsInput.value = currentCount;
      computedPriceEl.textContent = ( currentCount * pricePerPerson * days).toFixed(2);
    });
  });

  // Initialize computed price when the modal is shown
  const plusButton = modal.querySelector('.seat-plus');
  if (plusButton) {
    const pricePerPerson = parseFloat(plusButton.getAttribute('data-price-per-person'));
    const days = plusButton(button.getAttribute('data-days'), 10);
    const computedPriceEl = modal.querySelector('.computed-price');
    computedPriceEl.textContent = (1 * days * pricePerPerson).toFixed(2);
  }

  function attachBookingFormSubmissions() {
    // Attach a submit event listener to every booking form.
    const bookingForms = document.querySelectorAll('form[action^="/trips/"]');
    bookingForms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission.
        const formData = new FormData(form);
        const action = form.getAttribute('action');
        try {
          const response = await fetch(action, {
            method: 'POST',
            body: formData
          });
          if (response.ok) {
            // On success, close the modal and show a confirmation pop-up.
            const modalEl = form.closest('.modal');
            // Use Bootstrap's modal instance to hide the modal.
            const bsModal = bootstrap.Modal.getInstance(modalEl);
            if (bsModal) {
              bsModal.hide();
            } else {
              modalEl.classList.remove('show');
            }
            alert("Booking successful! You'll receive a confirmation email shortly.");
            // Optionally, update the UI (e.g. reduce available seats in the search results).
          } else {
            const errorData = await response.json();
            console.error("Error in booking: "+ errorData);
            alert("Error: " + errorData.error);
          }
        } catch (err) {
          console.error(err);
          alert("An error occurred during booking.");
        }
      });
    });
  }
}
