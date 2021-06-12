import { config } from './webpack.config';

module.exports = {
    ...config,
    devtool: 'source-map',
    output: {
        filename: 'dlsite-wishlist-tool-dev.js',
        path: `${__dirname}/built`,
    },
};
