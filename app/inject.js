__fleetTools={
    getSWF: function(){
        var body = document.querySelector('body');
        var gameArea = document.getElementById('area_game');
        body.innerHTML = '';
        body.appendChild(gameArea);
    }
}

const {ipcRenderer} = require('electron');
ipcRenderer.on('ping', () => {
    // obtain the source URL of the game's iframe and tell the host to render it
    ipcRenderer.sendToHost("src", document.getElementById("game_frame").getAttribute("src"));
});
