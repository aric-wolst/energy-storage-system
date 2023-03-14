import { useCallback, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import BatteryService from "../api/battery";
import { IBatteryVoltageReadings } from "../models/batteryVoltageReadings";
import { IBatteryVoltageGraph } from "../models/batteryVoltageGraph";
import Select from "react-dropdown-select";
import Refresh from "../icons/refresh.svg";

/**
 * Battery Voltage Graph Component
 */
const BatteryVoltageGraph = ({
    batteryId,
}: IBatteryVoltageGraph) => {
    /**
     * The battery's voltage readings
     */
    const [batteryVoltageReadings, setBatteryVoltageReadings] = useState<IBatteryVoltageReadings[]>([]);

    /**
     * The time range filter
     */
    const [dateFilter, setDateFilter] = useState<string>("12h");

    /**
     * Fetch voltage readings for the battery
     */
    const fetchBatteryVoltageReadings = useCallback(async (): Promise<void> => {
        const startDate = new Date();

        if (dateFilter === "12h") {
            startDate.setHours(startDate.getHours() - 12);
        } else if (dateFilter === "6h") {
            startDate.setHours(startDate.getHours() - 6);
        } else if (dateFilter === "1h") {
            startDate.setHours(startDate.getHours() - 1);
        } else if (dateFilter === "15m") {
            startDate.setMinutes(startDate.getMinutes() - 15);
        } else if (dateFilter === "1m") {
            startDate.setMinutes(startDate.getMinutes() - 1);
        }

        const res = await BatteryService.getBatteryVoltageReadings(batteryId, startDate);

        if (res.status === 200) {
            const voltageReadings: IBatteryVoltageReadings[] = res.data?.data?.batteryVoltageReadings || [];
            setBatteryVoltageReadings(voltageReadings);
        }
    }, [batteryId, dateFilter]);

    /**
     * On page render, filter update or batteryId update, fetch battery voltage readings
     */
    useEffect(() => {    
        fetchBatteryVoltageReadings();
    }, [dateFilter, batteryId, fetchBatteryVoltageReadings]);

    /**
     * Upload voltage readings for the battery
     */
    const uploadBatteryVoltageReadings = (async(): Promise<void> => {
        await BatteryService.uploadBatteryVoltageReadings(batteryId);

        await fetchBatteryVoltageReadings();
    });

    /**
     * Date filter options
     */
    const dateFilterOptions = [
        {
            value: "12h",
            label: "12h"
        },
        {
            value: "6h",
            label: "6h"
        },
        {
            value: "1h",
            label: "1h"
        },
        {
            value: "15m",
            label: "15m"
        },
        {
            value: "1m",
            label: "1m"
        },
    ]

    /**
     * Chart setup
     */
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    /**
     * Chart options
     */
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
            display: true,
            text: "Battery Voltage Readings",
            },
        },
    };

    /**
     * Chart data
     */
    const chartData = {
        labels: batteryVoltageReadings.map((voltageReading) => voltageReading.timestamp.toString()),
        datasets: [
          {
            label: `Battery ID: ${batteryId}`,
            data: batteryVoltageReadings.map((voltageReading) => voltageReading.voltage),
            borderColor: "#001b2e",
            backgroundColor: "#001b2e",
          },
        ],
    };

    return (
        <div>
            <br/>

            <div className="container">
                <div className="row">
                    <label className="label">Time Range</label>
                </div>
                <div className="row">

                    {/* Time Range Selector */}
                    <div className="col-3">
                        <Select
                            options={dateFilterOptions}
                            onChange={(filter) => setDateFilter(filter[0].value)}
                            values={[dateFilterOptions[0]]} 
                            multi={false}
                            color={"#001b2e"}
                            style={{"fontFamily": "Arial, sans-serif"}}/>
                    </div>

                    {/* Refresh */}
                    <div className="col-1">
                        <button className="icon-button" onClick={fetchBatteryVoltageReadings}>
                            <img src={Refresh} alt="refresh"/>
                        </button>
                    </div>
                </div>
            </div>

            <br/>

            {/* Graph */}
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Line options={chartOptions} data={chartData}/>
                    </div>
                </div>
            </div>

            <br/>

            {/* Upload Battery Voltage */}
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <button className="text-button" onClick={uploadBatteryVoltageReadings}>
                            Upload Battery Voltage
                        </button>
                    </div>
                </div>
            </div>

            <br/>
        </div>
    );
};

export default BatteryVoltageGraph;