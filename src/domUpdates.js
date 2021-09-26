//SELECTORS
const myBookingTab = document.getElementById("my-booking-tab");
const newBookingTab = document.getElementById("new-booking-tab");
const totalCost = document.querySelector(".total-cost");

// CONTAINERS
const bookingDisplay = document.querySelector(".booking-display");
const makeNewDisplay = document.querySelector(".make-new-display");

// DOM related functions
const domUpdates = {
  renderBookings(bookingArray) {
    bookingDisplay.innerHTML = "";

    bookingArray.forEach(booking => {
      bookingDisplay.innerHTML += `
        
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

  hide(element) {
    element.classList.add("hidden");
  },

  show(element) {
    element.classList.remove("hidden");
  },

  myBookingTab,
  newBookingTab,
  totalCost,
  bookingDisplay,
  makeNewDisplay,
};

export default domUpdates;
