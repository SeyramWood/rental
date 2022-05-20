import Link from 'next/link'
import React from 'react'

const ViewMoreBtn = ({ link = '' }) => {
  if (link) {
    return (
      <Link href={link}>
        <a className='view__more__btn'>View more</a>
      </Link>
    )
  }
  return (
    <button className='view__more__btn'>View more</button>
  )
}

export default ViewMoreBtn