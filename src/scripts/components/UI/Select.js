'use strict';

import React from 'react/addons';

let Select = React.createClass({
    getInitialState(){

      return {
        ID: ''
      };
    },
    onSelect(e){
      this.setState({ID: e.target.value});
    },
    render() {
      var list = this.props.data.map((value, i) => {
             return (
               <option key={value.ID} value={value.ID} >
                {value.valor}
               </option>
             );
           });
        return (
          <div>
            <select ref="select{this.props.ID}" onChange={this.onSelect}>
              <option value="0">{this.props.text}</option>
              {list}
            </select>
            <input type="hidden" ref={this.props.ID} id={this.props.ID} value={this.state.ID}/>
          </div>
        );
    }
});

module.exports = Select;
