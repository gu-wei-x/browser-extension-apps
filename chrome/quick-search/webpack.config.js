const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

// webpack --mode development
module.exports = [
    {
        name: 'css',
        entry: { menu_theme: './src/css/menu_theme.css' },
        output: {
            path: path.resolve(__dirname, "dist/quick-search/css")
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css"
            }),
            new CleanWebpackPlugin({
                cleanAfterEveryBuildPatterns: [path.join(__dirname, "dist/quick-search/css/*.js")],
            })
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
            ],
        },
        optimization: {
            minimizer: [new CssMinimizerPlugin({})],
        },
        mode: 'production'
    },
    {
        name: 'js',
        entry: {
            content: './src/js/content.js',
            background: './src/js/background.js',
            options: './src/js/options.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist/quick-search/js'),
            filename: '[name].js',
        },
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: "./src/html", to: path.resolve(__dirname, 'dist/quick-search/html') },
                    { from: "./src/images", to: path.resolve(__dirname, 'dist/quick-search/images') },
                    { from: "./src/_locales", to: path.resolve(__dirname, 'dist/quick-search/_locales') },
                    { from: "./src/manifest.json", to: path.resolve(__dirname, 'dist/quick-search/manifest.json') },
                ],
            }),
        ]
    }
];