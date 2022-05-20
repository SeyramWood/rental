import React from "react";

const ProductBtn = ({ label = "Add to Basket" }) => {
  return <button className="product__btn">{label}</button>;
};

export default ProductBtn;
