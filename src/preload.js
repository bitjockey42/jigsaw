// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  closeWindow: () => ipcRenderer.send('app-close-window'),
  saveData: (puzzleId, name, data) => ipcRenderer.invoke('save-data', puzzleId, name, data),
  renameData: (puzzleId, name) => ipcRenderer.invoke('rename-data', puzzleId, name),
  loadData: (puzzleId) => ipcRenderer.invoke('load-data', puzzleId),
  deleteData: (puzzleId) => ipcRenderer.invoke('delete-data', puzzleId),
  listSavedGames: () => ipcRenderer.invoke('list-saved-games'),
  toggleFullscreen: () => ipcRenderer.invoke('toggle-fullscreen')
});
