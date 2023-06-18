import path from 'path';
import { app, BrowserWindow } from 'electron';
// import log from 'electron-log';
// import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

let mainWindow: BrowserWindow | null = null;
const createWindow = async () => {
  // Determine the path to the assets folder based on whether the app is packaged or in development mode
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');
  // Helper function to get the full path of an asset
  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  // Create the main browser window
  mainWindow = new BrowserWindow({
    show: false,
    width: 80,
    height: 50,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  // Load the main HTML file of the app into the window
  mainWindow.loadURL(resolveHtmlPath('index.html'));

  // When the window is ready to show, make it visible
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });
};

// When the app is ready, create the main window and set up an event listener for 'activate' event
app
  .whenReady()
  // eslint-disable-next-line promise/always-return
  .then(() => {
    createWindow();

    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch((error: Error) => {
    // Handle the error if needed
    // console.error(error);
  });
