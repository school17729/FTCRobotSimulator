class Scene {
    backgroundId;
    robot;
    constructor(backgroundId, robot) {
        this.backgroundId = backgroundId;
        this.robot = robot;
    }
    getBackgroundId() {
        return this.backgroundId;
    }
}
export { Scene };
