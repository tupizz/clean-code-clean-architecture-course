type CouponProperties = {
  code: string;
  percentage: number;
  expiration: Date;
};

export default class Coupon {
  constructor(readonly properties: CouponProperties) {}

  isValid() {
    return this.properties.expiration > new Date();
  }
}
