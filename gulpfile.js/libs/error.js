import gutil from 'gulp-util';
import notify from 'gulp-notify';
import _ from 'underscore';
import env from './env';
import { stringify } from './object';
import { ensureArray } from './object';

const _defaultOptions = {
    keys: {
        details: 'details',
        message: 'message',
        subtitle: 'subtitle',
    },
    makesBuildFail: true,
    notify: true,
    output: false,
    task: '',
};

function _normalizeErrorMessage(error, keys) {
    const normalizedError = {
        message: error,
        subtitle: '',
    };

    if (error.hasOwnProperty(keys.subtitle)) {
        normalizedError.subtitle = error[keys.subtitle];
    }

    if (error.hasOwnProperty(keys.message)) {
        normalizedError.message = `\n${error[keys.message]}`;
    }
    if (error.hasOwnProperty(keys.details)) {
        normalizedError.message += [
            '',
            '--------',
            'Details',
            error[keys.details],
        ].join('\n');
    }
    return normalizedError;
}

export default {
    handle(errors, options) {
        const opt = _.extendOwn({}, _defaultOptions, options);
        const err = ensureArray(errors);

        if ((env.isPrecommit || env.isProduction) && opt.makesBuildFail) {
            gutil.log(gutil.colors.red('--------'));
            gutil.log(gutil.colors.red('ERROR IN FRONTEND BUILD'));
            gutil.log(gutil.colors.red('--------'));
            gutil.log(gutil.colors.red(stringify(err)));
            gutil.log(gutil.colors.red(err));
            process.exit(1);
            return;
        }

        err.forEach(function(error) {
            const normalizedError = _normalizeErrorMessage(error, opt.keys);

            if (opt.notify) {
                notify.onError({
                    title: `${opt.task.toUpperCase()} error`,
                    message: normalizedError.message,
                    subtitle: normalizedError.subtitle,
                    sound: 'Submarine',
                }).apply(this, err);
            }
            if (opt.output) {
                gutil.log(gutil.colors.red(`${stringify(normalizedError)}`));
            }
        });
    },
};
