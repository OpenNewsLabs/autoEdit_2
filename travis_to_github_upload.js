require('dotenv').config()
// TODO: electron builder might already contain this
// https://www.electron.build/configuration/publish

// takes file to upload as script param
// knows release name & tag name from ENV var

const packageJson = require('./package.json');
const  fetch = require('node-fetch');

var UPLOADTOOL_SUFFIX = packageJson.name;
var  TRAVIS_TAG  = packageJson.version;
console.log('UPLOADTOOL_SUFFIX ',UPLOADTOOL_SUFFIX);

// TEMP Patch for dev, delete following line when done
process.env.TRAVIS_OS_NAME = "osx"

console.log('process.env.TRAVIS_OS_NAME',process.env.TRAVIS_OS_NAME);



var RELEASE_NAME=`${UPLOADTOOL_SUFFIX}-${TRAVIS_TAG}-${process.env.TRAVIS_OS_NAME}`;
var RELEASE_TITLE=`${UPLOADTOOL_SUFFIX} ${TRAVIS_TAG} ${process.env.TRAVIS_OS_NAME}`;

var IS_PRERELEASE= process.env.IS_PRERELEASE;

// :owner/:repo
var TRAVIS_REPO_SLUG = process.env.TRAVIS_REPO_SLUG;
// TEMP place holder, for development, delete subsequent line for production
TRAVIS_REPO_SLUG = 'OpenNewsLabs/autoEdit_2';

console.log('RELEASE_NAME ',RELEASE_NAME);
console.log('RELEASE_TITLE ',RELEASE_TITLE);
// console.log('IS_PRERELEASE ',IS_PRERELEASE);

console.log("------")

// GITHUB: get list of release from githuhb 


    // if the tag name is in the list of releases     
        // GITHUB: delete release
       

    // tag name is not in list of releases

        // GITHUB: create new release
        

    // in both cases - add asset to this release 
   
        // mac
            // ./dist/autoEdit2-1.0.13-mac.zip
        
        // linux
            // ./autoEdit2-1.0.13-x86_64.AppImage

        // windows
            // autoEdit2 1.0.13.exe

        // adobe CEP 
            //npm run adobe-panel-package-sign-build
            // ./dist/com.autoedit2.it.zxp


/**
 * Helper function - get list of release from githuhb 
 * https://developer.github.com/v3/repos/releases/#list-releases-for-a-repository
 * GET /repos/:owner/:repo/releases
 * https://api.github.com/repos/OpenNewsLabs/autoEdit_2/releases
 * .tag_name
 */
function getListOfReleases(TRAVIS_REPO_SLUG){
    
    fetch(`https://api.github.com/repos/${TRAVIS_REPO_SLUG}/releases`)
    .then((res) =>{
        return res.text();
    })
    .then( (body) =>{
        return JSON.parse(body)
    })
    .then( (releases) =>{
        // returns array of releases
        // do something with releases
        releases.forEach(individualRelease => {
        if(individualRelease.tag_name === RELEASE_NAME){
            //    console.log('true');
            return true;
        }else{
            //    console.log('false');
            return false;
        }
        });
    });
}

/**
 * Helper function - create new release
 * https://developer.github.com/v3/repos/releases/#create-a-release
 * POST /repos/:owner/:repo/releases
 */
function createNewRelease(RELEASE_NAME,TRAVIS_REPO_SLUG){
    var body = { 
        tag_name: RELEASE_NAME,
        target_commitish: 'master',
        name: 'test prerelease draft',
        body: 'some text for body',
        draft: true,
        prerelease: true
    };
    fetch(`https://api.github.com/repos/${TRAVIS_REPO_SLUG}/releases`, { 
        method: 'POST',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json',
        // https://help.github.com/articles/authorizing-a-personal-access-token-for-use-with-a-saml-single-sign-on-organization/
                    'Authorization': `token ${process.env.GITHUB_TOKEN}` }
        }).then(res => res.json())
        .then((release) =>{

            // return upload url for uploading binary to release
            // as well as release id
            console.log('test',release.upload_url, release.id)
        });
}
/**
 * Helper funciton - add assets to a release
 * https://developer.github.com/v3/repos/releases/#upload-a-release-asset
 */

 function adAssetsToRelease(upload_url,TRAVIS_REPO_SLUG,RELEASE_ID){
    var body = { 
        tag_name: RELEASE_NAME,
        target_commitish: 'master',
        name: 'test prerelease draft',
        body: 'some text for body',
        draft: true,
        prerelease: true
    };
    fetch(`https://${upload_url}/repos/${TRAVIS_REPO_SLUG}/releases/${RELEASE_ID}/assets?name=${assetName}`, { 
        method: 'POST',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json',
        // https://help.github.com/articles/authorizing-a-personal-access-token-for-use-with-a-saml-single-sign-on-organization/
                    'Authorization': `token ${process.env.GITHUB_TOKEN}` }
        }).then(res => res.json())
        .then((json) =>{

            // get upload url for uploading binary to release
            console.log('test',json.upload_url)
        });
}

/**
 * Helper funciton -delete release
 * https://developer.github.com/v3/repos/releases/#delete-a-release
 */

 function deleteRelease(){

 }