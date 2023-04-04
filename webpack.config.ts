import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { Configuration } from "webpack";

const paths = {
	src: path.join(__dirname, "src"),
	dest: path.join(__dirname, "static")
}

export default (_env: unknown, argv: any): Configuration => {
	const mode = argv.mode === "production" ? "production" : "development";

	console.log(`\x1b[34mBundling this project...\n\x1b[36m - Mode: ${argv.mode ?? `not specified, default to '${mode}'`}\x1b[0m\n`);

	return {
		stats: mode === "production" ? "summary" : "normal",
		mode,
		entry: [path.join(paths.src, "ts/main.ts"), path.join(paths.src, "scss/main.scss")],
		output: {
			filename: path.join("js", "[name].js"),
			path: paths.dest,
			clean: true
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "css/[name].css",
				chunkFilename: "css/[id].css",
			}),
			new CopyWebpackPlugin({
				patterns: [
					{ from: path.join(paths.src, "fonts"), to: path.join(paths.dest, "fonts") },
					{ from: path.join(paths.src, "img"), to: path.join(paths.dest, "img") },
					{ from: path.join(paths.src, "data"), to: path.join(paths.dest, "data") }
				]
			})
		],
		resolve: {
			extensions: [".tsx", ".ts", ".jsx", ".js"],
			alias: {
				"@": path.resolve(paths.src, "ts")
			}
		},
		optimization: {
			runtimeChunk: "single",
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all"
					}
				}
			}
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/i,
					use: [{ loader: "ts-loader" }]
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: "css-loader",
							options: {
								url: false
							}
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: true,
							}
						}
					]
				}
			]
		}
	}
}