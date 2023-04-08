"use strict"
const webpack = require("webpack")
module.exports = {
    module: {
        rules: [
            {
                test:/\.js/,
                exclude:/node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        ]
    },
    resolve: {
        alias: { 
            "pg-native":"./dummy.js"

        }
    },
    plugins:[
        new webpack.IgnorePlugin({resourceRegExp: /^pg-native$/})
    ],
    target: "node"
}