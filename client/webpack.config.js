const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let copyWebpackPlugin = new CopyWebpackPlugin([{ from: './static', to: "./" }]);

//  Creates the html boilerplate. For details take a look at:
//  https://www.npmjs.com/package/html-webpack-plugin#
let htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: 'edition bohemica',
    template: 'src/index.html',
    meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        charset: "UTF-8",
        'http-equiv': "X-UA-Compatible",
        content: "ie=edge"
    }
});

let cleanWebpackPlugin = new CleanWebpackPlugin(["build"]);
let environmentPlugin = new webpack.EnvironmentPlugin({
    "NODE_ENV": "development", 
    "npm_config_buildNumber": "9590"
});

module.exports = {
    node: {
        net: 'empty'
    },
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        // publicPath: '/',
        filename: 'app.js'
    },   
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },            
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        cleanWebpackPlugin,
        htmlWebpackPlugin,
        environmentPlugin,
        copyWebpackPlugin
    ]
};

switch( process.env.NODE_ENV ) {
    case 'production':
        module.exports.devtool = '#source-map';

        // http://vue-loader.vuejs.org/en/workflow/production.html
        module.exports.plugins = (module.exports.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ]);
    break;
    case 'development': break;
    case 'staging': break;  
    case 'reference': break;
    default: console.error(`Unknown environment '${process.env.NODE_ENV}'!`);
}
