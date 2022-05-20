import React from "react";
import {
  IoAddOutline,
  IoRemoveOutline,
  IoStarSharp,
  IoTrashOutline,
} from "react-icons/io5";
import CheckoutBtn from "../common/btns/CheckoutBtn";

const Cart = () => {
  return (
    <div className="cart__container">
      <header className="cart__header">
        <h3>Items</h3>
        <h3>Quantity</h3>
        <h3>Action</h3>
      </header>
      <div className="cart__body">
        <div className="cart__body__item">
          <div className="cart__body__item__details">
            <div className="cart__body__item__details__image">
              <img
                src="https://s3-alpha-sig.figma.com/img/bb15/9fd4/458197cdb9d575c767e65753901025e1?Expires=1649030400&Signature=EKNebsMTt7-ZU8DLlpu~sB73ShB-G7u5rnWVus8LLVdLh6X~tK3E1Hc59Secrql3bLwT0gYZTx5D2yKbEZJPRYXQHINW8bihzCSl9qHMexD30fgPtQv0goHLJ8nw1ZeWPhud3khbyIPyQ1CiR-gk~pHWkxnrxVk7sq5PFuSd5JlNkhNFKnon9TO3~2GLoEQFoq5z7c16k~1MzUFqvX6N9SuciBW6H68~5QI1~r3~WTIkKYPVSrhAGZd6a5Cv1mfZU3vfHZfYOPUKc8YLSEfnz8NwJ6I9egEHZ4dY8LYmjrRqsZFI4GJJ9LSkYy8Y~MaMB~eOUugzEOUFIFMobQm7nw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                alt="item image"
              />
            </div>
            <div className="cart__body__item__details__detail">
              <h4>Vegetables</h4>
              <p>Fruit and Vegetables</p>
              <strong>GHS 10,526</strong>
              <div className="cart__body__item__details__detail__rating">
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
              </div>
            </div>
          </div>
          <div className="cart__body__item__quantity">
            <button type="button" className="quantity quantity--decrease">
              <IoRemoveOutline />
            </button>
            <span>1 item</span>
            <button type="button" className="quantity quantity--increase">
              <IoAddOutline />
            </button>
          </div>
          <div className="cart__body__item__action">
            <button type="button">
              <span>
                <IoTrashOutline />
              </span>
              <span>Remove</span>
            </button>
          </div>
        </div>
        <div className="cart__body__item">
          <div className="cart__body__item__details">
            <div className="cart__body__item__details__image">
              <img
                src="https://s3-alpha-sig.figma.com/img/bb15/9fd4/458197cdb9d575c767e65753901025e1?Expires=1649030400&Signature=EKNebsMTt7-ZU8DLlpu~sB73ShB-G7u5rnWVus8LLVdLh6X~tK3E1Hc59Secrql3bLwT0gYZTx5D2yKbEZJPRYXQHINW8bihzCSl9qHMexD30fgPtQv0goHLJ8nw1ZeWPhud3khbyIPyQ1CiR-gk~pHWkxnrxVk7sq5PFuSd5JlNkhNFKnon9TO3~2GLoEQFoq5z7c16k~1MzUFqvX6N9SuciBW6H68~5QI1~r3~WTIkKYPVSrhAGZd6a5Cv1mfZU3vfHZfYOPUKc8YLSEfnz8NwJ6I9egEHZ4dY8LYmjrRqsZFI4GJJ9LSkYy8Y~MaMB~eOUugzEOUFIFMobQm7nw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                alt="item image"
              />
            </div>
            <div className="cart__body__item__details__detail">
              <h4>Vegetables</h4>
              <p>Fruit and Vegetables</p>
              <strong>GHS 10,526</strong>
              <div className="cart__body__item__details__detail__rating">
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
              </div>
            </div>
          </div>
          <div className="cart__body__item__quantity">
            <button type="button" className="quantity quantity--decrease">
              <IoRemoveOutline />
            </button>
            <span>1 item</span>
            <button type="button" className="quantity quantity--increase">
              <IoAddOutline />
            </button>
          </div>
          <div className="cart__body__item__action">
            <button type="button">
              <span>
                <IoTrashOutline />
              </span>
              <span>Remove</span>
            </button>
          </div>
        </div>
        <div className="cart__body__item">
          <div className="cart__body__item__details">
            <div className="cart__body__item__details__image">
              <img
                src="https://s3-alpha-sig.figma.com/img/bb15/9fd4/458197cdb9d575c767e65753901025e1?Expires=1649030400&Signature=EKNebsMTt7-ZU8DLlpu~sB73ShB-G7u5rnWVus8LLVdLh6X~tK3E1Hc59Secrql3bLwT0gYZTx5D2yKbEZJPRYXQHINW8bihzCSl9qHMexD30fgPtQv0goHLJ8nw1ZeWPhud3khbyIPyQ1CiR-gk~pHWkxnrxVk7sq5PFuSd5JlNkhNFKnon9TO3~2GLoEQFoq5z7c16k~1MzUFqvX6N9SuciBW6H68~5QI1~r3~WTIkKYPVSrhAGZd6a5Cv1mfZU3vfHZfYOPUKc8YLSEfnz8NwJ6I9egEHZ4dY8LYmjrRqsZFI4GJJ9LSkYy8Y~MaMB~eOUugzEOUFIFMobQm7nw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                alt="item image"
              />
            </div>
            <div className="cart__body__item__details__detail">
              <h4>Vegetables</h4>
              <p>Fruit and Vegetables</p>
              <strong>GHS 10,526</strong>
              <div className="cart__body__item__details__detail__rating">
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
              </div>
            </div>
          </div>
          <div className="cart__body__item__quantity">
            <button type="button" className="quantity quantity--decrease">
              <IoRemoveOutline />
            </button>
            <span>1 item</span>
            <button type="button" className="quantity quantity--increase">
              <IoAddOutline />
            </button>
          </div>
          <div className="cart__body__item__action">
            <button type="button">
              <span>
                <IoTrashOutline />
              </span>
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
      <footer className="cart__footer">
        <h4>Total</h4>
        <div className="cart__footer__total">
          <div className="cart__footer__total__price">
            <strong>GHS 10,526</strong>
          </div>
          <div className="cart__footer__total__quantity">5 items</div>
          <div className="cart__footer__total__action">
            <CheckoutBtn />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
