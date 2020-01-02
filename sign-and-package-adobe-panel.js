/**
 * Build script to package and sign Adobe CEP panel.
 * uses .env for inputs
 * Example, `.env` file

ZXPSignCmd_PATH="./ccextensionsmac/ZXPSignCmd"
COUNTRY_CODE=UK
STATE_OR_PROVINCE=London
ORGANIZATION=""
COMMON_NAME=""
CERTIFICATE_PASSWORD=""
CERTIFICATE_OUTPUT_PATH="./ccextensionsmac/certificate.p12"
INPUT_DIRECTORY="./adobe-panel-build"
OUTPUT_ZXP="./dist/com.autoedit2.it.zxp"
TIMESTAMPS_URL="http://timestamp.digicert.com/"

 * `./ccextensionsmac/certificate.p12` is in gitignore to avoid accidentally commiting your certificate.
 */
require('dotenv').config();
const { exec } = require('child_process');

console.log("Starting script");
// package all files and folders needed inside adobe-panel-build folder
exec('npm run adobe-panel-build', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        console.error(err);
        return;
    }
    console.log('moved files to adobe-panel-build ');

    // TODO: 
    // delete certificate if present
    // delete ./dist/com.autoEdit2.it.zxp file 

    // creating a certificate
    // ZXPSignCmd -selfSignedCert <countryCode> <stateOrProvince> <organization> <commonName> <password> <outputPath.p12>
    const command = `${process.env.ZXPSignCmd_PATH} -selfSignedCert ${process.env.COUNTRY_CODE} ${process.env.STATE_OR_PROVINCE} ${process.env.ORGANIZATION} "${process.env.COMMON_NAME}" ${process.env.CERTIFICATE_PASSWORD} ${process.env.CERTIFICATE_OUTPUT_PATH}`;
    exec(command, (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.error(err);
            return;
        }
        // the *entire* stdout and stderr (buffered)
        //   console.log(`stdout: ${stdout}`);
        //   console.log(`stderr: ${stderr}`);
        console.log('created certificate ');
        // pack and sign the extension 
        //  ZXPSignCmd -sign <inputDirectory> <outputZxp> <p12> <p12Password> -tsa <timestampURL>
        exec(`${process.env.ZXPSignCmd_PATH} -sign ${process.env.INPUT_DIRECTORY} ${process.env.OUTPUT_ZXP} ${process.env.CERTIFICATE_OUTPUT_PATH} ${process.env.CERTIFICATE_PASSWORD} -tsa  ${process.env.TIMESTAMPS_URL}`, (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                console.error(err);
                return;
            }
            console.log(`packaged app in ${process.env.OUTPUT_ZXP}`);
        });
    });
});