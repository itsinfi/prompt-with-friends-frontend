/**
 * filter results to only contain the latest result per player
 * 
 * @param {*} results array of all results (including older ones by player per round)
 * @param {*} players array of players in session
 * @returns 
 */
function filterLatestResults(results, players) {

    // check if results are null or undefined
    if (results === null || undefined) {
        return []
    }

    // check every player:
    // 1. filter every result of player
    // 2. sort it by timestamp in descending order
    // 3. only return the newest result
    const latestResults = players.map(player => {
        const playerResults = results
            .filter(result => result.playerNumber === player.playerNumber)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort in descending order by timestamp
        
        return playerResults[0];
    });

    // filter for undefined values (happens when there is no result for a player in a round)
    return latestResults.filter(result => result !== undefined)
}

export default filterLatestResults