export const PORT_UPDATE = 'PORT_UPDATE';

export function port_update(data) {
    return {
        type: PORT_UPDATE,
        data: data
    }
}
