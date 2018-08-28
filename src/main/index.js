import { app, BrowserWindow } from 'electron';
import path from 'path';
import { format as formatUrl } from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow;

function createMainWindow() {
  const theWindow = new BrowserWindow();

  if (isDevelopment) {
    theWindow.webContents.openDevTools();
  }

  if (isDevelopment) {
    theWindow.loadURL('http://localhost:8080');
  } else {
    theWindow.loadURL(formatUrl({
      pathname: path.join(app.getAppPath(), 'dist/index.html'),
      protocol: 'file',
      slashes: true,
    }));
  }

  theWindow.on('closed', () => {
    mainWindow = null;
  });

  theWindow.webContents.on('devtools-opened', () => {
    theWindow.focus();
    setImmediate(() => {
      theWindow.focus();
    });
  });

  return theWindow;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();
});
