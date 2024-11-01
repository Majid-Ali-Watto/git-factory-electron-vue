import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		// autoHideMenuBar: true, // Hides the menu, but it can be shown by pressing Alt (Windows and Linux only).
		webPreferences: {
			// preload: path.join(__dirname, "preload.js"), // optional, for using contextBridge
			nodeIntegration: true, // set to true if you need Node.js in the renderer
			contextIsolation: true
		},
		icon: join(__dirname, "assets/icon.png") // Use a .png for Linux
	});
	// mainWindow.setMenuBarVisibility(false); //Hides the menu but still allows it to be shown programmatically if needed.
	mainWindow.removeMenu(); //Completely removes the menu.

	mainWindow.maximize(); // sets screen full sized.
	mainWindow.loadURL(process.env.SERVER_URL);
	// mainWindow.loadURL("https://git-factory.netlify.app/");
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
