import express, {Request, Response} from "express";
import { ObjectId } from "mongodb";
import { BatteryVoltageReadingsUploadRequest } from "../requests/batteryVoltageReadingsUploadRequest";
import { BatteryVoltageReadingsResponse } from "../responses/batteryVoltageReadingsResponse";
import BatteriesService from "../services/batteries";

const SUCCESS = 200;
const EMPTY_SUCCESS = 201;
const ERROR = 500;

export const batteriesRouter = express.Router();

batteriesRouter.use(express.json());

/**
 * @route GET /api/v1/batteries/:batteryId/voltage_readings
 * 
 * @desc Retreive an array of battery voltage readings
 * 
 * @param batteryId Battery ID
 * @param startDate Start date query filter
 * @param endDate End date query filter
 */
batteriesRouter.get("/:batteryId/voltage_readings", async (req: Request, res: Response) => {
  try {
    const batteryId = new ObjectId(req?.params?.batteryId);

    let startDate: Date = null;
    let endDate: Date = null;

    if (req?.query?.startDate) {
      startDate = new Date(req?.query?.startDate as string);
    }

    if (req?.query?.endDate) {
      endDate = new Date(req?.query?.endDate as string);
    }

    const voltageReadings = await BatteriesService.getVoltageReadings(batteryId, startDate, endDate);

    const voltageReadingsResponse = new BatteryVoltageReadingsResponse(batteryId, voltageReadings);

    res.status(SUCCESS).json({"data": voltageReadingsResponse});
  } catch (error) {
    console.log(error);

    res.status(ERROR).send("Unable to retrieve battery voltage readings.");
  }
});

/**
 * @route POST /api/v1/batteries/:batteryId/voltage_readings
 * 
 * @desc Upload battery voltage readings
 * 
 * @param batteryId Battery ID
 * @param voltageReadingRequest An array of voltages and timestamps
 */
batteriesRouter.post("/:batteryId/voltage_readings", async (req: Request, res: Response) => {
  try {
    const batteryId = new ObjectId(req?.params?.batteryId);
    const voltageReadingRequest = new BatteryVoltageReadingsUploadRequest(req.body);

    await BatteriesService.uploadVoltageReadings(batteryId, voltageReadingRequest);

    res.status(EMPTY_SUCCESS).send("Successfully uploaded battery voltage readings.");
  } catch (error) {
    console.log(error);

    res.status(ERROR).send("Unable to upload battery voltage readings.");
  }
});