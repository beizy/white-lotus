// import { bookingsData } from "../../test/test-data";

class Rooms {
  constructor(roomData) {
    this.rooms = roomData;
  }

  checkAvailRooms(date, bookingData) {
    // date must be the same format as in bookings, "2020/05/26"
    let bookedRmNums = bookingData.filter(booking => booking.date === date).map(ele => ele.roomNumber);
    let result = this.rooms.filter(room => !bookedRmNums.includes(room.number));
    return result; // returns array of room obj
  }

  generateRoomTypes(roomData) {
    let result = [];
    roomData.forEach(room => {
      if (!result.includes(room.roomType)) {
        result.push(room.roomType);
      }
    });

    return result; //returns array of room type strings
  }

  filterByType(roomType, roomData) {
    let result = roomData.filter(room => room.roomType === roomType);
    return result;
  }
}

export default Rooms;
