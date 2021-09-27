// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// styles
import "./css/base.scss";

// images
import "./images/turing-logo.png";

// api calls
import { getAllCustomers, getOneCustomer, getAllRooms, getAllBookings, addBooking, deleteBooking } from "./apiCalls";

// dom updates
import domUpdates from "./domUpdates";
const {
  myBookingTab,
  newBookingTab,
  totalCost,
  myBookingDisplay,
  makeNewDisplay,
  dateInput,
  typeFilter,
  availRoomsBox,
  bookBtn,
} = domUpdates;

// classes
import Customer from "./classes/Customer";
import Rooms from "./classes/Rooms";

// library
import datepicker from "js-datepicker";

// event listeners
window.addEventListener("load", getData);
myBookingTab.addEventListener("click", loadBookings);
newBookingTab.addEventListener("click", loadNewBooking);
dateInput.addEventListener("focus", showDatepicker);
typeFilter.addEventListener("click", showFilteredRooms);
availRoomsBox.addEventListener("click", selectRoom);
bookBtn.addEventListener("click", bookRoom);

// global variables
let allCustomers;
let allRooms;
let allBookings;
let currentCustomer;
let availRooms;
let chosenRoom;

function getData() {
  //   console.log("get data fires");
  Promise.all([getAllCustomers(), getAllRooms(), getAllBookings(), getOneCustomer(1)]).then(promises =>
    instantiation(promises)
  );
}

function instantiation(promises) {
  allCustomers = promises[0];
  allRooms = new Rooms(promises[1]);
  allBookings = promises[2];
  currentCustomer = new Customer(promises[3]);
}

function loadBookings() {
  domUpdates.show(myBookingDisplay);
  domUpdates.show(totalCost);
  domUpdates.hide(makeNewDisplay);
  let bookings = currentCustomer.lookupBookings(allBookings);
  let cost = currentCustomer.calculateCost(allRooms.rooms);
  domUpdates.renderBookings(bookings);
  domUpdates.renderTotalCost(cost);
}

function loadNewBooking() {
  domUpdates.hide(myBookingDisplay);
  domUpdates.hide(totalCost);
  domUpdates.show(makeNewDisplay);
}

function showDatepicker(event) {
  event.preventDefault();
  const picker = datepicker(event.target, {
    formatter: (input, date, instance) => {
      let convertedDate = convertDate(date);
      input.value = convertedDate;
    },
    onSelect: (instance, date) => {
      let convertedDate = convertDate(date);
      showAvailRooms(convertedDate);
    },
  });
}

function convertDate(dateInput) {
  let output1 = dateInput.toISOString();
  let output2 = output1.slice(0, 10);
  let result = output2.split("-").join("/");
  return result;
}

function showAvailRooms(date) {
  availRooms = allRooms.checkAvailRooms(date, allBookings);
  if (availRooms.length === 0) {
    alert("We apologize fiercely for no available rooms at your selected date! Please choose another date.");
  }
  domUpdates.renderRooms(availRooms);
  let availRmTypes = allRooms.generateRoomTypes(availRooms);
  domUpdates.renderRoomTypes(availRmTypes);
}

function showFilteredRooms() {
  let selectedTags = [];
  let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  checkboxes.forEach(box => {
    selectedTags.push(box.id);
  });
  if (!selectedTags.length) {
    domUpdates.renderRooms(availRooms);
  } else {
    let filteredRooms = selectedTags.map(tag => allRooms.filterByType(tag, availRooms)).flat();
    domUpdates.renderRooms(filteredRooms);
  }
}

function selectRoom(event) {
  // console.log(event.target);
  if (event.target.tagName === "P") {
    let clickedCardId = parseInt(event.target.parentNode.id);

    chosenRoom = allRooms.rooms.find(room => room.number === clickedCardId);
    event.target.parentNode.style.background = "white";
    // console.log("chosen room", chosenRoom);
  } else if (event.target.tag === "CARD") {
    let clickedCardId = parseInt(event.target.id);
    chosenRoom = allRooms.rooms.find(room => room.number === clickedCardId);
    event.target.style.background = "white";
  }
}

function bookRoom() {
  let customerId = currentCustomer.id;
  let date = dateInput.value;
  let roomNum = chosenRoom.number;
  addBooking(customerId, date, roomNum);
  Promise.all([getAllBookings(), getOneCustomer(1)])
    .then(promises => {
      allBookings = promises[0];
      currentCustomer = new Customer(promises[1]);
    })
    .then(() => {
      alert("Booking successful! Check your bookings by clicking 'My bookings' tab.");
    });
}
