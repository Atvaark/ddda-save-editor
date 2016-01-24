var path = require('path');



module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: path.resolve(__dirname, "src")
            }
        ]
    }
};