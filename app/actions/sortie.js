export const SORTIE_UPDATE = 'SORTIE_UPDATE';

export function ship_info_update(data) {
    return {
        type: SORTIE_UPDATE,
        data: data
    }
}

