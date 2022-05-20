import React from 'react'
import Image from "next/image";
import Link from 'next/link';


const MerchantCard = ({ image, merchant, cta, link }) => {
 
  return (
    <div className='merchant__card'>
      <div className='merchant__card__image'>
        <img src={image} alt={merchant} srcSet="" />
      </div>
      <article className='merchant__card__content'>
        <h1 className='merchant__card__content__header'>{merchant}</h1>
      <div className='merchant__card__content__cta'>{cta}</div>
        <div className='merchant__card__content__link' >
          <Link href={link}>
            <a>
              <span>more</span>
              <span>&#x02192;</span>
            </a>
          </Link>
        </div>
      </article>
    </div>
  )
}

export default MerchantCard