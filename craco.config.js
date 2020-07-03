const CracoLessPlugin = require('craco-less');
const { ChangeJsFilename, ChangeCssFilename} = require('@navikt/craco-plugins');

module.exports = {
    plugins: [
        {plugin: CracoLessPlugin},
        {plugin: ChangeCssFilename},
        {plugin: ChangeJsFilename}
    ]
};
