import React, { Component } from 'react';
import './NewItem.css';

class NewItem extends Component {
  state = {  };

  render() {
    const { onKeyPress, onChange, inputValue, onClickAll } = this.props;
    return ( 
      <div className="input-item-container">
        <span className="select-all-btn" onClick={onClickAll}><i className="arrow-down" /></span>
        <input type="text" 
          className="input-item" 
          placeholder="What need to be done?" 
          value={inputValue}
          onChange={onChange} 
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }
}
 
export default NewItem;