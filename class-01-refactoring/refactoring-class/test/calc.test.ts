import { calculateRide } from "../src/calc";

test("deve calcular o valor da corrida normal", () => {
  const fare = calculateRide([
    {
      distance: 10,
      date: new Date("2022-06-27T21:34:53Z"),
    },
  ]);

  expect(fare).toBe(21);
});

test("deve calcular o valor da corrida em horário noturno", () => {
  const fare = calculateRide([
    {
      distance: 10,
      date: new Date("2022-06-29T02:34:53"),
    },
  ]);

  expect(fare).toBe(39);
});

test("deve calcular o valor da corrida em horário noturno no domingo", () => {
  const fare = calculateRide([
    {
      distance: 10,
      date: new Date("2022-06-19T02:34:53"),
    },
  ]);

  expect(fare).toBe(50);
});

test("deve calcular o valor da corrida com tarefa mínima", () => {
  const fare = calculateRide([
    {
      distance: 3,
      date: new Date("2022-03-01T10:00:00"),
    },
  ]);

  expect(fare).toBe(10);
});

test("deve validar se a distancia é válida", () => {
  expect(() => {
    calculateRide([
      {
        distance: -10,
        date: new Date("dsfdsfsa"),
      },
    ]);
  }).toThrow(new Error("invalid distance"));
});

test("deve validar se a data é válida", () => {
  expect(() => {
    calculateRide([
      {
        distance: 10,
        date: new Date("dsfdsfsa"),
      },
    ]);
  }).toThrow(new Error("invalid date"));
});
