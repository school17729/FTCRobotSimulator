import { Display } from "./Display.js";
import { Resources } from "./resource/Resources.js";
import { Scene } from "./scene/Scene.js";
import { Robot } from "./robot/Robot.js";
import { HardwareMap } from "./robot/HardwareMap.js";
import { Telemetry } from "./robot/Telemetry.js";
import { TeleOp } from "./teamcode/TeleOp.js";

class Main {

    private resources: Resources;

    private robot: Robot;
    private hardwareMap: HardwareMap;
    private telemetry: Telemetry;
    private scene: Scene;
    private display: Display;
    private teleop: TeleOp;

    constructor() {
        this.resources = new Resources();
        
        const fieldId: number = this.resources.addImage("./resources/field.png");

        this.robot = new Robot();
        this.hardwareMap = new HardwareMap();
        this.telemetry = new Telemetry();

        this.robot.fillHardwareMap(this.hardwareMap);

        this.scene = new Scene(fieldId, this.robot);
        this.display = new Display(this.resources);
        this.teleop = new TeleOp(this.hardwareMap, this.telemetry);
    }

    public async init(): Promise<void> {
        await this.resources.loadResources()
        .catch(() => {});
        this.display.init();
        this.loop();
    }

    private loop(): void {
        this.teleop.loop();
        this.robot.update();
        this.display.drawScene(this.scene);

        window.requestAnimationFrame(this.loop.bind(this));
    }
}


window.addEventListener("load", main);
async function main(): Promise<void> {
    const main: Main = new Main();
    await main.init();
}
