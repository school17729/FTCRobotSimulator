import { OpMode } from "../robot/OpMode.js";
class TeleOp extends OpMode {
    leftFrontMotor;
    leftBackMotor;
    rightFrontMotor;
    rightBackMotor;
    constructor(hardwareMap, telemetry) {
        super(hardwareMap, telemetry);
        this.leftFrontMotor = this.hardwareMap.get("LF");
        this.leftBackMotor = this.hardwareMap.get("LB");
        this.rightFrontMotor = this.hardwareMap.get("RF");
        this.rightBackMotor = this.hardwareMap.get("RB");
    }
    loop() {
        this.leftFrontMotor.setPower(1);
        this.leftBackMotor.setPower(0);
        this.rightFrontMotor.setPower(0);
        this.rightBackMotor.setPower(0);
    }
}
export { TeleOp };
