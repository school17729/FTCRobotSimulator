import { Display } from "./Display.js";
import { Resources } from "./resource/Resources.js";

window.addEventListener("load", main);
async function main(): Promise<void> {
    const resources: Resources = new Resources();
    
    const fieldId: number = resources.addImage("./resources/field.png");

    await resources.loadResources()
        .catch(() => {});
        
    const display: Display = new Display();
    display.init();
}