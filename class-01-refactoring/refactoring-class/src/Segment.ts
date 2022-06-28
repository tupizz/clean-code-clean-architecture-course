export class Segment {
  OVERNIGHT_START = 22;
  OVERNIGHT_END = 6;

  constructor(readonly distance: number, readonly date: Date) {
    if (this.isInvalidDate()) throw new Error("invalid date");
    if (this.isInvalidDistance()) throw new Error("invalid distance");
  }

  isOvernight() {
    return this.date.getHours() >= this.OVERNIGHT_START || this.date.getHours() <= this.OVERNIGHT_END;
  }

  isSunday() {
    return this.date.getDay() === 0;
  }

  isInvalidDistance() {
    return (
      this.distance == null || this.distance == undefined || typeof this.distance !== "number" || this.distance < 0
    );
  }

  isInvalidDate() {
    return (
      this.date == null ||
      this.date == undefined ||
      !(this.date instanceof Date) ||
      this.date.toString() === "Invalid Date"
    );
  }
}
