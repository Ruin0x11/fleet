__fleetTools={
    getLoginForm: function() {
        var body = document.querySelector('body');
        var loginForm = document.getElementById('main-my');
        body.innerHTML = '';
        body.appendChild(loginForm);
    }
}

const {ipcRenderer} = require('electron');

ipcRenderer.on('getGameFrame', () => {
    // obtain the source URL of the game's iframe and tell the host to set the webview's URL to it
    ipcRenderer.sendToHost("src", document.getElementById("game_frame").getAttribute("src"));
});
