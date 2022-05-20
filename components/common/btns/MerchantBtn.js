import Link from 'next/link'
import React from 'react'

const MerchantBtn = () => {
  return (
    <Link href='/auth/merchant/sign-up'>
      <a className='merchant__btn'>become a merchant</a>
    </Link>
  )
}

export default MerchantBtn