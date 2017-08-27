import React from 'react';

import './CompanyList.css'

const CompanyList = (props) => {
  const {companies} = props;

  if (companies && companies.length > 0) {
    return (
      <table className="companyList">
        <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Headquarter</th>
        </tr>
        </thead>
        <tbody>
        {companies.map(renderCompanyRow)}
        </tbody>
      </table>
    );
  }

  return null;
};

const renderCompanyRow = (company, index) => {
  return (
    <tr key={company.id} data-role="company-row">
      <td className="nameCell">
        <div className="name">{company.name}</div>
        <span className="description">{company.description}</span>
      </td>
      <td className="typeCell">
        {company.isListedEntity && <div data-role={`company-row-listed-entity-${index}`}>Listed entity</div>}
        {company.isPEVCHouse && <div data-role={`company-row-pevc-house-${index}`}>PEVC house</div>}
      </td>
      <td className="headquarterCell">
        <span data-role={`company-row-headquarters-${index}`}>
          {`${company.geography.state}, ${company.geography.country}`}
        </span>
      </td>
    </tr>
  );
};

export default CompanyList;
