const { app, BrowserWindow } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
        width: 480,
        height: 640,
        center: true,
        resizable: false, 
        frame : false
	});
	
    win.loadFile('./html/index.html')
}

app.whenReady().then(createWindow)