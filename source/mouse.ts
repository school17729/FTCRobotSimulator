class Mouse {
    canvas: HTMLCanvasElement;

    leftButton: boolean;
    rightButton: boolean;
    middleButton: boolean;

    mouseX: number;
    mouseY: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.leftButton = false;
        this.rightButton = false;
        this.middleButton = false;

        this.mouseX = 0;
        this.mouseY = 0;
    }

    init(): void {
        window.addEventListener("mousedown", this.mousedown.bind(this));
        window.addEventListener("mouseup", this.mouseup.bind(this));
        window.addEventListener("mousemove", this.mousemove.bind(this));
    }

    mousedown(e: MouseEvent): void {
        if (e.button === 0) {
            this.leftButton = true;
        } else if (e.button === 2) {
            this.rightButton = true;
        } else if (e.button === 1) {
            this.middleButton = true;
        }
    }

    mouseup(e: MouseEvent): void {
        if (e.button === 0) {
            this.leftButton = false;
        } else if (e.button === 2) {
            this.rightButton = false;
        } else if (e.button === 1) {
            this.middleButton = false;
        }
    }

    mousemove(e: MouseEvent): void {
        this.mouseX = (1000 / this.canvas.width) * e.clientX + ((500 * (this.canvas.width - window.innerWidth)) / this.canvas.width);
        this.mouseY = (1000 / this.canvas.height) * e.clientY + ((500 * (this.canvas.height - window.innerHeight)) / this.canvas.height);
    }
}

export { Mouse };