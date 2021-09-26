//SELECTORS
const myBookingTab = document.getElementById("my-booking-tab");

const newBookingTab = document.getElementById("new-booking-tab");
const totalCost = document.getElementById("total-cost");

// CONTAINERS
const dbDisplay = document.getElementById("db-display");

// DOM related functions
const domUpdates = {
  renderBookings(bookingArray) {
    dbDisplay.innerHTML = "";

    bookingArray.forEach(booking => {
      dbDisplay.innerHTML += `
        
        <card class="booking-card">
            <p>Date: ${booking.date}</p>
            <p>Room number: ${booking.roomNumber}</p>
        </card>
        `;
    });
  },

  renderTotalCost(cost) {
    totalCost.innerText = "";
    totalCost.innerText = `
     Total Booking Cost: $ ${cost}
    `;
  },

  renderFutureBookings() {
    console.log("renderFutureBookings starts");
  },

  renderNewBooking() {
    console.log("renderNewBooking starts");
  },

  myBookingTab,
  newBookingTab,
  totalCost,
  dbDisplay,
};

export default domUpdates;
