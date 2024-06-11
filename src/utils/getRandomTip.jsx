
/**
 * get a random tip for the task
 * 
 * @param {*} tips list of tips
 */
function getRandomTip(tips) {
    
    // if tips are null, undefined or empty, return an empty string
    if (!tips || tips === undefined || tips.length === 0) {
        return ''
    }

    // if there is only one entry, return that entry
    if (tips.length === 1) {
        return tips[0]
    }


    // generate random number based on array lenght
    const randomValue = Math.round(Math.random() * (tips.length - 1));
    
    // return a random tip
    return tips[randomValue]
}

export default getRandomTip