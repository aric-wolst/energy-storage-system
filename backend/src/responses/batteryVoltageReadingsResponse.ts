import { ObjectId } from "mongodb";
import { IBatteryVoltageReadingAttributes } from "../models/batteryVoltageReadings.model";

/**
 * Battery voltage readings response
 */
export interface IBatteryVoltageReadingsResponse {
  batteryId: ObjectId;
  batteryVoltageReadings: IBatteryVoltageReadingResponse[];
}

export class BatteryVoltageReadingsResponse implements IBatteryVoltageReadingsResponse {
  public batteryId: ObjectId;
  public batteryVoltageReadings: IBatteryVoltageReadingResponse[];

  constructor(
    batteryId: ObjectId,
    batteryVoltageReadings: IBatteryVoltageReadingAttributes[],
  ) {
    this.batteryId = batteryId;
    this.batteryVoltageReadings = batteryVoltageReadings.map(
      reading => new BatteryVoltageReadingResponse(reading),
    );
  }
}

/**
 * Single battery voltage reading response
 */
export interface IBatteryVoltageReadingResponse {
  id: ObjectId;
  voltage: number;
  timestamp: Date;
}

export class BatteryVoltageReadingResponse implements IBatteryVoltageReadingResponse {
  public id: ObjectId;
  public voltage: number;
  public timestamp: Date;

  constructor(batteryVoltageReading: IBatteryVoltageReadingAttributes) {
    this.id = batteryVoltageReading.id;
    this.voltage = batteryVoltageReading.voltage;
    this.timestamp = batteryVoltageReading.timestamp;
  }
}