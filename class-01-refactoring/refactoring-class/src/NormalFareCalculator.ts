import { FareCalculator } from "./FareCalculator";
import { Segment } from "./Segment";

export class NormalFareCalculator implements FareCalculator {
  FARE = 2.1;

  calculate(segment: Segment): number {
    if (!segment.isOvernight() && !segment.isSunday()) {
      return segment.distance * this.FARE;
    }

    return 0;
  }
}
