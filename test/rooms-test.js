import { assert } from "chai";

import Rooms from "../src/classes/Rooms";
import { customersData, roomsData, bookingsData } from "./test-data.js";

describe("Rooms", () => {
  let rooms;
  let date = "2020/01/24";
  let availRms;
  beforeEach(() => {
    rooms = new Rooms(roomsData);
    availRms = rooms.checkAvailRooms(date, bookingsData);
  });

  it("Should show available rooms on a date", () => {
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

  it("Should filter available rooms by room type", () => {
    let result = rooms.filterByType("junior suite", availRms);
    assert.deepEqual(result, [
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

  it("Should be able to return all room types", () => {
    let result = rooms.generateRoomTypes(availRms);
    assert.deepEqual(result, ["single room", "junior suite"]);
  });
});
