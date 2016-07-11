var fs = require("fs");
var path = require("path");

const webview = document.getElementById('game');
var frameLoaded = false;
var reachedLogin = false;
var loadError = false;

const loginURL = "www.dmm.com/my/-/login/"
const gameURL = "www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/"
const blockedURLs = ["www.dmm.com/en/top/-/error/area/",
    "www.dmm.com/en/netgame/foreign/",
    "www.dmm.com/en/top/-/error/area/",
    "www.dmm.com/ja/top/-/error/area/"]

if (process.env.FLEET != 'run') {
    hideLoadingOverlay();
}

/* webview.addEventListener('dom-ready', () => {
 *     webview.openDevTools();
 * });
 * */
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

function showLoadError() {
    loadError = true;
    webview.loadURL(`file://${__dirname}/error.html`);
    hideLoadingOverlay();
}

function showBlockedError() {
    loadError = true;
    webview.loadURL(`file://${__dirname}/blocked.html`);
    hideLoadingOverlay();
}

function isBlockedURL(url) {
    for(var i = 0; i < blockedURLs.length; i++) {
        if (url.includes(blockedURLs[i])) {
            return true;
        }
    }
    return false;
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
    if (loadError) {
        hideLoadingOverlay();
        return;
    }

    injectCSS();
    console.log("loaded")
    console.log(webview.getURL())
    console.log(reachedLogin)

    var url = webview.getURL();

    if (!frameLoaded && url.includes(gameURL)) {
        loadGameFrame();
    } else if (frameLoaded) {
        hideLoadingOverlay();
    } else if (url.includes(loginURL)) {
        loadLoginForm();
    } else if (isBlockedURL(url)) {
        showBlockedError();
    } else if (!reachedLogin) {
        showLoadError();
    } else {
        webview.loadURL(gameURL);
    }
};

function loadLoginForm() {
    webview.executeJavaScript('__fleetTools.disableStylesheets()');
    hideLoadingOverlay();
    reachedLogin = true;
}

function loadGameFrame() {
    console.log("loading frame")
    frameLoaded = true;
    webview.send('getGameFrame');
}

webview.addEventListener('did-start-loading', showLoadingOverlay);
webview.addEventListener('did-stop-loading', transformPage);

webview.addEventListener('did-fail-load', (a, b, c, d) => {
    console.log(a);
})
