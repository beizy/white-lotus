/* eslint-disable max-len */

function getAllCustomers() {
  return fetch("http://localhost:3001/api/v1/customers")
    .then(response => response.json())
    .then(data => data);
}

function getOneCustomer(id) {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`).then(response => response.json());
}

function getAllRooms() {
  return fetch("http://localhost:3001/api/v1/rooms").then(response => response.json());
}

function getAllBookings() {
  return fetch("http://localhost:3001/api/v1/bookings").then(response => response.json());
}

function addBooking(customerId, date, roomNumber) {
  fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      userID: customerId,
      date: `${date}`,
      roomNumber: roomNumber,
    }),
  }).then(response => console.log(response));
}

function deleteBooking(bookingId) {
  fetch(`http://localhost:3001/api/v1/bookings/${bookingId}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  }).then(response => console.log(response));
}

export { getAllCustomers, getOneCustomer, getAllRooms, getAllBookings, addBooking, deleteBooking };
