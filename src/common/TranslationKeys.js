const fs = require('fs');
const path = require('path');

/*This function returns true only if the keys of all the json files
  for all three languages are equal */
export function compareJsonKeys(){
    const pathEN = '../../public/locales/en-GB';
    const pathNN = '../../public/locales/nn-NO';
    const pathNB = '../../public/locales/nb-NO';
    const directoryPathToNB = path.resolve("./public/locales/nb-NO");
    const fileList = fs.readdirSync(directoryPathToNB);

    return fileList.every(function (file) {
        const checkEN = compareKeysForTwoFiles(pathNB + '/' + file, pathEN + '/' + file);
        const checkNN = compareKeysForTwoFiles(pathNB + '/' + file, pathNN + '/' + file);

        return !(checkEN === false || checkNN === false);
    });
}

/*  This function returns true if all keys of json file1 and file2 are equal */
export const compareKeysForTwoFiles = (file1Path, file2Path) =>{
    let json1 = require(file1Path);
    let json2 = require(file2Path);
    const keysJson1 = Object.keys(json1);
    const keysJson2 = Object.keys(json2);
    if(keysJson1.length === keysJson2.length){
        return keysJson2.every(i => keysJson1.includes(i));
    }else
        return false;
};

