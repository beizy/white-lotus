import { assert } from "chai";

import Customer from "../src/classes/Customer";
import { customersData, roomsData, bookingsData } from "./test-data.js";

describe("Customer", () => {
  let customer;
  beforeEach(() => {
    customer = new Customer(customersData[0]);
    customer.lookupBookings(bookingsData);
    // customer.lookupBookedRooms();
    customer.calculateCost(roomsData);
  });

  it("Should have an ID", () => {
    assert.equal(customer.id, 1);
  });

  it("should have a name", () => {
    assert.equal(customer.name, "Leatha Ullrich");
  });

  it("Should be able to see all bookings", () => {
    assert.deepEqual(customer.bookings, [
      {
        id: "5fwrgu4i7k55hl6sz",
        userID: 1,
        date: "2020/04/22",
        roomNumber: 2,
        roomServiceCharges: [],
      },
      {
        id: "5fwrgu4i7k55hl6t9",
        userID: 1,
        date: "2020/02/14",
        roomNumber: 3,
        roomServiceCharges: [],
      },
    ]);
  });

  // it("Should be able to look at all rooms booked", () => {
  //   assert.deepEqual(customer.bookedRoomNumbers, [15, 14]);
  // });

  it("Should be able to see the total cost of all bookings", () => {
    assert.equal(customer.totalCost, 968.52);
  });
});
