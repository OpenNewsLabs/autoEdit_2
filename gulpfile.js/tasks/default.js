import gulp from 'gulp';
import runSequence from 'run-sequence';
import enabledTasks from '../enabledTasks';
import taskHelper from '../libs/taskHelper';

gulp.task('default', cb => {
    const taskSets = [
        enabledTasks.beforeCode,
        enabledTasks.code,
        enabledTasks.afterCode,
    ];
    const sequence = taskHelper.combineTasksSetsToGulpTaskSequence(taskSets);

    if (sequence.length) {
        sequence.push(cb);
        runSequence(...sequence);
    } else {
        cb();
    }
});
