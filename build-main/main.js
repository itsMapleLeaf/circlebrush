"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
let instance;
function createWindow() {
    instance = new electron_1.BrowserWindow();
    instance.on("closed", () => {
        instance = null;
    });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        Electron.app.quit();
    }
});
electron_1.app.on("activate", () => {
    if (instance === null) {
        createWindow();
    }
});
