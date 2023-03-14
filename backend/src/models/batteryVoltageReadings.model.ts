import { ObjectId } from "mongodb";
import { IBatteryInstance } from "./battery.model";

/**
 * Metadata of a battery voltage reading
 */
export interface IBatteryVoltageReadingMetaDataAttributes {
  batteryId: ObjectId;
}

/**
 * Battery voltage reading attributes
 */
export interface IBatteryVoltageReadingAttributes {
  id?: ObjectId;
  timestamp: Date;
  voltage: number;
  metadata: IBatteryVoltageReadingMetaDataAttributes;
}

/**
 * Battery voltage reading instance
 */
export interface IBatteryVoltageReadingInstance extends IBatteryVoltageReadingAttributes{
  battery?: IBatteryInstance;
}