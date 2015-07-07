'use strict';

import React from 'react/addons';


let BreadCrumb = React.createClass({
    render() {
        return (
            <div className="container bread">
             <div className="col-md-8">
              <div className="centro">
                <p><strong>Centro: </strong>{this.props.centro}</p>
              </div>
              </div>
              <div className="col-md-4">
                <div className="texto">
                  <p>{this.props.texto}</p>
                </div>
              </div>
            </div>
        );
    }
});

module.exports = BreadCrumb;
