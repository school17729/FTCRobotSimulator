import { Scene } from "./scene/Scene.js";

class Display {

    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvasLength: number;

    constructor() {
        this.container = document.createElement("div");
        
        this.canvas = document.createElement("canvas");
        
        const nullCtx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (nullCtx === null) {
            throw new Error("[Display]: nullCtx is null.");
        }
        this.ctx = nullCtx;

        this.canvasLength = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
    }

    init(): void {
        this.container.className = "container";
        document.body.insertBefore(this.container, null);

        this.canvas.id = "canvas";
        this.canvas.width = this.canvasLength;
        this.canvas.height = this.canvasLength;
        this.container.insertBefore(this.canvas, null);
    }

    drawScene(scene: Scene): void {
        
    }
}

export { Display };