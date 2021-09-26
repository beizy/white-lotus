import { assert } from "chai";

import Rooms from "../src/classes/Rooms";
import { customersData, roomsData, bookingsData } from "./test-data.js";

describe.only("Rooms", () => {
  let rooms;
  let date = "2020/01/24";
  beforeEach(() => {
    rooms = new Rooms(roomsData);
  });

  it("Should show available rooms", () => {
    let availRms = rooms.checkAvailRooms(date, bookingsData);

    assert.deepEqual(availRms, [
      {
        number: 4,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 429.44,
      },
      {
        number: 5,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 340.17,
      },
      {
        number: 6,
        roomType: "junior suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 397.02,
      },
    ]);
  });
});
