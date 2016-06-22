export const SHIP_INFO_UPDATE = 'SHIP_INFO_UPDATE';

export function ship_info_update(data) {
    return {
        type: SHIP_INFO_UPDATE,
        data: data.api_data
    }
}


