import { NormalFareCalculator } from "../src/NormalFareCalculator";
import { OvernightFareCalculator } from "../src/OvernightFareCalculator";
import { OvernightSundayFareCalculator } from "../src/OvernightSundayFareCalculator";
import { Ride } from "../src/Ride";
import { SundayFareCalculator } from "../src/SundayFareCalculator";

describe("Ride", () => {
  let ride: Ride;

  beforeEach(function () {
    const normalFareCalculator = new NormalFareCalculator();
    const sundayFareCalculator = new SundayFareCalculator();
    const overnightSundayFareCalculator = new OvernightSundayFareCalculator();
    const overnightFareCalculator = new OvernightFareCalculator();

    ride = new Ride([
      overnightFareCalculator,
      overnightSundayFareCalculator,
      sundayFareCalculator,
      normalFareCalculator,
    ]);
  });

  test("Deve calcular o valor da corrida em horário normal", function () {
    ride.addSegment(10, new Date("2021-03-01T10:00:00"));
    const fare = ride.finish();
    expect(fare).toBe(21);
  });

  test("Deve calcular o valor da corrida em horário noturno", function () {
    ride.addSegment(10, new Date("2021-03-01T23:00:00"));
    const fare = ride.finish();
    expect(fare).toBe(39);
  });

  test("Deve calcular o valor da corrida em horário no domingo", function () {
    ride.addSegment(10, new Date("2022-06-26T10:00:00"));
    const fare = ride.finish();
    expect(fare).toBe(29);
  });

  test("Deve calcular o valor da corrida em horário no domingo noturno", function () {
    ride.addSegment(10, new Date("2021-03-07T23:00:00"));
    const fare = ride.finish();
    expect(fare).toBe(50);
  });

  test("Deve calcular o valor da corrida mínima", function () {
    ride.addSegment(3, new Date("2021-03-01T10:00:00"));
    const fare = ride.finish();
    expect(fare).toBe(10);
  });

  test("Deve retornar -1 se a distância for inválida", function () {
    expect(() => ride.addSegment(-3, new Date("2021-03-01T10:00:00"))).toThrow(new Error("invalid distance"));
  });

  test("Deve retornar -2 se a data for inválida", function () {
    expect(() => ride.addSegment(10, new Date("abcdef"))).toThrow(new Error("invalid date"));
  });

  test("Deve calcular o valor da corrida em múltiplos horários", function () {
    ride.addSegment(10, new Date("2021-03-01T21:00:00"));
    ride.addSegment(10, new Date("2021-03-01T22:00:00"));
    const fare = ride.finish();
    expect(fare).toBe(60);
  });
});
