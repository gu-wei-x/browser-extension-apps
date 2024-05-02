const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = [
    {
        name: 'content-scripts',
        entry: './js/main.js',
        output: {
            path: path.resolve(__dirname, 'dist/quick-search/js'),
            filename: 'contents.js',
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
                    { from: "images", to: path.resolve(__dirname, 'dist/quick-search/images') },
                    { from: "settings.html", to: path.resolve(__dirname, 'dist/quick-search/settings.html') },
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