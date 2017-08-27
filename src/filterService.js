import unfilteredCompanies from './assets/company.json';

import Page, { PAGE_SIZE } from './Page';

export const applyFiltering = (companies, companyName) => {
  return companies.filter((company) => {
    return company.name.toLowerCase().includes(companyName.toLowerCase());
  });
};

export const applyFilteringAndPagingFactory = (unfilteredCompanies) => {
  return (companyName, currentPageNumber) => {
    if (companyName === '') {
      return new Page();
    } else {
      const filteredCompanies = applyFiltering(unfilteredCompanies, companyName);
      const startIndex = currentPageNumber * PAGE_SIZE;

      return new Page(
        filteredCompanies.slice(startIndex, startIndex + PAGE_SIZE),
        filteredCompanies.length,
        currentPageNumber
      );
    }
  };
};

export default {
  applyFiltering,
  applyFilteringAndPaging: applyFilteringAndPagingFactory(unfilteredCompanies)
}
