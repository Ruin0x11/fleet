__fleetTools={
    disableStylesheets: function() {
        for (var i = 0; i < document.styleSheets.length; i++) {
            if (!document.styleSheets[i].disabled) {
                document.styleSheets[i].disabled = true;
            }
        }
    }
}

const {ipcRenderer} = require('electron');

ipcRenderer.on('getGameFrame', () => {
    // obtain the source URL of the game's iframe and tell the host to set the webview's URL to it
    ipcRenderer.sendToHost("src", document.getElementById("game_frame").getAttribute("src"));
});
