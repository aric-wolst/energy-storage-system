import { Filter, ObjectId } from "mongodb";
import { Collections } from "../database";
import { IBatteryVoltageReadingAttributes } from "../models/batteryVoltageReadings.model";
import { BatteryVoltageReadingsUploadRequest } from "../requests/batteryVoltageReadingsUploadRequest";

class BatteriesService {
  /**
     * @desc Retreive an array of battery voltage readings
     * 
     * @param batteryId Battery ID
     * @param startDate Start date query filter
     * @param endDate End date query filter
     */
  public async getVoltageReadings(
    batteryId: ObjectId,
    startDate?: Date,
    endDate?: Date,
  ): Promise<IBatteryVoltageReadingAttributes[]> {
    try {
      const filter: Filter<Document> = {
        metadata: {
          batteryId,
        }
      };

      if (startDate && endDate) {
        filter.timestamp = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        }
      } else if (startDate) {
        filter.timestamp = {
          $gte: new Date(startDate),
        }
      } else if (endDate) {
        filter.timestamp = {
          $lte: new Date(endDate),
        }
      }

      const batteryVoltageReadings = await Collections.BatteryVoltageReadings.find(filter)
        .toArray() as unknown as IBatteryVoltageReadingAttributes[];

      return batteryVoltageReadings;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  /**
     * @desc Upload battery voltage readings
     * 
     * @param batteryId Battery ID
     * @param uploadRequest An array of voltages and timestamps
     */
  public async uploadVoltageReadings(
    batteryId: ObjectId,
    uploadRequest: BatteryVoltageReadingsUploadRequest,
  ): Promise<void> {
    try {
      const batteryVoltageReadings: IBatteryVoltageReadingAttributes[] = uploadRequest.batteryVoltageReadings.map(
        (reading) => {
          return {
            timestamp: reading.timestamp,
            voltage: reading.voltage,
            metadata: {
              batteryId,
            }
          };
        });

      await Collections.BatteryVoltageReadings.insertMany(batteryVoltageReadings);

      return;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}

export default new BatteriesService();