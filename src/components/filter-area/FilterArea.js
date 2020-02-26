import React, { Component } from 'react';
import './FilterArea.css';

class FilterArea extends Component {
  state = {  };
  filterList = ['All', 'Active', 'Completed'];
  render() { 
    const { totalLeftItems, totalItems, children } = this.props;
    let footerClass = 'footer';
    footerClass = totalItems ? footerClass : `${footerClass} footer-hidden`; 
    return (
      <div className={footerClass}>
        <div className="footer__total-item">{totalLeftItems} items left</div>
        <div className="footer__filter-area">{children}</div>
      </div>
    );
  }
}
 
export default FilterArea;