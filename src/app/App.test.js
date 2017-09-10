import React from 'react';
import {shallow} from 'enzyme';
import {App} from './App';
import {PAGE_SIZE} from '../services/Page';

describe('App', () => {

  let props;

  beforeEach(() => {
    props = {
      page: {
        items: [],
        totalItems: 0,
        pageNumber: 0
      },
      companyName: '',
      updateCompanyName: jest.fn(),
      applyFilter: jest.fn()
    };
  });

  it('updates company name on every change in filterInput', () => {
    const appWrapper = shallow(<App {...props} />);
    const filterInput = appWrapper.find('[data-role="filter-input"]');
    const event = {target: {value: 'a'}};
    filterInput.simulate('change', event);

    expect(props.updateCompanyName).toHaveBeenCalledWith('a');
  });

  it('resets filter if company name is shorter than 3 symbols', () => {
    const appWrapper = shallow(<App {...props} />);
    const filterInput = appWrapper.find('[data-role="filter-input"]');
    const event = {target: {value: 'a'}};
    filterInput.simulate('change', event);

    expect(props.applyFilter).toHaveBeenCalledWith('', props.page.pageNumber);
  });

  it('applies filter if company name is at least 3 symbols long', () => {
    const appWrapper = shallow(<App {...props} />);
    const filterInput = appWrapper.find('[data-role="filter-input"]');
    const event = {target: {value: 'abc'}};
    filterInput.simulate('change', event);

    expect(props.applyFilter).toHaveBeenCalledWith('abc', props.page.pageNumber);
  });

  it('clears the company name and resets filter when clear filter button is clicked', () => {
    const appWrapper = shallow(<App {...props} />);
    const clearButton = appWrapper.find('[data-role="clear-button"]');
    clearButton.simulate('click');

    expect(props.updateCompanyName).toHaveBeenCalledWith('');
    expect(props.applyFilter).toHaveBeenCalledWith('', 0);
  });

  it('hides \'next page\' link if all items fit on one page', () => {
    const appWrapper = shallow(<App {...props} />);
    expect(appWrapper.find('[data-role="next-page-link"]').exists()).toBeFalsy();
  });

  it('displays \'next page\' link if all items do not fit on one page', () => {
    props.page = {items: [], totalItems: PAGE_SIZE + 2, pageNumber: 0};
    const appWrapper = shallow(<App {...props} />);
    const nextPageLink = appWrapper.find('[data-role="next-page-link"]');

    expect(nextPageLink.exists()).toBeTruthy();
  });

  it('goes to next page if \'next page\' link was clicked', () => {
    props.page = {items: [], totalItems: PAGE_SIZE + 2, pageNumber: 0};
    const appWrapper = shallow(<App {...props} />);
    const nextPageLink = appWrapper.find('[data-role="next-page-link"]');
    nextPageLink.simulate('click');

    expect(props.applyFilter).toHaveBeenCalledWith(props.companyName, 1);
  });

  it('hides \'next page\' link if we reached the last page', () => {
    props.page = {items: [], totalItems: PAGE_SIZE + 2, pageNumber: 1};
    const appWrapper = shallow(<App {...props} />);
    const nextPageLink = appWrapper.find('[data-role="next-page-link"]');
    expect(nextPageLink.exists()).toBeFalsy();
  });

  it('hides \'prev page\' link if we are on the first page', () => {
    const appWrapper = shallow(<App {...props} />);
    expect(appWrapper.find('[data-role="prev-page-link"]').exists()).toBeFalsy();
  });

  it('displays \'prev page\' link if we are not on the first page', () => {
    props.page = {items: [], totalItems: PAGE_SIZE + 2, pageNumber: 1};
    const appWrapper = shallow(<App {...props} />);
    expect(appWrapper.find('[data-role="prev-page-link"]').exists()).toBeTruthy();
  });

  it('goes to prev page if \'prev page\' link was clicked', () => {
    props.page = {items: [], totalItems: PAGE_SIZE + 2, pageNumber: 1};
    const appWrapper = shallow(<App {...props} />);
    const prevPageLink = appWrapper.find('[data-role="prev-page-link"]');
    prevPageLink.simulate('click');

    expect(props.applyFilter).toHaveBeenCalledWith(props.companyName, 0);
  });

});