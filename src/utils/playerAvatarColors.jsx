//colors to use for players
const playerAvatarColors = new Map([
    [0, 'var(--error)'],[1, '#B070CC'],[2, '#65ADD7'], [3, 'var(--success)'], [4, 'var(--warning)'],
])

/**
 * get color to use for the player avatar based on id
 * 
 * @param {*} playerID id of player
 * @returns color as a string value to use for css
 */
function getPlayerAvatarColor(playerID) {
    const index = playerID % playerAvatarColors.size
    return playerAvatarColors.get(index)
}

export default getPlayerAvatarColor