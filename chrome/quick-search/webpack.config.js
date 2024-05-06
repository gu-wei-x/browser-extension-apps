const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

// webpack --mode development
module.exports = [
    {
        entry: { menu_theme: './css/menu_theme.css' },
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
        name: 'content-scripts',
        entry: './js/content.js',
        output: {
            path: path.resolve(__dirname, 'dist/quick-search/js'),
            filename: 'content.js',
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
                    { from: "html", to: path.resolve(__dirname, 'dist/quick-search/html') },
                    { from: "images", to: path.resolve(__dirname, 'dist/quick-search/images') },
                    { from: "manifest.json", to: path.resolve(__dirname, 'dist/quick-search/manifest.json') },
                ],
            }),
        ],
    },
    {
        name: 'background-scripts',
        entry: './js/background.js',
        output: {
            path: path.resolve(__dirname, 'dist/quick-search/js'),
            filename: 'background.js',
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
        }
    },
    {
        name: 'settings',
        entry: './js/options.js',
        output: {
            path: path.resolve(__dirname, 'dist/quick-search/js'),
            filename: 'options.js',
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
        }
    },
];