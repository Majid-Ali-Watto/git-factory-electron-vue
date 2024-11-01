import { contextBridge } from "electron";

// Expose APIs to the renderer process here
contextBridge.exposeInMainWorld("electronAPI", {
	// functions to be exposed
});
