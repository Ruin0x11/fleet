import { expect } from 'chai';
import shipInfoReducer from '../../app/reducers/shipInfo';
import { SHIP_INFO_UPDATE } from '../../app/actions/shipInfo';

function setup() {
    const shipInfo = require('../mocks/shipInfoMock.json');
    return {
        shipInfo
    };
}

describe('reducers', () => {
    describe('portReducer', () => {
        it('should handle initial state', () => {
            expect(shipInfoReducer(undefined, {})).to.eql({});
        });

        it('should handle SHIP_INFO_UPDATE', () => {
            const { shipInfo } = setup()
            expect(shipInfoReducer({}, { type: SHIP_INFO_UPDATE, data: shipInfo })).to.eql({
                "1": {
                    "id": 1,
                    "name": "\u7766\u6708",
                    "maxFuel": 15,
                    "maxAmmo": 15
                }
            });
        });

        it('should handle unknown action type', () => {
            expect(shipInfoReducer({}, { type: 'unknown' })).to.eql({});
        });
    });
});
