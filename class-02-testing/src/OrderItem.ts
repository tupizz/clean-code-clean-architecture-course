import BigNumber from "bignumber.js";
import Item from "./Item";

type OrderItemProperties = {
  quantity: number;
  item: Item;
};

export default class OrderItem {
  constructor(readonly properties: OrderItemProperties) {}

  getTotal(): BigNumber {
    return this.properties.item.properties.price.times(
      this.properties.quantity
    );
  }

  getVolume(): number {
    return this.properties.item.getVolume() * this.properties.quantity;
  }

  getDensity(): number {
    return this.properties.item.getDensity() * this.properties.quantity;
  }
}
