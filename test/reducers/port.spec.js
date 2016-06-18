import { expect } from 'chai';
import portReducer from '../../app/reducers/port';
import { PORT_UPDATE } from '../../app/actions/port';
import { SORTIE_UPDATE } from '../../app/actions/sortie';

function setup() {
    const shipInfo = require('../mocks/shipInfoMock.json');
    const portData = require('../mocks/portDataMock.json');
    const sortieData = require('../mocks/sortieDataMock.json')
    return {
        shipInfo,
        portData
    };
}

describe('reducers', () => {
    describe('portReducer', () => {
        it('should handle initial state', () => {
            expect(portReducer(undefined, {})).to.equal(0);
        });

        it('should handle PORT_UPDATE', () => {
            var result = portReducer({}, { type: PORT_UPDATE, data: shipInfo })
            var ships = result.api_ship
            expect(ships[0].api_id).to.equal(1);
            expect(ships[0].api_nowhp).to.equal(30);
            expect(ships[0].api_maxhp).to.equal(30);
            expect(ships[0].api_lv).to.equal(10);
            expect(ships[0].api_cond).to.equal(80);
        });

        it('should handle SORTIE_UPDATE', () => {
            var ships = result.api_ship
            expect(ships[0].api_nowhp).to.equal(30);
            var result = portReducer(portData, { type: SORTIE_UPDATE, data: sortieData })
            ships = result.api_ship
            // there are a total of 6 stages, each of which do 1 damage to the first ship
            expect(ships[0].api_nowhp).to.equal(24);
        });

        it('should handle unknown action type', () => {
            expect(portReducer({}, { type: 'unknown' })).to.equal({});
        });
    });
});
