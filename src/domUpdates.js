//SELECTORS
const pastBookingTab = document.getElementById("past-booking-tab");
const futureBookingTab = document.getElementById("future-booking-tab");
const newBookingTab = document.getElementById("new-booking-tab");
const totalCost = document.getElementById("total-cost");

// CONTAINERS
const dbDisplay = document.getElementById("db-display");

// DOM related functions
const domUpdates = {
  renderPastBookings(bookingArray) {
    dbDisplay.innerHTML = "";

    bookingArray.forEach(booking => {
      dbDisplay.innerHTML += `
        
        <card class="booking-card">
            <p>Date: ${booking.date}</p>
            <p>Room number: ${booking.roomNumber}</p>
        </card>
        `;
    });

    console.log("renderPastBookings starts");
  },

  renderTotalCost(bookingArray) {
    console.log("render total cost starts");
  },

  renderFutureBookings() {
    console.log("renderFutureBookings starts");
  },

  renderNewBooking() {
    console.log("renderNewBooking starts");
  },

  pastBookingTab,
  futureBookingTab,
  newBookingTab,
  totalCost,
  dbDisplay,
};

export default domUpdates;
