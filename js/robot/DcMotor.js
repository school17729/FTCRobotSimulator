class DcMotor {
    // 435 RPM
    // MAX_ANGULAR_VELOCITY is in radians / sec
    MAX_ANGULAR_VELOCITY = 435 * 2 * Math.PI / 60;
    angularVelocity;
    constructor() {
        this.angularVelocity = 0;
    }
    getDeviceName() {
        return "";
    }
    setPower(angularVelocity) {
        this.angularVelocity = angularVelocity * this.MAX_ANGULAR_VELOCITY;
    }
}
export { DcMotor };
