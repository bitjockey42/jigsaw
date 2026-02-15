// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  closeWindow: () => ipcRenderer.send('app-close-window'),
  saveData: (name, data) => ipcRenderer.invoke('save-data', name, data),
  loadData: (name) => ipcRenderer.invoke('load-data', name),
});
