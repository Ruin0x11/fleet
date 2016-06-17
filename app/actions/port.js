const PORT_UPDATE = exports.PORT_UPDATE = 'PORT_UPDATE';

exports.port_update = port_update
function port_update(data) {
    return {
        type: PORT_UPDATE,
        data: data
    }
}


