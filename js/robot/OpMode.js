class OpMode {
    hardwareMap;
    telemetry;
    constructor(hardwareMap, telemetry) {
        this.hardwareMap = hardwareMap;
        this.telemetry = telemetry;
    }
}
export { OpMode };
