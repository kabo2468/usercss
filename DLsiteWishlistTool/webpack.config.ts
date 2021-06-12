import WebpackUserScript from 'webpack-userscript';

export const config = {
    context: __dirname,
    cache: true,
    entry: './src/index.ts',
    output: {
        filename: 'dlsite-wishlist-tool-dev.js',
        path: `${__dirname}/built`,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'esbuild-loader',
                exclude: /node_modules/,
                options: {
                    loader: 'ts',
                    // target: 'ES2019',
                },
            },
        ],
    },
    plugins: [
        new WebpackUserScript({
            headers: './meta.json',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
