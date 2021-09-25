import { bookingsData, roomsData } from "../../test/test-data";

class Customer {
  constructor(customerInstance) {
    this.id = customerInstance.id;
    this.name = customerInstance.name;
    this.bookings = []; //array of booking object
    this.bookedRoomNumbers = []; // array of booked room numbers
    this.totalCost = 0;
  }

  lookupBookings() {
    let result = bookingsData.filter(booking => booking.userID == this.id);
    this.bookings = result;
    return result;
  }

  lookupBookedRooms() {
    let result = this.bookings.map(booking => booking.roomNumber);
    this.bookedRoomNumbers = result;
    return result;
  }

  calculateCost() {
    let result = this.bookedRoomNumbers.reduce(
      (acc, number) => (acc += roomsData.find(ele => ele.number === number).costPerNight),
      0
    );
    this.totalCost = result;
    return result;
  }
}

export default Customer;
