import React from 'react'
import { Link } from "react-scroll";

const CTABtn = () => {
  return (
    <Link
      activeClass="active"
      to="best-seller"
      spy={true}
      smooth={true}
      offset={-50}
      duration={1000}
    >
      <span className='cta__btn'>Shop now</span>
    </Link>

  )
}

export default CTABtn