const path = require('path');

module.exports = {
    entry: './index.main.js',
    mode: 'production',
    target: 'node',
    output: {
        path: path.resolve(__dirname, '.'),
        filename: 'api.bundle.js'
    }
}