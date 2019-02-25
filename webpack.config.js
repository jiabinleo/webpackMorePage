const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack')

var page = ['index', 'about']
var moduleEntry = {}
var moduleHtmlWebpackPlugin = []
page.forEach((item, index) => {
    moduleEntry[item] = path.resolve(__dirname, `./src/js/${item}.js`)
    moduleHtmlWebpackPlugin.push(new HtmlWebpackPlugin({
        filename: `${item}.html`, //文件名
        chunks: [`${item}`], //添加引入的js,也就是entry中的key
        hash: true, //向html引入的src链接后面增加一段hash值,消除缓存
        minify: {
            collapseWhitespace: false, //折叠空白区域 也就是压缩代码
            removeComments: true
        },
        title: "测试页面", //title
        template: `./src/${item}.html` //模板地址
    }))
})
moduleHtmlWebpackPlugin.push(new CleanWebpackPlugin(["dist"])) //清除dist文件夹
moduleHtmlWebpackPlugin.push(new webpack.NamedModulesPlugin())
moduleHtmlWebpackPlugin.push(new webpack.HotModuleReplacementPlugin())

module.exports = {
    mode: 'production',
    entry: moduleEntry,
    plugins: moduleHtmlWebpackPlugin,
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
            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ] /*  */
    }
};