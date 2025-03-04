const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/widgets/full-page/'),
        publicPath: '/',
        library: 'MainMenuApp',
        libraryTarget: 'window',
        globalObject: 'this'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                oneOf: [
                    {
                        include: /node_modules[\\/]@jetbrains[\\/]ring-ui/,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    esModule: false,
                                    importLoaders: 1,
                                    modules: {
                                        mode: 'local',
                                        localIdentName: '[local]__[hash:base64:5]',
                                        exportLocalsConvention: 'camelCase'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        use: ['style-loader', 'css-loader']
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'widgets/full-page/index.html'),
            filename: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'manifest.json', to: 'manifest.json' }
            ]
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
        historyApiFallback: true,
        hot: true
    },
    performance: {
        maxAssetSize: 1000000000,
        maxEntrypointSize: 1000000000,
        hints: false
    }
};
