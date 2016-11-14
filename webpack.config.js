const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
	.filter((x) => {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach((mod) => {
		nodeModules[mod] = 'commonjs ' + mod;
	});

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
	externals: nodeModules,
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