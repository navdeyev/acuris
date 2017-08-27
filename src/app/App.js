import React from 'react';
import {connect} from 'react-redux';
import './App.css';

import CompanyList from "../components/CompanyList";
import appActions from './appActions';
import {PAGE_SIZE} from '../services/Page';

export const App = (props) => {
  const {companyName, page, updateCompanyName, applyFilter} = props;

  const filterHandler = (e) => {
    const inputValue = e.target.value;
    updateCompanyName(inputValue);
    applyFilter(inputValue.length > 2 ? inputValue : '', page.pageNumber);
  };

  const clearFilter = () => {
    updateCompanyName('');
    applyFilter('', 0);
  };

  const showMore = () => {
    const hasNextPage = (page.pageNumber + 1) * PAGE_SIZE < page.totalItems;
    if (hasNextPage) {
      applyFilter(companyName, page.pageNumber + 1);
    }
  };

  return (
    <div className="app">
      <div className="filter">
        <input type="text"
               className="filterInput"
               value={companyName}
               onChange={filterHandler}
               data-role="filter-input"
               placeholder="Start typing to filter by Company name"/>
        <button type="button" onClick={clearFilter} className="clearButton" data-role="clear-button">
          Clear filter
        </button>
      </div>
      <CompanyList companies={page.items}/>
      {
        page.totalItems > PAGE_SIZE &&
        <div className="showMoreContainer">
          <a className="showMore" href="javascript:void(0);" onClick={showMore} data-role="show-more-link">Show more</a>
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.page,
    companyName: state.companyName
  };
};

const mapDispatchToProps = {
  updateCompanyName: appActions.updateCompanyName,
  applyFilter: appActions.applyFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
