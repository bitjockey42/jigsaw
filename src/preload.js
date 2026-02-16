// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  closeWindow: () => ipcRenderer.send('app-close-window'),
  saveData: (puzzleId, name, data) => ipcRenderer.invoke('save-data', puzzleId, name, data),
  loadData: (puzzleId) => ipcRenderer.invoke('load-data', puzzleId),
  listSavedGames: () => ipcRenderer.invoke('list-saved-games')
});
