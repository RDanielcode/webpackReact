const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const TerserPLugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        alias:{
            '@components': path.resolve(__dirname, 'src/components/'),
            '@styles': path.resolve(__dirname, 'src/styles/')
        }
    },

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            },

            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),

        new MiniCssPlugin({
            filename: '[name].css'
        }),

        new CleanWebpackPlugin(),
    ],

    optimization:{
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new TerserPLugin(),
        ]
    },

    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 3300
    }
}