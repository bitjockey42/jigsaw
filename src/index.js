const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

let db;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Load database 
app.on('ready', () => {
  const dbPath = path.join(app.getPath('userData'), 'jigsaw.db');
  db = new DatabaseSync(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS saved_games(
      name TEXT PRIMARY KEY,
      data TEXT
    )
  `);
});

app.on('before-quit', () => {
  if (db) {
    db.close();
  }
})

// Exit button
ipcMain.on('app-close-window', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    app.quit();
  }
});

ipcMain.handle('save-data', (event, name, data) => {
  try {
    const stmt = db.prepare('INSERT OR REPLACE INTO saved_games (name, data) VALUES (?, ?)');
    stmt.run(name, data);
    console.log('Autosaved successfully');
  } catch (error) {
    console.error('Autosave failed:', error);
  }
});