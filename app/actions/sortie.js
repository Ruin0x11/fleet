export const BATTLE_UPDATE = 'BATTLE_UPDATE';

export function battle_update(data) {
    return {
        type: BATTLE_UPDATE,
        data: data
    }
}
