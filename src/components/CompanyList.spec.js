import React from 'react';
import {shallow} from 'enzyme';

import CompanyList from './CompanyList'

describe('CompanyList', () => {

  let props;
  beforeEach(() => {
    props = {
      companies: [
        {
          id: "1",
          name: "Sony Corporation",
          description: "Japan-based company engaged in businesses of consumer and professional electronics, gaming, entertainment and financial services",
          isListedEntity: true,
          isPEVCHouse: true,
          geography: {
            country: "Japan",
            state: "Kanto"
          }
        }, {
          id: "2",
          name: "Sony Music Entertainment Inc.",
          description: "US-based music publishing company",
          isListedEntity: false,
          isPEVCHouse: false,
          geography: {
            country: "USA",
            state: "New York (NY)"
          }
        }
      ]
    };
  });

  it('renders a row for every company', () => {
    const wrapper = shallow(<CompanyList {...props} />);
    const rows = wrapper.find('[data-role="company-row"]');
    expect(rows.size).toBe(props.companies.size);
  });

  it('renders Listed Entity div if company.isListedEntity is true', () => {
    const wrapper = shallow(<CompanyList {...props} />);

    const corporationListedEntityWrapper = wrapper.find('[data-role="company-row-listed-entity-0"]');
    expect(corporationListedEntityWrapper.exists()).toBeTruthy();

    const musicEntertainmentListedEntityWrapper = wrapper.find('[data-role="company-row-listed-entity-1"]');
    expect(musicEntertainmentListedEntityWrapper.exists()).toBeFalsy();
  });

  it('renders PEVC house div if company.isPEVCHouse is true', () => {
    const wrapper = shallow(<CompanyList {...props} />);

    const corporationListedEntity = wrapper.find('[data-role="company-row-pevc-house-0"]');
    expect(corporationListedEntity.exists()).toBeTruthy();

    const musicEntertainmentListedEntity = wrapper.find('[data-role="company-row-pevc-house-1"]');
    expect(musicEntertainmentListedEntity.exists()).toBeFalsy();
  });

  it('renders headquarters information in specific format', () => {
    const wrapper = shallow(<CompanyList {...props} />);

    const corporationHeadquartersWrapper = wrapper.find('[data-role="company-row-headquarters-0"]');
    expect(corporationHeadquartersWrapper.text()).toBe('Kanto, Japan');

    const musicEntertainmentHeadquartersWrapper = wrapper.find('[data-role="company-row-headquarters-1"]');
    expect(musicEntertainmentHeadquartersWrapper.text()).toBe('New York (NY), USA');
  });

});