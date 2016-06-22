export const DOCK_UPDATE = 'DOCK_UPDATE';

export function dock_update(data) {
    return {
        type: DOCK_UPDATE,
        data: data.api_data
    }
}
