export const SORTIE_START_UPDATE = 'SORTIE_START_UPDATE';

export function sortie_start_update(data) {
    return {
        type: SORTIE_START_UPDATE,
        data: data.api_data
    }
}
