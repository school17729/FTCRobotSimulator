import { Scene } from "./scene/Scene.js";
import { Robot } from "./robot/Robot.js";
import { Resources } from "./resource/Resources.js";
import { Position } from "./generic/Position.js";
import { Mathematics } from "./generic/Mathematics.js";

class Display {

    resources: Resources;

    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvasLength: number;

    pixelsPerInch: number;

    constructor(resources: Resources) {
        this.resources = resources;

        this.container = document.createElement("div");
        
        this.canvas = document.createElement("canvas");
        
        const nullCtx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (nullCtx === null) {
            throw new Error("[Display]: nullCtx is null.");
        }
        this.ctx = nullCtx;

        this.canvasLength = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;

        this.pixelsPerInch = this.canvasLength / 144;
    }

    public init(): void {
        this.container.className = "container";
        document.body.insertBefore(this.container, null);

        this.canvas.className = "canvas";
        this.canvas.width = this.canvasLength;
        this.canvas.height = this.canvasLength;
        this.container.insertBefore(this.canvas, null);
    }

    public drawScene(scene: Scene): void {
        this.ctx.clearRect(0, 0, this.canvasLength, this.canvasLength);
        this.drawBackground(scene.getBackgroundId());
        this.drawRobot(scene.robot);
    }

    private drawBackground(backgroundId: number) {
        const image: HTMLImageElement = this.resources.getImage(backgroundId);

        this.ctx.drawImage(image, 0, 0, this.canvasLength, this.canvasLength);
    }

    private drawRobot(robot: Robot): void {
        const robotRotation: number = robot.rotation;
        const robotWidth: number = robot.getWidth();
        const robotHeight: number = robot.getHeight();

        const worldCenterPosition: Position = robot.position;
        const worldCornerPosition: Position = new Position(worldCenterPosition.x - robotWidth / 2, worldCenterPosition.y + robotHeight / 2);
        const canvasCenterPosition: Position = this.worldToCanvas(worldCenterPosition);
        const canvasCornerPosition: Position = this.worldToCanvas(worldCornerPosition);

        const canvasX: number = canvasCornerPosition.x;
        const canvasY: number = canvasCornerPosition.y;
        const canvasWidth: number = robotWidth * this.pixelsPerInch;
        const canvasHeight: number = robotHeight * this.pixelsPerInch;

        this.ctx.fillStyle = "rgb(0, 0, 255)";

        this.ctx.translate(canvasCenterPosition.x, canvasCenterPosition.y);
        this.ctx.rotate(-robotRotation);
        this.ctx.translate(-canvasCenterPosition.x, -canvasCenterPosition.y);

        this.ctx.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);

        this.ctx.translate(canvasCenterPosition.x, canvasCenterPosition.y);
        this.ctx.rotate(robotRotation);
        this.ctx.translate(-canvasCenterPosition.x, -canvasCenterPosition.y);
        
    }

    private worldToCanvas(position: Position): Position {
        const newX: number = Mathematics.mapNumber(position.x, -72, 72, 0, this.canvasLength);
        const newY: number = Mathematics.mapNumber(position.y, -72, 72, this.canvasLength, 0);

        return new Position(newX, newY);
    }
}

export { Display };