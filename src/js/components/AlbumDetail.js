import React from "react";
import Moment from "react-moment";


const AlbumDetail = props => ( 
  <div className="text-center">
    <img
      alt={props.title}
      className="img-fluid"
      src={props.src}
      style={{ margin: "0 auto" }}
    />
    <h3><b>Artist:</b> {props.artist}</h3>
    <h3><b>Album:</b> {props.title}</h3>
    <h3><b>Genre:</b> {props.genre}</h3>
    <h3><b>Released:</b> <Moment format="MM/DD/YYYY">{props.released}</Moment></h3>
  </div>
);

export default AlbumDetail;
