'use strict';
const tagStripIndent = require('common-tags').stripIndent;
const argv = require('yargs');

let _nodeEnv;

const env = {
    get isPrecommit() {
        return _nodeEnv === 'pre-commit';
    },

    get isDevelopment() {
        return _nodeEnv === 'development';
    },

    get isProduction() {
        return _nodeEnv === 'production';
    },

    getVar(envVar) {
        if (typeof process.env[envVar] !== 'undefined') {
            return process.env[envVar];
        }
        if (typeof argv[envVar] !== 'undefined') {
            return argv[envVar];
        }
        const errorMsg = tagStripIndent `

                -- ERROR IN GULP SCRIPT
                Property '${envVar}' does not exist in 'process.env'
                nor is it passed as an argument to the process.

                -- Content of process.env
                ${JSON.stringify(process.env)}

                -- Passed arguments to gulp script
                ${JSON.stringify(argv)}
            `;
        throw new ReferenceError(errorMsg);
    },
};

try {
    _nodeEnv = env.getVar('NODE_ENV');
} catch (e) {
    // default environment is production
    _nodeEnv = 'production';
}

module.exports = env;
