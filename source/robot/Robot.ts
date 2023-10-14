import { Entity } from "../scene/Entity.js";
import { DcMotor } from "./DcMotor.js";
import { Position } from "../generic/Position.js";

class Robot extends Entity {

    private width: number;
    private height: number;

    private leftBackMotor: DcMotor;
    private leftFrontMotor: DcMotor;
    private rightBackMotor: DcMotor;
    private rightFrontMotor: DcMotor;

    constructor() {
        super(new Position(0, 0), Math.PI / 6);

        this.width = 18;
        this.height = 18;

        this.leftBackMotor = new DcMotor();
        this.leftFrontMotor = new DcMotor();
        this.rightBackMotor = new DcMotor();
        this.rightFrontMotor = new DcMotor();
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }
}

export { Robot };