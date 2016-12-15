export default {
    prettify(milliseconds) {
        let prettyTime;

        if (milliseconds > 999) {
            prettyTime = `${(milliseconds / 1000).toFixed(2)} s`;
        } else {
            prettyTime = `${milliseconds} ms`;
        }
        return prettyTime;
    },
};
