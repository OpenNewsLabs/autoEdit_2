/**
 * 
 * initially from https://github.com/pickercenter/autoedit-panel
 * 
 * File needed for adobe Panel

- The `.debug` file is necessary to get the chrome dev tools
but all you need are those three
- the `manifest` is really the important part, its what loads the index and jsx file
- `./index.html`
- `./jsx/Premiere.jsx`

 */
// echo "Setting Premiere debug mode to accept unsigned extensions"

// defaults write com.adobe.CSXS.5 PlayerDebugMode 1
// defaults write com.adobe.CSXS.6 PlayerDebugMode 1
// defaults write com.adobe.CSXS.7 PlayerDebugMode 1
// defaults write com.adobe.CSXS.8 PlayerDebugMode 1

// echo "Done, please restart your computer"
 

/////////////////////////////////////////////////////////
// #!/bin/bash
// #   For build/deployment, to open Panel within adobe, this scrript,for mac, 
// #  moves content of this app to Adobe Premiere extension folder
// #  
// #  giving persmission to script if needed
// #  https://askubuntu.com/questions/409025/permission-denied-when-running-sh-scripts
// #  chmod +x the_file_name
 
// # makes directory if not present
// mkdir -p ~/Library/Application\ Support/Adobe/CEP/extensions/
// # copies content of current directory into extnesion folder
// cp -R $PWD ~/Library/Application\ Support/Adobe/CEP/extensions/

// Adobe Premiere 

const adobeExtensionsFolder = '~/Library/Application\ Support/Adobe/CEP/extensions';
const panelExtensionFolderName = `autoedit-panel`;
const autoEditadobeExtensionFolder = `${adobeExtensionsFolder}/${panelExtensionFolderName}`;


// if folder exists delete it

test 3 
