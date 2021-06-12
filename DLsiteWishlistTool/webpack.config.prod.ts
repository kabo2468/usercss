import { config } from './webpack.config';

module.exports = {
    ...config,
    output: {
        filename: 'dlsite-wishlist-tool.js',
        path: `${__dirname}/built`,
    },
};
