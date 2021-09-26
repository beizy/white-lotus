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

// global variables
let allCustomers;
let allRooms;
let allBookings;
let randomCustomer;
let availRooms;

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
  randomCustomer = new Customer(promises[3]);
}

function loadBookings() {
  let bookings = randomCustomer.lookupBookings(allBookings);
  let cost = randomCustomer.calculateCost(allRooms);
  domUpdates.renderBookings(bookings);
  domUpdates.renderTotalCost(cost);
}

function loadNewBooking() {
  // console.log("load new booking fires");
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
  console.log("show avail room fires");
  availRooms = allRooms.checkAvailRooms(date, allBookings);
  domUpdates.renderRooms(availRooms);
  let availRmTypes = allRooms.generateRoomTypes(availRooms);
  domUpdates.renderRoomTypes(availRmTypes);
}

function showFilteredRooms(event) {
  console.log(event.target);
  let filteredRooms = allRooms.filterByType(event.target.id, availRooms);
  domUpdates.renderRooms(filteredRooms);
}
