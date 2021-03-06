/* eslint-disable max-len */

function getAllCustomers() {
  return fetch("http://overlookdata.herokuapp.com/api/v1/customers")
    .then(response => response.json())
    .then(data => data.customers)
    .catch(reason => console.log(reason))
}

function getOneCustomer(id) {
  return fetch(`http://overlookdata.herokuapp.com/api/v1/customers/${id}`).then(response => response.json())
}

function getAllRooms() {
  return fetch("http://overlookdata.herokuapp.com/api/v1/rooms")
    .then(response => response.json())
    .then(data => data.rooms)
}

function getAllBookings() {
  return fetch("http://overlookdata.herokuapp.com/api/v1/bookings")
    .then(response => response.json())
    .then(data => data.bookings)
}

function addBooking(customerId, date, roomNumber) {
  return fetch("http://overlookdata.herokuapp.com/api/v1/bookings", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      userID: customerId,
      date: date,
      roomNumber: roomNumber,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`The following technical issue occured: ${response.status} ${response.status.text}`)
      }
      return response.json()
    })
    .catch(reason => alert(reason))
  // .then(data => console.log(data));
}

function deleteBooking(bookingId) {
  fetch(`http://overlookdata.herokuapp.com/api/v1/bookings/${bookingId}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  }).then(response => console.log(response))
}

export { getAllCustomers, getOneCustomer, getAllRooms, getAllBookings, addBooking, deleteBooking }
