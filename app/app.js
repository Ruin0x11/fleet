var ipc = require("ipc");
require('electron-cookies');

const webview = document.getElementById('game');
var frameLoaded = false;

const loginURL = "www.dmm.com/my/-/login/"
const gameURL = "www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/"

webview.addEventListener('console-message', function(event) {
    console.log('Webview message: ', event.message);
});

webview.addEventListener("ipc-message", function (event) {
    if(event.channel == "src") {
        webview.loadURL(event.args[0]);
    }
});

function showLoadingOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = 'block';
}

function hideLoadingOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = 'none';
}

function injectCSS() {
    webview.insertCSS("#sectionWrap{ visibility:hidden; }");
    webview.insertCSS("#spacing_top{ display:none; }");
    webview.insertCSS("#flashWrap{ background: #000000; overflow:hidden; margin:0; }");
    webview.insertCSS("body{ overflow:hidden; margin:0; }");
}

function transformPage() {
    injectCSS();

    if (!frameLoaded && webview.getURL().includes(gameURL)) {
        loadGameFrame();
    } else if (webview.getURL().includes(loginURL)) {
        loadLoginForm();
    } else if (frameLoaded) {
        hideLoadingOverlay();
    }
};

function loadLoginForm() {
    webview.executeJavaScript('__fleetTools.getLoginForm()');
    webview.openDevTools();
    hideLoadingOverlay();
}

function loadGameFrame() {

    frameLoaded = true;
    webview.send('getGameFrame');
}

webview.addEventListener('did-start-loading', showLoadingOverlay);
webview.addEventListener('did-stop-loading', transformPage);
