import BigNumber from "bignumber.js";

type ItemProperties = {
  id: number;
  name: string;
  price: BigNumber;
  weight: number;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
};

export type ItemConstructorParams = {
  id: number;
  name: string;
  price: number;
  weight: number;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
};

export default class Item {
  public properties: ItemProperties;
  constructor(readonly constructorParams: ItemConstructorParams) {
    this.properties = {
      id: constructorParams.id,
      name: constructorParams.name,
      price: new BigNumber(constructorParams.price),
      weight: constructorParams.weight,
      dimensions: constructorParams.dimensions,
    };
  }

  // in kg/m3
  getDensity() {
    return Math.round(this.properties.weight / this.getVolume());
  }

  // in m3
  getVolume() {
    const depthInMeters = this.properties.dimensions.depth / 100;
    const heightInMeters = this.properties.dimensions.height / 100;
    const widthInMeters = this.properties.dimensions.width / 100;
    return depthInMeters * heightInMeters * widthInMeters;
  }

  isValid() {
    if (this.properties.weight < 0) {
      return false;
    }

    if (
      this.properties.dimensions.depth <= 0 ||
      this.properties.dimensions.height <= 0 ||
      this.properties.dimensions.width <= 0
    ) {
      return false;
    }

    return true;
  }
}
