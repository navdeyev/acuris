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

  const nextPage = () => {
    const hasNextPage = (page.pageNumber + 1) * PAGE_SIZE < page.totalItems;
    if (hasNextPage) {
      applyFilter(companyName, page.pageNumber + 1);
    }
  };

  const prevPage = () => {
    const hasPrevPage = page.pageNumber !== 0;
    if (hasPrevPage) {
      applyFilter(companyName, page.pageNumber - 1);
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
        <div className="showMoreContainer">
          {
            page.pageNumber !== 0 &&
            <a href="javascript:void(0);" onClick={prevPage} data-role="prev-page-link">Prev page</a>
          }
          {
            page.totalItems > PAGE_SIZE && page.pageNumber !== Math.floor(page.totalItems / PAGE_SIZE) &&
            <a href="javascript:void(0);" onClick={nextPage} data-role="next-page-link">Next page</a>
          }
        </div>
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
