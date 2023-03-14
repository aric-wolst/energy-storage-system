import { ObjectId } from "mongodb";
import { IBatteryVoltageReadingInstance } from "./batteryVoltageReadings.model";

/**
 * Battery attributes
 */
export interface IBatteryAttributes {
  id?: ObjectId;
  make: string;
  model: string;
}

/**
 * Battery collection instance
 */
export interface IBatteryInstance extends IBatteryAttributes {
  voltageReadings?: IBatteryVoltageReadingInstance;
}
