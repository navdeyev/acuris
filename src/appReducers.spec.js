import {companyName, page} from './appReducers';
import {appActionTypes} from './appActions';
import Page from './Page';
import filterService from './filterService';

describe('companyName', () => {

  it('returns empty string by default', () => {
    expect(companyName(undefined, {})).toBe('');
  });

  it('return action payload on UPDATE_COMPANY_NAME', () => {
    const action = {type: appActionTypes.UPDATE_COMPANY_NAME, payload: 'sony'};
    expect(companyName('', action)).toBe('sony');
  });

  it('leaves state unchanged on any other action', () => {
    const action = {type: appActionTypes.APPLY_FILTER};
    expect(companyName('sony', action)).toBe('sony');
  });

});

describe('page', () => {

  it('returns empty page by default', () => {
    expect(page(undefined, {})).toEqual(new Page());
  });

  it('calls applyFilteringAndPaging on APPLY_FILTER', () => {
    filterService.applyFilteringAndPaging = jest.fn();

    const action = {
      type: appActionTypes.APPLY_FILTER,
      payload: {companyName: 'sony', pageNumber: 0}
    };

    page(new Page(), action);

    expect(filterService.applyFilteringAndPaging).toHaveBeenCalledWith('sony', 0);
  });

  it('leaves state unchanged for any other action ', () => {
    const currentState = new Page([{id: 1, name: 'name'}], 1, 0);
    expect(page(currentState, {type: appActionTypes.UPDATE_COMPANY_NAME})).toEqual(currentState);
  });

});