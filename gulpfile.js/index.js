import paths from './paths';
import path from 'path';
const _defaultTasks = ['default'];
import {all as allEnabledTasks} from './enabledTasks';

// 1. Setup reference to frontBaseDir
paths.frontendBaseDir = path.join(__dirname, '..');

// 2. Setup loggers
//require('./loggers/buildData');
//require('./loggers/webpack');

// 3. Require all default and enabled task FILES
// and thus setup the gulp tasks
_defaultTasks.concat(allEnabledTasks).forEach(task => {
    require(`./tasks/${task}`);
});
// if no task was configured when gulp was executed,
// the default task (tasks/default.js) is called
