// import { bookingsData } from "../../test/test-data";

class Rooms {
  constructor(roomData) {
    this.rooms = roomData;
  }

  checkAvailRooms(date, bookingData) {
    let bookedRmNums = bookingData.filter(booking => booking.date === date).map(ele => ele.roomNumber);
    let result = this.rooms.filter(room => !bookedRmNums.includes(room.number));
    return result;
  }
}

export default Rooms;
