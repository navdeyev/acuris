import appActions, {appActionTypes} from './appActions';

describe('appActions', () => {

  it('updateCompanyName creates UPDATE_COMPANY_NAME action', () => {
    const company = 'sony';
    expect(appActions.updateCompanyName(company)).toEqual({
      type: appActionTypes.UPDATE_COMPANY_NAME, payload: company
    });
  });

  it('applyFilter creates APPLY_FILTER action', () => {
    const companyName = 'sony';
    const pageNumber = 1;
    expect(appActions.applyFilter(companyName, pageNumber)).toEqual({
      type: appActionTypes.APPLY_FILTER,
      payload: {companyName, pageNumber}
    });
  });

});