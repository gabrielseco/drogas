'use strict';

import React from 'react/addons';


let Datepicker = React.createClass({
  componentDidMount(){
    $(this.refs.myRef.getDOMNode(this)).datepicker({
      format: 'dd/mm/yyyy',
      language:'es'
    });
  },
    render() {
        return (
          <div ref="myRef" className="input-group date">
            <input type="text" className="form-control"/>
            <div className="input-group-addon">
                <span className="fa fa-calendar"></span>
            </div>
          </div>

        );
    }
});

module.exports = Datepicker;
