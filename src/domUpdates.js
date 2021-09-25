//SELECTORS
const pastBookingTab = document.getElementById("past-booking-tab");
const futureBookingTab = document.getElementById("future-booking-tab");
const newBookingTab = document.getElementById("new-booking-tab");
const totalCost = document.getElementById("total-cost");

// CONTAINERS
const dbDisplay = document.getElementById("db-display");

// DOM related functions
const domUpdates = {
  renderPastBookings() {
    console.log("renderPastBookings starts");
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
