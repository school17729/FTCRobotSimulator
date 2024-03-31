import { Entity } from "../scene/Entity.js";
import { DcMotor } from "./DcMotor.js";
import { Position } from "../generic/Position.js";
class Robot extends Entity {
    width;
    height;
    leftBackMotor;
    leftFrontMotor;
    rightBackMotor;
    rightFrontMotor;
    WHEEL_RADIUS = 2;
    WHEEL_X_DISTANCE = 18;
    WHEEL_Y_DISTANCE = 16;
    xVelocity;
    yVelocity;
    headingVelocity;
    constructor() {
        super(new Position(0, 0), 0);
        this.width = 18;
        this.height = 18;
        this.leftBackMotor = new DcMotor();
        this.leftFrontMotor = new DcMotor();
        this.rightBackMotor = new DcMotor();
        this.rightFrontMotor = new DcMotor();
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.headingVelocity = 0;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getLeftBackMotor() {
        return this.leftBackMotor;
    }
    getLeftFrontMotor() {
        return this.leftFrontMotor;
    }
    getRightBackMotor() {
        return this.rightBackMotor;
    }
    getRightFrontMotor() {
        return this.rightFrontMotor;
    }
    fillHardwareMap(hardwareMap) {
        hardwareMap.addDevice("LF", this.leftFrontMotor);
        hardwareMap.addDevice("LB", this.leftBackMotor);
        hardwareMap.addDevice("RF", this.rightFrontMotor);
        hardwareMap.addDevice("RB", this.rightBackMotor);
    }
    update() {
        this.xVelocity = this.WHEEL_RADIUS / 4 * (this.leftFrontMotor.angularVelocity +
            this.rightFrontMotor.angularVelocity +
            this.leftBackMotor.angularVelocity +
            this.rightBackMotor.angularVelocity);
        this.yVelocity = this.WHEEL_RADIUS / 4 * (-this.leftFrontMotor.angularVelocity +
            this.rightFrontMotor.angularVelocity +
            this.leftBackMotor.angularVelocity +
            -this.rightBackMotor.angularVelocity);
        this.headingVelocity = this.WHEEL_RADIUS / (4 * (this.WHEEL_X_DISTANCE + this.WHEEL_Y_DISTANCE)) * (-this.leftFrontMotor.angularVelocity +
            this.rightFrontMotor.angularVelocity +
            -this.leftBackMotor.angularVelocity +
            this.rightBackMotor.angularVelocity);
        this.position.x += this.xVelocity / 60;
        this.position.y += this.yVelocity / 60;
        this.rotation += this.headingVelocity / 60;
    }
}
export { Robot };
