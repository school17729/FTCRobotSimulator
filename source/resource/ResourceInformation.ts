import { ResourceElement } from "./ResourceElement.js";
import { ResourceType } from "./ResourceType.js";

class ResourceInformation {

    private type: ResourceType;
    private path: string;
    private element: ResourceElement;
    

    constructor(type: ResourceType, path: string, element: ResourceElement) {
        this.type = type;
        this.path = path;
        this.element = element;
    }

    public getType(): ResourceType {
        return this.type;
    }

    public getPath(): string {
        return this.path;
    }

    public getElement(): ResourceElement {
        return this.element;
    }
}

export { ResourceInformation };