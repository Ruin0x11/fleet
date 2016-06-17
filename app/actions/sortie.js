const SORTIE_UPDATE = exports.SORTIE_UPDATE = 'SORTIE_UPDATE';

exports.sortie_update = sortie_update
function sortie_update(data) {
    return {
        type: SORTIE_UPDATE,
        data: data
    }
}

