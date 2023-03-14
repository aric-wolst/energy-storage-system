/**
 * Request containing battery voltage readings to be uploaded
 */
export interface IBatteryVoltageReadingsUploadRequest {
  batteryVoltageReadings: IBatteryVoltageReadingUpload[];
}

export class BatteryVoltageReadingsUploadRequest implements IBatteryVoltageReadingsUploadRequest {
  public batteryVoltageReadings: IBatteryVoltageReadingUpload[];

  constructor(request: IBatteryVoltageReadingsUploadRequest) {
    this.batteryVoltageReadings = request.batteryVoltageReadings.map(
      (batteryVoltageReading) => new BatteryVoltageReadingUpload(batteryVoltageReading),
    );
  }
}

/**
 * Single battery voltage reading to be uploaded 
 */
export interface IBatteryVoltageReadingUpload {
  voltage: number;
  timestamp: Date;
}

export class BatteryVoltageReadingUpload implements IBatteryVoltageReadingUpload {
  public voltage: number;
  public timestamp: Date;

  constructor(request: IBatteryVoltageReadingUpload) {
    this.voltage = request.voltage;
    this.timestamp = new Date(request.timestamp);
  }
}