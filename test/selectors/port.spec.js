import { expect } from 'chai';
import shipInfoReducer from '../../app/reducers/shipInfo';
import portReducer from '../../app/reducers/port';
import { PORT_UPDATE } from '../../app/actions/port';
import { SHIP_INFO_UPDATE } from '../../app/actions/shipInfo';

import { getDockInfo } from '../../app/selectors/port.js'

function setup() {
    const shipInfo = require('../mocks/shipInfoMock.json');
    const portData = require('../mocks/portDataMock.json');
    const state = {
        shipInfo: shipInfoReducer({}, { type: SHIP_INFO_UPDATE, data: shipInfo }),
        portData: portReducer(shipInfo, { type: PORT_UPDATE, data: portData })
    }
    return {
        state
    };
}

describe('selectors', () => {
    describe('getDockInfo', () => {
        it('should retrieve docked ship information', () => {
            const { state } = setup();
            var result = getDockInfo(state);
            expect(result[0].state).to.eql(1);
            expect(result[0].shipName).to.eql("\u7766\u6708");
            var expected = new Date(1465890757923)
            expect(result[0].completionDate.getTime()).to.eql(expected.getTime())
        });
    });
});
