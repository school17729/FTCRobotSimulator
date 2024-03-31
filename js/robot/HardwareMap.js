class HardwareMap {
    map;
    constructor() {
        this.map = new Map();
    }
    addDevice(name, hardwareDevice) {
        if (!this.map.has(name))
            this.map.set(name, hardwareDevice);
    }
    get(name) {
        const hardwareDevice = this.map.get(name);
        if (hardwareDevice === undefined)
            throw new Error("[HardwareMap]: Could not get HardwareDevice with name " + name);
        return hardwareDevice;
    }
}
export { HardwareMap };
