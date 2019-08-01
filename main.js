const { app, ipcMain, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(`file://${__dirname}/dist/example/index.html`);

  mainWindow.webContents.openDevTools({ mode: 'detach' });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('new-example', (e, data) => {
  console.log('got data', data);
  const firstName = data['firstName'];

  // simulate long running task
  setTimeout(() => {
    const newFirstName = firstName + ' Jr';

    console.log('sending back data', newFirstName);
    mainWindow.webContents.send(
      'new-example-response',
      {
        id: data['id'],
        firstName: newFirstName
      }
    );
  }, 3000);
});
