import { ResourceInformation } from "./ResourceInformation.js";
/** Loads and handles resources. */
class Resources {
    maximumLoadingTimes;
    resourceInformations;
    resourcesLoaded;
    currentId;
    /**
     * Constructs a new Resources instance.
     */
    constructor() {
        this.maximumLoadingTimes = new Map([
            ["img", 1000],
            ["audio", 1000],
            ["video", 1000]
        ]);
        this.resourceInformations = [];
        this.resourcesLoaded = false;
        this.currentId = 0;
    }
    getMaximumLoadingTime(resource) {
        const resourceType = this.getResourceTypeFromElement(resource);
        const undefinedMaxLoadingTime = this.maximumLoadingTimes.get(resourceType);
        if (undefinedMaxLoadingTime === undefined) {
            throw new Error("Could not get maximum loading time from resource.");
        }
        const maximumLoadingTime = undefinedMaxLoadingTime;
        return maximumLoadingTime;
    }
    addImage(imagePath) {
        return this.addResource(imagePath, "img");
    }
    addAudio(audioPath) {
        return this.addResource(audioPath, "audio");
    }
    addVideo(videoPath) {
        return this.addResource(videoPath, "video");
    }
    loadResources() {
        const resourcePromises = [];
        for (let i = 0; i < this.resourceInformations.length; i++) {
            const resourceInformation = this.resourceInformations[i];
            const element = resourceInformation.getElement();
            resourcePromises.push(this.makeResourcePromise(element));
        }
        return Promise.all(resourcePromises);
    }
    getImage(imageId) {
        if (this.resourceInformations[imageId].getType() !== "img")
            throw new Error("[Resources]: Image id " + imageId + " does not represent an image.");
        return this.resourceInformations[imageId].getElement();
    }
    addResource(path, type) {
        const element = document.createElement(type);
        element.src = path;
        this.resourceInformations.push(new ResourceInformation(type, path, element));
        return this.currentId++;
    }
    makeResourcePromise(resource) {
        return new Promise((resolve, reject) => {
            let resolved = false;
            resource.addEventListener("load", () => {
                resolved = true;
                resolve();
            });
            const maximumLoadingTime = this.getMaximumLoadingTime(resource);
            window.setTimeout(() => {
                if (resolved)
                    return;
                console.log("Couldn't load resource " + resource.src + " in " + maximumLoadingTime + " milliseconds.");
                reject();
            }, maximumLoadingTime);
        });
    }
    getResourceTypeFromElement(resourceElement) {
        if (this.resourcesLoaded) {
            for (let i = 0; i < this.resourceInformations.length; i++) {
                const resourceInformation = this.resourceInformations[i];
                const element = resourceInformation.getElement();
                if (element === resourceElement) {
                    return resourceInformation.getType();
                }
            }
        }
        throw new Error("[Resources]: Could not get resource type from resource element.");
    }
    getResourceElementFromPath(resourcePath) {
        if (this.resourcesLoaded) {
            for (let i = 0; i < this.resourceInformations.length; i++) {
                const resourceInformation = this.resourceInformations[i];
                const path = resourceInformation.getType();
                if (path === resourcePath) {
                    return resourceInformation.getElement();
                }
            }
        }
        throw new Error("[Resources]: Could not get resource element from path" + resourcePath + ".");
    }
}
export { Resources };
