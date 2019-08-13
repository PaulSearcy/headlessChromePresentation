const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/Client.js",
    mode: "development",
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    "presets": [
                        ["@babel/preset-env",{
                            "targets": {
                                "chrome": "76"
                            }
                        }],
                        "@babel/preset-react"
                    ]
                }
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    }
};
