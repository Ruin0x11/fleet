export const SORTIE_NEXT_UPDATE = 'SORTIE_NEXT_UPDATE';

export function sortie_next_update(data) {
    return {
        type: SORTIE_NEXT_UPDATE,
        data: data.api_data
    }
}
