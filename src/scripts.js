// styles
import "./css/base.scss"

// media
import "./images/sunset.mp4"
// import "./images/lotusbg.png";
import "./images/monkeybg.png"

// api calls
import { getAllCustomers, getOneCustomer, getAllRooms, getAllBookings, addBooking, deleteBooking } from "./apiCalls"

// dom updates
import domUpdates from "./domUpdates"
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
  loginForm,
  greeting,
  loginBtn,
  usernameInput,
  passwordInput,
  errorMsgLogin,
  homeView,
  dashboardView,
  video,
  logout,
} = domUpdates

// classes
import Customer from "./classes/Customer"
import Rooms from "./classes/Rooms"

// library
import datepicker from "js-datepicker"

// event listeners
window.addEventListener("load", getData)
myBookingTab.addEventListener("click", loadBookings)
newBookingTab.addEventListener("click", loadNewBooking)
dateInput.addEventListener("focus", showDatepicker)
typeFilter.addEventListener("click", showFilteredRooms)
availRoomsBox.addEventListener("click", selectRoom)
bookBtn.addEventListener("click", bookRoom)
loginBtn.addEventListener("click", function () {
  event.preventDefault()
  validateLogin()
})
logout.addEventListener("click", logOutFn)

// global variables
let allCustomers
let allRooms
let allBookings
let usernameData
let currentCustomer
let availRooms
let chosenRoom

function getData() {
  Promise.all([getAllCustomers(), getAllRooms(), getAllBookings()])
    .then(promises => instantiation(promises))
    .catch(reason => {
      alert("Oops, Server is taking a break")
    })
}

function instantiation(promises) {
  allCustomers = promises[0]
  allRooms = new Rooms(promises[1])
  allBookings = promises[2]
  usernameData = allCustomers.map(customer => "customer" + customer.id)
}

function loadBookings() {
  domUpdates.hide(makeNewDisplay)
  domUpdates.show(myBookingDisplay)
  domUpdates.show(totalCost)
  let bookings = currentCustomer.lookupBookings(allBookings)
  let cost = currentCustomer.calculateCost(allRooms.rooms)
  domUpdates.renderBookings(bookings)
  domUpdates.renderTotalCost(cost)
}

function loadNewBooking() {
  domUpdates.hide(myBookingDisplay)
  domUpdates.hide(totalCost)
  domUpdates.show(makeNewDisplay)
}

function showDatepicker(event) {
  event.preventDefault()
  const picker = datepicker(event.target, {
    formatter: (input, date, instance) => {
      let convertedDate = convertDate(date)
      input.value = convertedDate
    },
    onSelect: (instance, date) => {
      let convertedDate = convertDate(date)
      showAvailRooms(convertedDate)
    },
  })
}

function convertDate(dateInput) {
  let output1 = dateInput.toISOString()
  let output2 = output1.slice(0, 10)
  let result = output2.split("-").join("/")
  return result
}

function showAvailRooms(date) {
  availRooms = allRooms.checkAvailRooms(date, allBookings)
  if (!availRooms.length) {
    alert("We apologize fiercely for no available rooms at your selected date! Please choose another date.")
  }
  domUpdates.renderRooms(availRooms)
  let availRmTypes = allRooms.generateRoomTypes(availRooms)
  domUpdates.renderRoomTypes(availRmTypes)
}

function showFilteredRooms() {
  let selectedTags = []
  let checkboxes = document.querySelectorAll("input[type=checkbox]:checked")
  checkboxes.forEach(box => {
    selectedTags.push(box.id)
  })
  if (!selectedTags.length) {
    domUpdates.renderRooms(availRooms)
  } else {
    let filteredRooms = selectedTags.map(tag => allRooms.filterByType(tag, availRooms)).flat()
    domUpdates.renderRooms(filteredRooms)
  }
}

function selectRoom(event) {
  if (event.target.tagName === "P") {
    let clickedCardId = parseInt(event.target.parentNode.id)

    chosenRoom = allRooms.rooms.find(room => room.number === clickedCardId)
    event.target.parentNode.style.background = "pink"
  } else if (event.target.tag === "CARD") {
    let clickedCardId = parseInt(event.target.id)
    chosenRoom = allRooms.rooms.find(room => room.number === clickedCardId)
    event.target.style.background = "pink"
  }
}

function bookRoom() {
  let customerId = currentCustomer.id
  let date = dateInput.value
  let roomNum = chosenRoom.number

  addBooking(customerId, date, roomNum)
    .then(() => getAllBookings())
    .then(response => (allBookings = response))
    .then(() => {
      alert("Booking successful! Check your bookings by clicking 'My bookings' tab.")
    })
}

function validateLogin() {
  let uValue = usernameInput.value
  let pValue = passwordInput.value
  if (!usernameData.includes(uValue) || !pValue === "overlook2021") {
    domUpdates.show(errorMsgLogin)
    setTimeout(() => {
      domUpdates.hide(errorMsgLogin)
    }, 3000)
  } else {
    let customerId = parseInt(uValue.slice(8))
    getOneCustomer(customerId)
      .then(response => (currentCustomer = new Customer(response)))
      .then(() => showDashboard())
  }
}

function showDashboard() {
  domUpdates.hide(homeView)
  domUpdates.hide(video)
  domUpdates.show(dashboardView)
  domUpdates.greet(currentCustomer)
}

function logOutFn() {
  domUpdates.hide(dashboardView)
  domUpdates.show(homeView)
  domUpdates.show(video)
}
