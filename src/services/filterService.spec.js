import {applyFiltering, applyFilteringAndPagingFactory} from './filterService';
import Page from './Page';

describe('filteringService', () => {

  let companies;
  beforeEach(() => {
    companies = [
      {id: '1', name: 'Sony Corporation'},
      {id: '2', name: 'Sony Music Entertainment Inc.'},
      {id: '3', name: 'Sony Mobile Communications AB'},
      {id: '4', name: 'Sony Pictures Entertainment Inc.'},
      {id: '5', name: 'Sony Network Communications Inc. '},
      {id: '6', name: 'Sony Pictures Networks India Pvt. Ltd.'},
    ];
  });

  it('filters the companies by name using includes and lowercase comparison', () => {
    const filteredCompanies = applyFiltering(companies, 'pictures');
    expect(filteredCompanies.length).toBe(2);
    expect(filteredCompanies[0].name).toBe('Sony Pictures Entertainment Inc.');
    expect(filteredCompanies[1].name).toBe('Sony Pictures Networks India Pvt. Ltd.');
  });

  it('returns an empty page if company name is empty string', () => {
    const applyFilteringAndPaging = applyFilteringAndPagingFactory(companies);
    expect(applyFilteringAndPaging('', 0)).toEqual(new Page());
  });

  it('returns a first page with filtering result', () => {
    const applyFilteringAndPaging = applyFilteringAndPagingFactory(companies);
    const resultPage = applyFilteringAndPaging('sony', 0);
    expect(resultPage.items.length).toBe(5);
    expect(resultPage.totalItems).toBe(6);
    expect(resultPage.pageNumber).toBe(0);
  });

  it('returns a second page with filtering result', () => {
    const applyFilteringAndPaging = applyFilteringAndPagingFactory(companies);
    const resultPage = applyFilteringAndPaging('sony', 1);
    expect(resultPage.items.length).toBe(1);
    expect(resultPage.totalItems).toBe(6);
    expect(resultPage.pageNumber).toBe(1);
  });

});

