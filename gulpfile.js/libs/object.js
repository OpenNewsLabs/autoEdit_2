export default {
    getDeepCopy(obj) {
            return JSON.parse(JSON.stringify(obj));
        },

        ensureArray(array) {
            let arr;

            if (typeof array === 'undefined') {
                arr = [];
            }
            if (array.constructor !== Array) {
                arr = [array];
            }
            return arr;
        },

        stringify(obj) {
            let objStringified;

            try {
                objStringified = JSON.stringify(obj);
            } catch (e) {
                objStringified = obj;
            }
            return objStringified;
        },
};
