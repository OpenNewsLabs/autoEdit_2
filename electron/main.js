const {app, BrowserWindow, dialog, shell, Menu} = require('electron');
const path = require('path')
const url = require('url')


//require('electron-debug')({showDevTools: true});
// require('electron-debug')({enabled: true});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null;

// https://electron.atom.io/docs/api/app/#appsetaboutpaneloptionsoptions-macos

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000, 
    height: 670,
    minWidth: 1000,
    minHeight: 670
  });


  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // win.webContents.openDevTools();

// Sharing data path through window object. with db.js
//https://github.com/electron/electron/issues/1095
 win.dataPath = app.getPath("userData");
 win.app = app;


 // MENU
 // Create the Application's main menu
    var template = [{
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            {role: 'pasteandmatchstyle'},
            {role: 'delete'},
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" },
            {type: 'separator'},
            {label: 'Speech',
              submenu: [
                {role: 'startspeaking'}, //perhaps add keyboard shortcut?
                {role: 'stopspeaking'} //perhaps add keyboard shortcut?
              ]}
        ]},{
        label: 'View',
        submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          {role: 'toggledevtools', accelerator: "CmdOrCtrl+Alt+I"},
          {type: 'separator'},
          {role: 'resetzoom'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]},{
        role: 'window',
        submenu: [
          {role: 'minimize'},
          {role: 'close'}
        ]},{
        role: 'help',
        submenu: [
          {
            label: 'Project Page',
            click () { require('electron').shell.openExternal('https://autoEdit.io') }
          },
          {
            label: 'User Manual',
            click () { require('electron').shell.openExternal('https://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/') }
          },{
            label : 'Advanced - Developer Console',
            click () { win.webContents.toggleDevTools() }
          }
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

//not working 
app.on('open-url', (event, url) => {
  console.log(url);
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  event.preventDefault();
  shell.openExternal(url);
})

//https://electron.atom.io/docs/api/app/#event-open-file-macos
//not working 
app.on('open-file', (event, path) => {
  console.log(path);
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  event.preventDefault();
  // shell.openExternal(url);
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.