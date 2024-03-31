import { Position } from "./generic/Position.js";
import { Mathematics } from "./generic/Mathematics.js";
class Display {
    resources;
    container;
    canvas;
    ctx;
    canvasLength;
    pixelsPerInch;
    constructor(resources) {
        this.resources = resources;
        this.container = document.createElement("div");
        this.canvas = document.createElement("canvas");
        const nullCtx = this.canvas.getContext("2d");
        if (nullCtx === null) {
            throw new Error("[Display]: nullCtx is null.");
        }
        this.ctx = nullCtx;
        this.canvasLength = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
        this.pixelsPerInch = this.canvasLength / 144;
    }
    init() {
        this.container.className = "container";
        document.body.insertBefore(this.container, null);
        this.canvas.className = "canvas";
        this.canvas.width = this.canvasLength;
        this.canvas.height = this.canvasLength;
        this.container.insertBefore(this.canvas, null);
    }
    drawScene(scene) {
        this.ctx.clearRect(0, 0, this.canvasLength, this.canvasLength);
        this.drawBackground(scene.getBackgroundId());
        this.drawRobot(scene.robot);
    }
    drawBackground(backgroundId) {
        const image = this.resources.getImage(backgroundId);
        this.ctx.drawImage(image, 0, 0, this.canvasLength, this.canvasLength);
    }
    drawRobot(robot) {
        const robotRotation = robot.rotation;
        const robotWidth = robot.getWidth();
        const robotHeight = robot.getHeight();
        const worldCenterPosition = robot.position;
        const worldCornerPosition = new Position(worldCenterPosition.x - robotWidth / 2, worldCenterPosition.y + robotHeight / 2);
        const canvasCenterPosition = this.worldToCanvas(worldCenterPosition);
        const canvasCornerPosition = this.worldToCanvas(worldCornerPosition);
        const canvasX = canvasCornerPosition.x;
        const canvasY = canvasCornerPosition.y;
        const canvasWidth = robotWidth * this.pixelsPerInch;
        const canvasHeight = robotHeight * this.pixelsPerInch;
        this.ctx.fillStyle = "rgb(0, 0, 255)";
        this.ctx.translate(canvasCenterPosition.x, canvasCenterPosition.y);
        this.ctx.rotate(-robotRotation);
        this.ctx.translate(-canvasCenterPosition.x, -canvasCenterPosition.y);
        this.ctx.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);
        this.ctx.translate(canvasCenterPosition.x, canvasCenterPosition.y);
        this.ctx.rotate(robotRotation);
        this.ctx.translate(-canvasCenterPosition.x, -canvasCenterPosition.y);
    }
    worldToCanvas(position) {
        const newX = Mathematics.mapNumber(position.x, -72, 72, 0, this.canvasLength);
        const newY = Mathematics.mapNumber(position.y, -72, 72, this.canvasLength, 0);
        return new Position(newX, newY);
    }
}
export { Display };
