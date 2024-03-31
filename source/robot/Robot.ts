import { Entity } from "../scene/Entity.js";
import { DcMotor } from "./DcMotor.js";
import { Position } from "../generic/Position.js";
import { HardwareMap } from "../robot/HardwareMap.js";

class Robot extends Entity {

    private width: number;
    private height: number;

    private leftBackMotor: DcMotor;
    private leftFrontMotor: DcMotor;
    private rightBackMotor: DcMotor;
    private rightFrontMotor: DcMotor;

    private readonly WHEEL_RADIUS: number = 2;
    private readonly WHEEL_X_DISTANCE: number = 18;
    private readonly WHEEL_Y_DISTANCE: number = 16;

    private xVelocity: number;
    private yVelocity: number;
    private headingVelocity: number;

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

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getLeftBackMotor(): DcMotor {
        return this.leftBackMotor;
    }

    public getLeftFrontMotor(): DcMotor {
        return this.leftFrontMotor;
    }

    public getRightBackMotor(): DcMotor {
        return this.rightBackMotor;
    }

    public getRightFrontMotor(): DcMotor {
        return this.rightFrontMotor;
    }

    public fillHardwareMap(hardwareMap: HardwareMap): void {
        hardwareMap.addDevice("LF", this.leftFrontMotor);
        hardwareMap.addDevice("LB", this.leftBackMotor);
        hardwareMap.addDevice("RF", this.rightFrontMotor);
        hardwareMap.addDevice("RB", this.rightBackMotor);
    }

    public update(): void {

        this.xVelocity = this.WHEEL_RADIUS / 4 * (
            this.leftFrontMotor.angularVelocity +
            this.rightFrontMotor.angularVelocity +
            this.leftBackMotor.angularVelocity +
            this.rightBackMotor.angularVelocity
        );

        this.yVelocity = this.WHEEL_RADIUS / 4 * (
            -this.leftFrontMotor.angularVelocity +
            this.rightFrontMotor.angularVelocity +
            this.leftBackMotor.angularVelocity +
            -this.rightBackMotor.angularVelocity
        );

        this.headingVelocity = this.WHEEL_RADIUS / (4 * (this.WHEEL_X_DISTANCE + this.WHEEL_Y_DISTANCE)) * (
            -this.leftFrontMotor.angularVelocity +
            this.rightFrontMotor.angularVelocity +
            -this.leftBackMotor.angularVelocity +
            this.rightBackMotor.angularVelocity
        );

        this.position.x += this.xVelocity / 60;
        this.position.y += this.yVelocity / 60;
        this.rotation += this.headingVelocity / 60;
    }
}

export { Robot };
