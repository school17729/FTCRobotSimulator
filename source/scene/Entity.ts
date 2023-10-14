import { Position } from "../generic/Position.js";

class Entity {

    public position: Position;
    public rotation: number;

    constructor(position: Position, rotation: number) {
        this.position = position;
        this.rotation = rotation;
    }
}

export { Entity };