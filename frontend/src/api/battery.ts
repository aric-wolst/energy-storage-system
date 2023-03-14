import axios, { AxiosResponse } from 'axios';
import { IBatteryVoltageReadings } from '../models/batteryVoltageReadings';

const API_URL = 'http://localhost:8081/api/v1/';

class BatteryAPI {
    /**
     * Upload batteey voltage readings
     * 
     * @param batteryId ID of the battery
     * @returns Upload status
     */
    async uploadBatteryVoltageReadings(batteryId: string): Promise<void> {
        const currentDate: Date = new Date();
        let timestamp: Date = new Date();
        timestamp.setDate(currentDate.getDate() - 1); // Decrement by 1 day

        let voltage: number = 0;

        let incrementVoltage = true;

        let voltageReadings: IBatteryVoltageReadings[] = [];

        while (timestamp < currentDate) {
            voltageReadings.push({
                voltage,
                timestamp,
            });

            const currentTime = timestamp.getTime();
            timestamp = new Date(currentTime + 10000); // increment by 10s

            if (incrementVoltage) {
                voltage += 0.01;

                if (voltage > 5) {
                    // const data = {
                    //     batteryVoltageReadings: voltageReadings,
                    // }
            
                    // await axios.post(API_URL + `batteries/${batteryId}/voltage_readings`,
                    //     data,
                    // );

                    // voltageReadings = [];

                    voltage = 4.99
                    incrementVoltage = false;
                }
            } else {
                voltage -= 0.01;

                if (voltage < 0) {
                    // const data = {
                    //     batteryVoltageReadings: voltageReadings,
                    // }
            
                    // await axios.post(API_URL + `batteries/${batteryId}/voltage_readings`,
                    //     data,
                    // );

                    // voltageReadings = [];

                    voltage = 0.01
                    incrementVoltage = true;
                }
            }
        }

        const data = {
            batteryVoltageReadings: voltageReadings,
        }

        await axios.post(API_URL + `batteries/${batteryId}/voltage_readings`,
            data,
        );
        
        return;
    }

    /**
     * Get a list of battery voltage readings
     * 
     * @param batteryId ID of the battery
     * @param startDate Start date filter
     * @returns List of battery voltage readings
     */
    async getBatteryVoltageReadings(batteryId: string, startDate: Date): Promise<AxiosResponse<any, any>> {
        const res = await axios
            .get(API_URL + `batteries/${batteryId}/voltage_readings?startDate=${startDate}`);
        
        return res;
    }
}

const BatteryService = new BatteryAPI();

export default BatteryService;