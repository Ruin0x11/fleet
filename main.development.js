import { app, ipcMain, BrowserWindow, Menu, shell } from 'electron';
const main = require('electron-process').main;
var fs = require("fs");
const path = require('path');

let menu;
let template;
let mainWindow = null;
let backgroundWindow = null;

app.commandLine.appendSwitch('proxy-server', 'localhost:5555');

let ppapi_flash_path;

// Determine which flash plugin to use
if(process.platform  == 'win32'){
    ppapi_flash_path = path.join(__dirname, 'plugins', 'pepflashplayer.dll');
} else if (process.platform == 'linux') {
    ppapi_flash_path = path.join(__dirname, 'plugins', 'libpepflashplayer.so');
} else if (process.platform == 'darwin') {
    ppapi_flash_path = path.join(__dirname, 'plugins', 'PepperFlashPlayer.plugin');
}

app.commandLine.appendSwitch('ppapi-flash-path', ppapi_flash_path);
// app.commandLine.appendSwitch('ppapi-flash-version', '21.0.0.242');

if (process.env.NODE_ENV === 'development') {
    require('electron-debug')(); // eslint-disable-line global-require
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

const low = require('lowdb');
const db = low('settings.json');

db.defaults({ settings: { proxy: "", proxyProtocol: "http", proxyPort: 80 } }).value();

function reloadProxy() {
    if (backgroundWindow) {
        backgroundWindow.close();
    }

    backgroundWindow = new BrowserWindow();

    if (process.env.NODE_ENV === 'production') {
        backgroundWindow.hide();
    }

    // load the proxy server
    backgroundWindow.loadURL(`file://${__dirname}/app/proxite.html`);
}

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        show: false,
        width: 800,
        height: 768,
        'web-preferences': { 'plugins': true }
    });

    backgroundWindow = new BrowserWindow();

    if (process.env.NODE_ENV === 'production') {
        backgroundWindow.hide();
    }

    // load the proxy server
    backgroundWindow.loadURL(`file://${__dirname}/app/proxite.html`);

    // we have to wait for the proxy server to initialize first,
    // otherwise bundle.js fails to load. so, set a timeout
    setTimeout(continueSetup, 2000)
});

function continueSetup() {
    mainWindow.loadURL(`file://${__dirname}/app/app.html`);

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        // mainWindow.focus();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
        backgroundWindow.close();
        backgroundWindow = null;
    });

    if (true) {
        /* if (process.env.NODE_ENV === 'development') {*/
        mainWindow.openDevTools();
        backgroundWindow.openDevTools();
    }

    if (process.platform === 'darwin') {
        template = [{
            label: 'Electron',
            submenu: [{
                label: 'About ElectronReact',
                selector: 'orderFrontStandardAboutPanel:'
            }, {
                type: 'separator'
            }, {
                label: 'Services',
                submenu: []
            }, {
                type: 'separator'
            }, {
                label: 'Hide ElectronReact',
                accelerator: 'Command+H',
                selector: 'hide:'
            }, {
                label: 'Hide Others',
                accelerator: 'Command+Shift+H',
                selector: 'hideOtherApplications:'
            }, {
                label: 'Show All',
                selector: 'unhideAllApplications:'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'Command+Q',
                click() {
                    app.quit();
                }
            }]
        }, {
            label: 'Edit',
            submenu: [{
                label: 'Undo',
                accelerator: 'Command+Z',
                selector: 'undo:'
            }, {
                label: 'Redo',
                accelerator: 'Shift+Command+Z',
                selector: 'redo:'
            }, {
                type: 'separator'
            }, {
                label: 'Cut',
                accelerator: 'Command+X',
                selector: 'cut:'
            }, {
                label: 'Go',
                accelerator: 'Command+G',
                click() {
                    mainWindow.loadURL(`https://www.adobe.com/jp/software/flash/about/`);
                }
            }, {
                label: 'Copy',
                accelerator: 'Command+C',
                selector: 'copy:'
            }, {
                label: 'Paste',
                accelerator: 'Command+V',
                selector: 'paste:'
            }, {
                label: 'Select All',
                accelerator: 'Command+A',
                selector: 'selectAll:'
            }]
        }, {
            label: 'View',
            submenu: (process.env.NODE_ENV === 'development') ? [{
                label: 'Reload',
                accelerator: 'Command+R',
                click() {
                    mainWindow.webContents.reload();
                }
            }, {
                label: 'Toggle Full Screen',
                accelerator: 'Ctrl+Command+F',
                click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
            }, {
                label: 'Toggle Developer Tools',
                accelerator: 'Alt+Command+I',
                click() {
                    mainWindow.toggleDevTools();
                }
            }] : [{
                label: 'Toggle Full Screen',
                accelerator: 'Ctrl+Command+F',
                click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
            }]
        }, {
            label: 'Window',
            submenu: [{
                label: 'Minimize',
                accelerator: 'Command+M',
                selector: 'performMiniaturize:'
            }, {
                label: 'Close',
                accelerator: 'Command+W',
                selector: 'performClose:'
            }, {
                type: 'separator'
            }, {
                label: 'Bring All to Front',
                selector: 'arrangeInFront:'
            }]
        }, {
            label: 'Help',
            submenu: [{
                label: 'Learn More',
                click() {
                    shell.openExternal('http://electron.atom.io');
                }
            }, {
                label: 'Documentation',
                click() {
                    shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
                }
            }, {
                label: 'Community Discussions',
                click() {
                    shell.openExternal('https://discuss.atom.io/c/electron');
                }
            }, {
                label: 'Search Issues',
                click() {
                    shell.openExternal('https://github.com/atom/electron/issues');
                }
            }]
        }];

        /* /* menu = Menu.buildFromTemplate(template);
         *  Menu.setApplicationMenu(menu);*/
         Menu.setApplicationMenu(null);
    } else {
        template = [{
            label: '&File',
            submenu: [{
                label: '&Open',
                accelerator: 'Ctrl+O'
            }, {
                label: '&Close',
                accelerator: 'Ctrl+W',
                click() {
                    mainWindow.close();
                }
            }]
        }, {
            label: '&View',
            submenu: (process.env.NODE_ENV === 'development') ? [{
                label: '&Reload',
                accelerator: 'Ctrl+R',
                click() {
                    mainWindow.webContents.reload();
                }
            }, {
                label: 'Toggle &Full Screen',
                accelerator: 'F11',
                click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
            }, {
                label: 'Toggle &Developer Tools',
                accelerator: 'Alt+Ctrl+I',
                click() {
                    mainWindow.toggleDevTools();
                }
            }] : [{
                label: 'Toggle &Full Screen',
                accelerator: 'F11',
                click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
            }]
        }, {
            label: 'Help',
            submenu: [{
                label: 'Learn More',
                click() {
                    shell.openExternal('http://electron.atom.io');
                }
            }, {
                label: 'Documentation',
                click() {
                    shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
                }
            }, {
                label: 'Community Discussions',
                click() {
                    shell.openExternal('https://discuss.atom.io/c/electron');
                }
            }, {
                label: 'Search Issues',
                click() {
                    shell.openExternal('https://github.com/atom/electron/issues');
                }
            }]
        }];
        /* menu = Menu.buildFromTemplate(template);
         * mainWindow.setMenu(menu);*/
         mainWindow.setMenu(null);
    }
}

ipcMain.on('dispatch', (_, arg) => {
    mainWindow.webContents.send('dispatch', arg);
});

ipcMain.on('reload-proxy', (_, arg) => {
    reloadProxy();
});

ipcMain.on('screenshot', (_, arg) => {
    const cb = data => {
        var timestamp = new Date().getTime().toString();
        fs.writeFile(timestamp + ".png", data.toPng(), function(err) {
            if (err) {
                console.log("Failed to save screenshot", err);
            }
        });
    };

    var crop = {
        x: 0,
        y: 0,
        width: 800,
        height: 480
    };

    mainWindow.capturePage(crop, cb);
});
