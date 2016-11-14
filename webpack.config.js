const path = require('path');
const webpack = require('webpack');

const WebpackConfig = {
	entry: {
		app: "./src/app.ts"
	},
	output: {
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		root: [
			path.join(__dirname, 'node_modules')
		],
		extensions: ['', '.ts', '.webpack.js', '.web.js', '.js', '.json']
	},
	target: 'node',
	node: {
		console: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.ts(x?)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'ts-loader'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	}
};

module.exports = WebpackConfig;