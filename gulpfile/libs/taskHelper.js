'use strict';

module.exports = {
    // Get from given task sets a valid input for gulp-sequence
    // by flattening the sets but still leaving the expected execution order.
    //
    // Example 1
    // -- 3 task sets each having parallel executable tasks):
    // taskSets = [['eslint'], ['sass', 'webpack'], ['postcss']]
    // => [['eslint'], ['sass', 'webpack'], ['postcss']]
    // Example 2
    // -- 3 task sets with the last having executable tasks that must remain in order
    // -- effectively ending up with 4 task sets
    // taskSets = [['eslint'], ['sass', 'webpack'], [['concatcss'], ['postcss']]]
    // =>  [['eslint'], ['sass', 'webpack'], ['concatcss'], ['postcss']]
    combineTasksSetsToGulpTaskSequence(taskSets) {
        const sequence = [];

        for (let i = 0, len = taskSets.length; i < len; i++) {
            const taskSet = taskSets[i];

            // no tasks given in the taskset
            // => nothing to add to the sequence
            if (!taskSet.length) {
                continue;
            }
            if (taskSet[0].constructor === Array) {
                for (let j = 0, lenTaskSet = taskSet.length; j < lenTaskSet; j++) {
                    const task = taskSet[j];
                    if (task.constructor === Array) {
                        sequence.push(task);
                    } else {
                        sequence.push([task]);
                    }
                }
            } else {
                sequence.push(taskSet);
            }
        }
        return sequence;
    },
};
