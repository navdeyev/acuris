export const appActionTypes = {
  UPDATE_COMPANY_NAME: 'UPDATE_COMPANY_NAME',
  APPLY_FILTER: 'APPLY_FILTER'
};

const updateCompanyName = (companyName) => {
  return { type: appActionTypes.UPDATE_COMPANY_NAME, payload: companyName};
};

const applyFilter = (companyName, pageNumber) => {
  const payload = { companyName, pageNumber };
  return {type: appActionTypes.APPLY_FILTER, payload};
};

export default {
  applyFilter,
  updateCompanyName
};

