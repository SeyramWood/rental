import Link from "next/link";
import React from "react";
import {
  IoBagHandleOutline,
  IoBasketOutline,
  IoHeartOutline,
  IoPersonOutline,
} from "react-icons/io5";

const HeaderNavs = ({ drawerRef }) => {
  return (
    <ul className="asinyo__header__navigation">
      <li className="asinyo__header__navigation__user asinyo__header__navigation--list">
        <span className="asinyo__header__navigation__text">Account</span>
        <span className="asinyo__header__navigation__icon asinyo__header__navigation__icon--lg">
          <IoPersonOutline />
        </span>
        <Link href="/auth/sign-in">
          <a className="asinyo__header__navigation__icon asinyo__header__navigation__icon--xs">
            <IoPersonOutline />
          </a>
        </Link>
        <ul className="asinyo__header__navigation__user__dropdown">
          <li className="signin__btn">
            <Link href="/auth/sign-in">
              <a>Sign in</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <IoPersonOutline />
                <span>my account</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <IoBagHandleOutline />
                <span>orders</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <IoHeartOutline />
                <span>saved products</span>
              </a>
            </Link>
          </li>
        </ul>
      </li>
      <li
        className="asinyo__header__navigation__basket asinyo__header__navigation--list"
        onClick={() => drawerRef.current.open()}
      >
        <span className="asinyo__header__navigation__text">
          <span>2</span> Items in basket
        </span>
        <span className="asinyo__header__navigation__icon">
          <IoBasketOutline />
        </span>
      </li>
    </ul>
  );
};

export default HeaderNavs;
