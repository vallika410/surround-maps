const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

var config = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './app/main.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        modules: [
            'node_modules',
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        port: 8700,
        inline: true,
        hot: true,
        watchContentBase: true,
        open: true
    },
    plugins: [
        new DashboardPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(mod, count) {
                // Don't include things under '/src' folder
				return mod.resource && mod.resource.indexOf(path.resolve(__dirname, 'src')) === -1;
            },
        }),
        new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
            'window.jQuery': 'jquery'
		}),
        new webpack.ProvidePlugin({
			ko: 'knockout',
		}),
        new webpack.ProvidePlugin({
			Hammer: 'hammerjs',
		}),
        
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.js/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: ['es2015'] },
                    },
                ],
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract( {
                    fallbackLoader: 'style-loader',
                    loader: [ { loader: 'css-loader', options: { modules: true} },  ],
                }),
            },
            {
				test: /\.(jpg|png|gif|svg)$/,
				loader: [
					{
						loader: 'url-loader',
						query: {
							limit: 2000,
							name: 'assets/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(ico|woff|eot|woff2|ttf)$/,
				loader: [
					{
						loader: 'url-loader',
						query: {
							limit: 1,
							name: 'assets/[name].[ext]'
						}
					}
				]
			}
        ]
    },
};

module.exports = config;