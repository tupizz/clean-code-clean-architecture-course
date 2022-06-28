import { FareCalculator } from "./FareCalculator";
import { Segment } from "./Segment";

export class SundayFareCalculator implements FareCalculator {
  FARE = 2.9;

  calculate(segment: Segment): number {
    if (segment.isSunday() && !segment.isOvernight()) {
      return segment.distance * this.FARE;
    }
    return 0;
  }
}
