import { FareCalculator } from "./FareCalculator";
import { Segment } from "./Segment";

export class Ride {
  segments: Segment[];
  MIN_FARE = 10;

  constructor(readonly fareCalculatorArray: FareCalculator[]) {
    this.segments = [];
  }

  addSegment(distance: number, date: Date) {
    this.segments.push(new Segment(distance, date));
  }

  finish() {
    let fare = 0;
    for (const segment of this.segments) {
      fare += this.fareCalculatorArray.reduce((acc, fareCalculator) => acc + fareCalculator.calculate(segment), 0);
    }
    return fare > this.MIN_FARE ? fare : this.MIN_FARE;
  }
}
