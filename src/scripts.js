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
const { myBookingTab, newBookingTab, totalCost, dbDisplay } = domUpdates;

//classes
import Customer from "./classes/Customer";

// EVENT LISTENERS
window.addEventListener("load", getData);
myBookingTab.addEventListener("click", loadBookings);
newBookingTab.addEventListener("click", loadNewBooking);

// GLOBAL VARIABLES
let allCustomers;
let allRooms;
let allBookings;
let randomCustomer;

function getData() {
  //   console.log("get data fires");
  Promise.all([getAllCustomers(), getAllRooms(), getAllBookings(), getOneCustomer(1)]).then(promises =>
    instantiation(promises)
  );
}

function instantiation(promises) {
  allCustomers = promises[0];
  allRooms = promises[1];
  allBookings = promises[2];
  randomCustomer = new Customer(promises[3]);
  //   console.log("all customers", allCustomers);

  //   console.log("randome customer", randomCustomer);
}

function loadBookings() {
  let bookings = randomCustomer.lookupBookings(allBookings);
  let cost = randomCustomer.calculateCost(allRooms);
  domUpdates.renderBookings(bookings);
  domUpdates.renderTotalCost(cost);
}

function loadNewBooking() {}
