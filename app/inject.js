__fleetTools={
    getSWF: function(){
        var p = document.querySelector('body');
        var d = document.getElementById('area_game');
        p.innerHTML = '';
        p.appendChild(d);
    }
}

const {ipcRenderer} = require('electron');
ipcRenderer.on('ping', () => {
    console.log('asd');
    ipcRenderer.sendToHost("src", document.getElementById("game_frame").getAttribute("src"));
});
