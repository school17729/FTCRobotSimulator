import { HardwareDevice } from "./HardwareDevice.js";

class DcMotor implements HardwareDevice {

    // 435 RPM
    // MAX_ANGULAR_VELOCITY is in radians / sec
    private readonly MAX_ANGULAR_VELOCITY = 435 * 2 * Math.PI / 60;
    public angularVelocity: number;

    constructor() {
        this.angularVelocity = 0;
    }

    public getDeviceName(): string {
        return "";
    }

    public setPower(angularVelocity: number): void {
        this.angularVelocity = angularVelocity * this.MAX_ANGULAR_VELOCITY;
    }
}

export { DcMotor };
