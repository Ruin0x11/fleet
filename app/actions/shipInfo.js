const SHIP_INFO_UPDATE = exports.SHIP_INFO_UPDATE = 'SHIP_INFO_UPDATE';

exports.ship_info_update = ship_info_update
function ship_info_update(data) {
    return {
        type: SHIP_INFO_UPDATE,
        data: data
    }
}


