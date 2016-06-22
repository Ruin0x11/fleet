export const BATTLE_RESULT_UPDATE = 'BATTLE_RESULT_UPDATE';

export function battle_result_update(data) {
    return {
        type: BATTLE_RESULT_UPDATE,
        data: data.api_data
    }
}
