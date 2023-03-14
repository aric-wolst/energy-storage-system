import BatteryVoltageGraph from "../components/BatteryVoltageGraph";
import { IBattery } from "../models/battery";

/**
 * Battery Component
 */
const Battery = ({
    batteryId,
}: IBattery) => {
    return (
        <div>
            <BatteryVoltageGraph batteryId={batteryId}/>
        </div>
    );
};

export default Battery;