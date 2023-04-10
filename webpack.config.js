<<<<<<< HEAD
=======

>>>>>>> 3fd06be171bdc574686258adc558d2ceb3d95bdc
"use strict"
const webpack = require("webpack")
module.exports = {
    module: {
<<<<<<< HEAD
        rules:[
            {
                test:/\.js$/,
=======
        rules: [
            {
                test:/\.js/,
>>>>>>> 3fd06be171bdc574686258adc558d2ceb3d95bdc
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