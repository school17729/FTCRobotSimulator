import { HardwareMap } from "./HardwareMap.js";
import { Telemetry } from "./Telemetry.js";

abstract class OpMode {

    protected hardwareMap: HardwareMap;
    protected telemetry: Telemetry;

    constructor(hardwareMap: HardwareMap, telemetry: Telemetry) {
        this.hardwareMap = hardwareMap;
        this.telemetry = telemetry;
    }

    abstract loop(): void;
}

export { OpMode };
