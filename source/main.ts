import { Display } from "./Display.js";
import { Resources } from "./resource/Resources.js";
import { Scene } from "./scene/Scene.js";
import { Robot } from "./robot/Robot.js";

class Main {

    private resources: Resources;

    private robot: Robot;
    private scene: Scene;
    private display: Display;

    constructor() {
        this.resources = new Resources();
        

        const fieldId: number = this.resources.addImage("./resources/field.png");
        
        this.robot = new Robot();
        this.scene = new Scene(fieldId, this.robot);
        this.display = new Display(this.resources);
    }

    public async init(): Promise<void> {
        await this.resources.loadResources()
            .catch(() => {});
        this.display.init();
        this.loop();
    }

    private loop(): void {
        this.robot.rotation += 2 * Math.PI / 60;
        this.robot.position.x += 12 / 60;

        this.display.drawScene(this.scene);

        window.requestAnimationFrame(this.loop.bind(this));
    }
}


window.addEventListener("load", main);
async function main(): Promise<void> {
    const main: Main = new Main();
    await main.init();
}