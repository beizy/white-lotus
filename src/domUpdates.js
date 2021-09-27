//SELECTORS
const myBookingTab = document.getElementById("my-booking-tab");
const newBookingTab = document.getElementById("new-booking-tab");
const totalCost = document.querySelector(".total-cost");
const dateInput = document.getElementById("date-input");
const typeFilter = document.getElementById("type-filter");
const bookBtn = document.querySelector(".book");
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn')
const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')
const errorMsgLogin = document.getElementById('errorMsg-login')
const video = document.getElementById('bg-video')

// CONTAINERS
const homeView = document.querySelector('.home-view')
const dashboardView = document.querySelector('.dashboard-view')
const myBookingDisplay = document.querySelector(".my-booking-display");
const makeNewDisplay = document.querySelector(".make-new-display");
const availRoomsBox = document.querySelector(".avail-rooms-box");

// DOM related functions
const domUpdates = {
  renderBookings(bookingArray) {
    myBookingDisplay.innerHTML = "";

    bookingArray.forEach(booking => {
      myBookingDisplay.innerHTML += `
        
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

  renderRooms(roomArray) {
    availRoomsBox.innerHTML = "";
    roomArray.forEach(room => {
      availRoomsBox.innerHTML += `
      <card class="room-card" id="${room.number}">
      <p>Room number: ${room.number}</p>
      <p>Room type: ${room.roomType}</p>
      <p>Bed size: ${room.bedSize}</p>
      <p>Price per night: ${room.costPerNight}</p>
  </card>
      `;
    });
  },

  renderRoomTypes(typeArray) {
    typeArray.forEach(type => {
      typeFilter.innerHTML += `
      <label for="${type}">
      <input type="checkbox" class="type-tag" id="${type}" />
      ${type}
      </label>
      `;
    });
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
  myBookingDisplay,
  makeNewDisplay,
  dateInput,
  typeFilter,
  availRoomsBox,
  bookBtn,
  // goBtn,
  loginForm,
  loginBtn,
  usernameInput,
  passwordInput,
  errorMsgLogin,
  homeView,
  dashboardView,
  video
};

export default domUpdates;
