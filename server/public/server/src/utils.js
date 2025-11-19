export function transformPlayer(player) {
    const newPlayer = structuredClone(player);
    Object.assign(newPlayer, { cardIds: [] });
    return newPlayer;
}
