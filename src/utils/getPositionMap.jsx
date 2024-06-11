/**
 * returns a map of positions based on score value
 * key: playerNumber of player
 * value: position
 * 
 * @param {*} players list of players 
 * @returns 
 */
function getPositionMap(players) {

    // define position map
    let positionMap = new Map()
    
    // sort players by score
    players = players.sort((player1, player2) => player1.score < player2.score)

    // set map by itertating through sorted array
    for (let i = 0; i < players.length; i++) {
        positionMap.set(players[i].playerNumber, i + 1)
    }

    // return position map
    return positionMap

}

export default getPositionMap