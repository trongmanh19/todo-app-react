import React, { Component } from 'react';
import './NewItem.css';

class NewItem extends Component {
  state = {  };

  render() {
    const { onKeyPress } = this.props;
    return ( 
      <div className="input-item-container">
        <input type="text" className="input-item" placeholder="What need to be done?" onKeyPress={onKeyPress}></input>
      </div>
    );
  }
}
 
export default NewItem;