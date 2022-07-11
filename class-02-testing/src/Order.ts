import BigNumber from "bignumber.js";
import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

type OrderProperties = {
  cpf: Cpf;
  orderItems: OrderItem[];
  coupon?: Coupon;
};

type OrderConstructorParams = {
  cpf: string;
};

export default class Order {
  private properties: OrderProperties;
  private DISTANCE: number = 1000;

  constructor(constructorParams: OrderConstructorParams) {
    this.properties = {
      cpf: new Cpf(constructorParams.cpf),
      orderItems: [],
    };
  }

  private isItemAlreadyAdded(item: Item) {
    return this.properties.orderItems.find(
      (i) => i.properties.item.properties.id === item.properties.id
    );
  }

  addItem(item: Item, quantity: number) {
    if (quantity <= 0) {
      throw new Error("Invalid Quantity");
    }

    if (this.isItemAlreadyAdded(item)) {
      throw new Error("Should not add same item");
    }

    if (!item.isValid()) {
      throw new Error("Invalid item properties");
    }

    this.properties.orderItems.push(
      new OrderItem({
        item,
        quantity,
      })
    );
  }

  addCoupon(coupon: Coupon) {
    this.properties.coupon = coupon;
  }

  getShippingPrice() {
    const totalVolume = this.properties.orderItems.reduce((acc, orderItem) => {
      return acc + orderItem.getVolume();
    }, 0);

    const totalDensity = this.properties.orderItems.reduce((acc, orderItem) => {
      return acc + orderItem.getDensity();
    }, 0);

    const shippingPrice = this.DISTANCE * totalVolume * (totalDensity / 100);
    return shippingPrice > 10 ? shippingPrice : 10;
  }

  getTotal(): number {
    let total = this.properties.orderItems.reduce((acc, orderItem) => {
      return orderItem.getTotal().plus(acc);
    }, new BigNumber(0));

    if (this.properties.coupon && this.properties.coupon.isValid()) {
      total = total.minus(
        total.times(this.properties.coupon.properties.percentage / 100)
      );
    }

    total = total.plus(this.getShippingPrice());
    return +total.toFixed(2);
  }
}
