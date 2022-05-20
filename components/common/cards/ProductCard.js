import Link from "next/link";
import React from "react";
import ProductBtn from "../btns/ProductBtn";

const ProductCard = ({ image, name, company, cta, price, link }) => {
  return (
    <div className="product__card">
      <div className="product__card__image">
        <img src={image} alt={image} srcSet="" />
      </div>
      <div className="product__card__content">
        <article className="product__card__content__article">
          <h3 className="product__card__content__article__title">
            <Link href={link}>
              <a>{name}</a>
            </Link>
          </h3>
          <p className="product__card__content__article__company">{company}</p>
          <p className="product__card__content__article__cta">{cta}</p>
          <microdata className="product__card__content__article__price">
            {price}
          </microdata>
        </article>
        <div className="product__card__content__btn">
          <ProductBtn />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
