var ComponentPlugin = require("component-webpack-plugin");
module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: __dirname + "/build/js/",
        filename: "bundle.js"
    },
    plugins: [
        new ComponentPlugin()
    ]
    // module: {
    //     loaders: [
    //         { test: /\.css$/, loader: "style!css" }
    //     ]
    // }
};
