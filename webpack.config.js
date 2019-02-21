const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
    entry: {
        "index": "./src/js/index.js",
        "about": "./src/js/about.js"
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]), //清除dist文件夹
        new HtmlWebpackPlugin({
            filename: "index.html", //文件名
            chunks: ["index"], //添加引入的js,也就是entry中的key
            hash: true, //向html引入的src链接后面增加一段hash值,消除缓存
            minify: {
                collapseWhitespace: false //折叠空白区域 也就是压缩代码
            },
            title: "Output Management", //title
            template: "./src/index.html" //模板地址
        }),
        new HtmlWebpackPlugin({
            filename: "about.html",
            chunks: ["about"],
            hash: true,
            minify: {
                collapseWhitespace: false
            },
            title: "第二个页面",
            template: "./src/about.html"
        })
    ],
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
            }
        ]
    }
};