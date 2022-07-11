import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";
import {
  cabidePayload,
  ferroDePassarPayload,
  playstationItemPayload,
} from "./data/order-data";

describe("Order", () => {
  test("Deve criar um pedido vazio", () => {
    const order = new Order({
      cpf: "117.230.476-94",
    });

    const total = order.getTotal();
    expect(total).toBe(10);
  });

  test("Deve calcular o frete com os valores de dimensão passados", () => {
    const order = new Order({
      cpf: "117.230.476-94",
    });

    order.addItem(new Item(playstationItemPayload), 1);

    const shippingPrice = order.getShippingPrice();
    expect(shippingPrice).toBe(10);
  });

  test("Deve criar um pedido com 3 items", () => {
    const order = new Order({
      cpf: "117.230.476-94",
    });

    order.addItem(new Item(playstationItemPayload), 1);
    order.addItem(new Item(ferroDePassarPayload), 1);
    order.addItem(new Item(cabidePayload), 3);

    const total = order.getTotal();
    expect(total).toBe(5479.75);
  });

  test("Deve criar um pedido com 3 items e aplicar cupom", () => {
    const order = new Order({
      cpf: "117.230.476-94",
    });

    order.addItem(new Item(playstationItemPayload), 1);
    order.addItem(new Item(ferroDePassarPayload), 1);
    order.addItem(new Item(cabidePayload), 10);

    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 3);

    order.addCoupon(
      new Coupon({
        code: "vale 20",
        percentage: 20,
        expiration: futureDate,
      })
    );

    const total = order.getTotal();
    expect(total).toBe(5678.56);
  });

  test("Deve criar um pedido com 3 items, mas não aplicar cupom quando expiration date é no passado", () => {
    const order = new Order({
      cpf: "117.230.476-94",
    });

    order.addItem(new Item(playstationItemPayload), 1);
    order.addItem(new Item(ferroDePassarPayload), 1);
    order.addItem(new Item(cabidePayload), 1);

    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 3);

    order.addCoupon(
      new Coupon({
        code: "vale 20",
        percentage: 20,
        expiration: pastDate,
      })
    );

    const total = order.getTotal();
    expect(total).toBe(5299.91);
  });

  test("Não deve criar uma order com quantidade de item negativa", () => {
    const order = new Order({
      cpf: "117.230.476-94",
    });

    expect(() => order.addItem(new Item(playstationItemPayload), -1)).toThrow(
      new Error("Invalid Quantity")
    );
  });

  test("Ao fazer um pedido, o mesmo item não pode ser informado mais de uma vez", () => {
    const order = new Order({
      cpf: "117.230.476-94",
    });

    const sameItem = new Item(playstationItemPayload);
    order.addItem(sameItem, 1);

    expect(() => order.addItem(sameItem, 1)).toThrow(
      new Error("Should not add same item")
    );
  });

  test("O peso do item não pode ser negativo", () => {
    const order = new Order({
      cpf: "117.230.476-94",
    });

    const item = new Item({
      ...playstationItemPayload,
      weight: -10,
    });

    expect(() => order.addItem(item, 1)).toThrow(
      new Error("Invalid item properties")
    );
  });

  test("Nenhuma dimensão do item pode ser negativa", () => {
    const order = new Order({
      cpf: "117.230.476-94",
    });

    const item = new Item({
      ...playstationItemPayload,
      dimensions: {
        ...playstationItemPayload.dimensions,
        depth: -10,
      },
    });

    expect(() => order.addItem(item, 1)).toThrow(
      new Error("Invalid item properties")
    );
  });

  test("Não deve criar um pedido com CPF Inválido", () => {
    expect(() => new Order({ cpf: "skdja" })).toThrow(
      new Error("Cpf Inválido")
    );
  });
});
