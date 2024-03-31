class ResourceInformation {
    type;
    path;
    element;
    constructor(type, path, element) {
        this.type = type;
        this.path = path;
        this.element = element;
    }
    getType() {
        return this.type;
    }
    getPath() {
        return this.path;
    }
    getElement() {
        return this.element;
    }
}
export { ResourceInformation };
