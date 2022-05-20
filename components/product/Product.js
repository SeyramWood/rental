import React from "react";
import { MdLocationPin } from "react-icons/md";

const Product = ({viewDetails, room}) => {
    
  return (
    
      <div className="product" onClick={() => viewDetails(room)}>
        <div className="product__image">
          <img src={room.images[0]} alt="property image" srcSet="" />
        </div>
        <div className="product__details">
          <div className="product__details__top">
            <h4 className="title">{room.title}</h4>
            <p>{room.description}</p>
          </div>
          <div className="product__details__bottom">
            <MdLocationPin />
            <span>
              {room.region}, {room.city}
            </span>
          </div>
        </div>
        <div className="product__price">
          <strong>GHS {room.price}</strong>
          <p>per month</p>
        </div>
      </div>
  );
};

export default Product;
