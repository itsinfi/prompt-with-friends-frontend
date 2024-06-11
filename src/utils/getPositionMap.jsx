/**
 * returns a map of positions based on score value
 * key: playerNumber of player
 * value: position
 * 
 * @param {*} players list of players 
 * @returns 
 */
function getPositionMap(players) {

    if (players.length === 0) {
        return
    }

    // define position map
    let positionMap = new Map()
        
    // sort players by score
    players = players.sort((player1, player2) => player2.score - player1.score)

    // position counter
    let positionCounter = 1

    // previousScore
    let previousScore = players[0].score

    // set map by itertating through sorted array
    for (let i = 0; i < players.length; i++) {

        // handle multiple players with same score can have the same position
        if (previousScore !== players[i].score) {
            positionCounter++
        }

        // assign position to player
        positionMap.set(players[i].playerNumber, positionCounter)
    }

    // return position map
    return positionMap

}

export default getPositionMap