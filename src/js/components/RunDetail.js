import React from "react";


const RunDetail = props => ( 
  <div className="text-center">

    <h3><b>Name:</b> {props.features.properties.name}</h3>
    <h3><b>Use Route:</b><a href={props.features.properties.links}></a></h3>
  </div>
);

export default RunDetail;
