import { HardwareDevice } from "./HardwareDevice.js";

class HardwareMap {
    map: Map<string, HardwareDevice>

    constructor() {
        this.map = new Map<string, HardwareDevice>();
    }

    addDevice(name: string, hardwareDevice: HardwareDevice): void {
        if (!this.map.has(name))
            this.map.set(name, hardwareDevice);
    }

    get(name: string): HardwareDevice {
        const hardwareDevice: HardwareDevice | undefined = this.map.get(name);
        if (hardwareDevice === undefined)
            throw new Error("[HardwareMap]: Could not get HardwareDevice with name " + name);

        return hardwareDevice;
    }
}

export { HardwareMap };
