import env from '../../libs/env';

export default {
    configFile: 'system.config.js',

    buildOptions: {
        minify: false,
        mangle: false,
        sourceMaps: env.isDevelopment,
    },
};
