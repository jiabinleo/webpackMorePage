const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack')
module.exports = {
    entry: {
        index: path.resolve(__dirname, `./src/index/index.js`),
        about: path.resolve(__dirname, `./src/about/about.js`)
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]), //清除dist文件夹
        new HtmlWebpackPlugin({
            filename: `index.html`, //文件名
            chunks: [`index`], //添加引入的js,也就是entry中的key
            hash: true, //向html引入的src链接后面增加一段hash值,消除缓存
            minify: {
                collapseWhitespace: false //折叠空白区域 也就是压缩代码
            },
            title: "Output Management", //title
            template: `./src/index/index.html` //模板地址
        }),
        new HtmlWebpackPlugin({
            filename: `about.html`, //文件名
            chunks: [`about`], //添加引入的js,也就是entry中的key
            hash: true, //向html引入的src链接后面增加一段hash值,消除缓存
            minify: {
                collapseWhitespace: false //折叠空白区域 也就是压缩代码
            },
            title: "Output Management", //title
            template: `./src/about/about.html` //模板地址
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist', //实时重新加载
        hot: true
    },
    output: {
        filename: "js/[name].[hash:7].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "[name][hash:7].[ext]",
                    fallback: "file-loader",
                    outputPath: "images"
                }
            }]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.vdt$/,
            use: [{
                loader: 'babel-loader',
            }, {
                loader: 'vdt-loader',
            }]
        },
        {
            test: /\.art$/,
            loader: "art-template-loader",
            options: {
                // art-template options (if necessary)
                // @see https://github.com/aui/art-template
            }
        }
        ] /*  */
    }
};