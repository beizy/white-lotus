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
const { pastBookingTab, futureBookingTab, newBookingTab, totalCost, dbDisplay } = domUpdates;

//classes
import Customer from "./classes/Customer";

// EVENT LISTENERS
window.addEventListener("load", getData);
pastBookingTab.addEventListener("click", loadPastBooking);
futureBookingTab.addEventListener("click", loadFutureBooking);
newBookingTab.addEventListener("click", loadNewBooking);

// GLOBAL VARIABLES
let allCustomers;
let allRooms;
let allBookings;

function getData() {
  //   console.log("get data fires");
  Promise.all([getAllCustomers(), getAllRooms(), getAllBookings()]).then(promises => instantiation(promises));
}

async function instantiation(promises) {
  allCustomers = await promises[0];
  allRooms = await promises[1];
  allBookings = await promises[2];
  //   console.log(allCustomers);
  //   console.log(allRooms);
  //   console.log(allBookings);
}

function loadPastBooking() {
  console.log("load past booking fn fires");
  console.log(allBookings);
}

function loadFutureBooking() {
  console.log("load future booking fires");
}

function loadNewBooking() {
  console.log("load new booking fires");
}
