import { Entity } from "./Entity.js";

class EntityBody extends Entity {

    constructor(x: number, y: number, imageId: number) {
        super(x, y);
    }

}

export { EntityBody };