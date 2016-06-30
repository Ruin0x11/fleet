var fs = require("fs");
var path = require("path");

const webview = document.getElementById('game');
var frameLoaded = false;

const loginURL = "www.dmm.com/my/-/login/"
const gameURL = "www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/"

if (process.env.FLEET != 'run') {
    hideLoadingOverlay();
}

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

    var filename = path.join(__dirname, 'loginForm.css')
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;
        webview.insertCSS(data);
    });
}

function transformPage() {
    injectCSS();

    if (!frameLoaded && webview.getURL().includes(gameURL)) {
        loadGameFrame();
    } else if (webview.getURL().includes(loginURL)) {
        loadLoginForm();
    } else if (frameLoaded) {
        hideLoadingOverlay();
    } else {
        webview.loadURL(gameURL);
    }
};

function loadLoginForm() {
    webview.executeJavaScript('__fleetTools.disableStylesheets()');
    hideLoadingOverlay();
}

function loadGameFrame() {
    frameLoaded = true;
    webview.send('getGameFrame');
}

webview.addEventListener('did-start-loading', showLoadingOverlay);
webview.addEventListener('did-stop-loading', transformPage);
