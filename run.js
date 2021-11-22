const concurrently = require('concurrently');

let args = process.argv.slice(2);
let filename = args.length > 0 ? args[0] : "mock.json";

concurrently(
    [
        { command: 'npm:start', prefixColor: 'blue', name: 'pensjon-selvbetjening-opptjening' },
        { command: 'json-server --port 4000 --watch dev/' + filename, prefixColor: 'magenta', name: 'json-server' }
    ],
    {
        killOthers: ['failure', 'success']
    }
);
