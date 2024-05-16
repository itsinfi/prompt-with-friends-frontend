/**
 * format time to mm:ss format
 * 
 * @param {*} seconds 
 * @returns 
 */
function formatTimer(seconds) {
    var date = new Date(seconds * 1000);
    var formatter = new Intl.DateTimeFormat('en', {
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC'
    });

    return formatter.format(date);
}

export default formatTimer