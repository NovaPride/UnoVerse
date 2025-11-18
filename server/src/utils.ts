import type { BasePlayer, Player } from "@shared/types/game";

export function transformPlayer(player: BasePlayer): Player {
  const newPlayer: BasePlayer = structuredClone(player);
  Object.assign(newPlayer, { cardIds: [] });

  return newPlayer as Player;
}
