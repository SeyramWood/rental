import Link from 'next/link'
import React from 'react'

const CategoryCard = ({image, cat, link}) => {
  return (
    <div className='category__card'>
      <div className='category__card__image'>
        <img src={image} alt={image} srcSet="" />
      </div>
      <div className='category__card__link'>
        <Link href={link}>
          <a>{cat}</a>
        </Link>
      </div>
    </div>
  )
}

export default CategoryCard