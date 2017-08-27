import React, {Component} from 'react';
import './App.css';

import CompanyList from "./components/CompanyList";
import companies from './assets/company.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="filter">
          <input type="text" className="filterInput" placeholder="Start typing to filter by Company name" />
        </div>
        <CompanyList companies={companies} />
        <div className="showMoreContainer">
          <a className="showMore" href="#">Show more</a>
        </div>
      </div>
    );
  }
}

export default App;
