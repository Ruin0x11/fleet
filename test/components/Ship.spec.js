/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import { spy } from 'sinon';
import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import Counter from '../../app/components/Ship';

function setup() {
  const actions = {
    increment: spy(),
    incrementIfOdd: spy(),
    incrementAsync: spy(),
    decrement: spy()
  };
  const component = renderIntoDocument(<Counter counter={1} {...actions} />);
  return {
    component,
    actions,
    buttons: scryRenderedDOMComponentsWithTag(component, 'button').map(button => button),
    p: findRenderedDOMComponentWithClass(component, 'counter')
  };
}
