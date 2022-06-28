const OVERNIGHT_FARE = 3.9;
const OVERNIGHT_SUNDAY_FARE = 5;
const SUNDAY_FARE = 2.9;
const NORMAL_FARE = 2.1;
const OVERNIGHT_START = 22;
const OVERNIGHT_END = 6;
const MIN_FARE = 10;

function isOvernight(segment: any) {
  return segment.date.getHours() >= OVERNIGHT_START || segment.date.getHours() <= OVERNIGHT_END;
}

function isSunday(date: Date) {
  return date.getDay() === 0;
}

function isInvalidDistance(distance: any) {
  return distance == null || distance == undefined || typeof distance !== "number" || distance < 0;
}

function isInvalidDate(date: any) {
  return date == null || date == undefined || !(date instanceof Date) || date.toString() === "Invalid Date";
}

export function calculateRide(segments: any[]) {
  let fare = 0;
  for (const segment of segments) {
    if (isInvalidDistance(segment.distance)) throw new Error("invalid distance");
    if (isInvalidDate(segment.date)) throw new Error("invalid date");

    if (isOvernight(segment) && !isSunday(segment.date)) {
      fare += segment.distance * OVERNIGHT_FARE;
      continue;
    }

    if (isOvernight(segment) && isSunday(segment.date)) {
      fare += segment.distance * OVERNIGHT_SUNDAY_FARE;
      continue;
    }

    if (isSunday(segment.date)) {
      fare += segment.distance * SUNDAY_FARE;
      continue;
    }

    fare += segment.distance * NORMAL_FARE;
  }

  return fare < MIN_FARE ? MIN_FARE : fare;
}
