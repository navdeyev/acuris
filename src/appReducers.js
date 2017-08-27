import {combineReducers} from 'redux';
import {appActionTypes} from './appActions';
import filterService from './filterService';
import Page from './Page';

export const companyName = (state = '', action) => {
  if (appActionTypes.UPDATE_COMPANY_NAME === action.type) {
    return action.payload;
  }
  return state;
};

export const page = (state = new Page(), action) => {
  if (appActionTypes.APPLY_FILTER === action.type) {
    return filterService.applyFilteringAndPaging(action.payload.companyName, action.payload.pageNumber);
  }
  return state;
};

const app = combineReducers({
  page,
  companyName
});

export default app;