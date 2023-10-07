import { ResourceElement } from "./ResourceElement.js";
import { ResourceType } from "./ResourceType.js";

import { ResourceInformation } from "./ResourceInformation.js";

/** Loads and handles resources. */
class Resources {
    private maximumLoadingTimes: Map<ResourceType, number>;
    private resourceInformations: ResourceInformation[];
    private resourcesLoaded: boolean;

    private currentId: number;
    
    /**
     * Constructs a new Resources instance.
     */
    constructor() {
        this.maximumLoadingTimes = new Map<ResourceType, number>([
            ["img", 1000],
            ["audio", 1000],
            ["video", 1000]
        ]);

        this.resourceInformations = [];
        this.resourcesLoaded = false;

        this.currentId = 0;
    }

    private getMaximumLoadingTime(resource: ResourceElement): number {
        const resourceType: ResourceType = this.getResourceTypeFromElement(resource);
        const undefinedMaxLoadingTime: number | undefined = this.maximumLoadingTimes.get(resourceType);

        if (undefinedMaxLoadingTime === undefined) {
            throw new Error("Could not get maximum loading time from resource.");
        }

        const maximumLoadingTime: number = undefinedMaxLoadingTime;
        return maximumLoadingTime;
    }

    addImage(imagePath: string): number {
        return this.addResource(imagePath, "img");
    }

    addAudio(audioPath: string): number {
        return this.addResource(audioPath, "audio");
    }

    addVideo(videoPath: string): number {
        return this.addResource(videoPath, "video");
    }

    addResource(path: string, type: ResourceType): number {
        const element: ResourceElement = document.createElement(type);
        element.src = path;
        
        this.resourceInformations.push(new ResourceInformation(type, path, element));

        return this.currentId++;
    }

    makeResourcePromise(resource: ResourceElement): Promise<void> {
        return new Promise<void>(
            (
                resolve: () => void,
                reject: () => void
            ): void => {
                let resolved: boolean = false;

                resource.addEventListener("load", (): void => {
                    resolved = true;
                    resolve();
                });

                const maximumLoadingTime: number = this.getMaximumLoadingTime(resource);

                window.setTimeout((): void => {
                    if (resolved)
                        return;

                    console.log("Couldn't load resource " + resource.src + " in " + maximumLoadingTime + " milliseconds.");
                    reject();
                }, maximumLoadingTime);
            }
        );
    }

    loadResources(): Promise<void[]> {
        const resourcePromises: Promise<void>[] = [];
        for (let i: number = 0; i < this.resourceInformations.length; i++) {
            const resourceInformation: ResourceInformation = this.resourceInformations[i];
            const element: ResourceElement = resourceInformation.getElement();

            resourcePromises.push(this.makeResourcePromise(element));
        }

        return Promise.all(resourcePromises);
    }

    getResourceTypeFromElement(resourceElement: ResourceElement): ResourceType {
        if (this.resourcesLoaded) {
            for (let i: number = 0; i < this.resourceInformations.length; i++) {
                const resourceInformation: ResourceInformation = this.resourceInformations[i];
                const element: ResourceElement = resourceInformation.getElement();

                if (element === resourceElement) {
                    return resourceInformation.getType();
                }
            }
        }

        throw new Error("[Resources]: Could not get resource type from resource element.");
    }

    getResourceElementFromPath(resourcePath: string): ResourceElement {
        if (this.resourcesLoaded) {
            for (let i: number = 0; i < this.resourceInformations.length; i++) {
                const resourceInformation: ResourceInformation = this.resourceInformations[i];
                const path: string = resourceInformation.getType();

                if (path === resourcePath) {
                    return resourceInformation.getElement();
                }
            }
        }

        throw new Error("[Resources]: Could not get resource element from path" + resourcePath + ".");
    }
}

export { Resources };