import { OpMode } from "../robot/OpMode.js";
import { DcMotor } from "../robot/DcMotor.js";
import { HardwareMap } from "../robot/HardwareMap.js";
import { Telemetry } from "../robot/Telemetry.js";

class TeleOp extends OpMode {

    private leftFrontMotor: DcMotor;
    private leftBackMotor: DcMotor;
    private rightFrontMotor: DcMotor;
    private rightBackMotor: DcMotor;

    constructor(hardwareMap: HardwareMap, telemetry: Telemetry) {
        super(hardwareMap, telemetry);

        this.leftFrontMotor = this.hardwareMap.get("LF") as DcMotor;
        this.leftBackMotor = this.hardwareMap.get("LB") as DcMotor;
        this.rightFrontMotor = this.hardwareMap.get("RF") as DcMotor;
        this.rightBackMotor = this.hardwareMap.get("RB") as DcMotor;
    }


    public loop(): void {
        this.leftFrontMotor.setPower(1);
        this.leftBackMotor.setPower(0);
        this.rightFrontMotor.setPower(0);
        this.rightBackMotor.setPower(0);
    }
}

export { TeleOp };
