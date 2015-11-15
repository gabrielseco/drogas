'use strict';

import React from 'react/addons';


let Datepicker = React.createClass({
  componentDidMount(){
    $(this.refs.myRef.getDOMNode(this)).datepicker({
      format: 'dd/mm/yyyy',
      language:'es',
      autoclose:true
    });
  },
    render() {
        return (
          <div ref="myRef" className="input-group date">
            <input id={this.props.name} type="text" className="form-control" name="date"/>
            <span className="input-group-addon">
                <span className="glyphicon glyphicon-calendar"></span>
            </span>
          </div>

        );
    }
});

module.exports = Datepicker;
