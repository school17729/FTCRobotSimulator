import { Entity } from "./Entity.js";
import { Robot } from "../robot/Robot.js";

class Scene {

    private backgroundId: number;
    public robot: Robot;

    constructor(backgroundId: number, robot: Robot) {
        this.backgroundId = backgroundId;
        this.robot = robot;
    }

    public getBackgroundId(): number {
        return this.backgroundId;
    }
}

export { Scene };