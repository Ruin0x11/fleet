import { SHIP_INFO_UPDATE } from '../actions/shipInfo';

const initialState = {
    shipInfo: {}
}

function getShipInfo(ship) {
    return {
        id: ship.api_id,
        name: ship.api_name,
        maxFuel: ship.api_fuel_max,
        maxAmmo: ship.api_bull_max
    }
}

function getShipNameList(data) {
    var mstShipList = data.api_data.api_mst_ship;
    return mstShipList.reduce((acc, ship) => {
        var info = getShipInfo(ship);
        acc[info.id] = info;
        return acc;
    }, {});
}

export default function shipInfoReducer(state = initialState, action) {
    switch (action.type) {
    case SHIP_INFO_UPDATE:
        return getShipNameList(action.data);
    default:
        return state;
    }
}
