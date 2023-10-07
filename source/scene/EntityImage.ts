class EntityImage {

    private id: number;
    public width: number;
    public height: number;

    constructor(id: number, width: number, height: number) {
        this.id = id;
        this.width = width;
        this.height = height;
    }

    public getId(): number {
        return this.id;
    }
}

export { EntityImage };