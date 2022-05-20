import React from "react";

const MenuIcon = ({ toggle, status }) => {
  return (
    <button
      type="button"
      className={`menu__icon ${status && "active"}`}
      onClick={() => toggle()}
    >
      <span className="box">
        <span className="line "></span>
      </span>
    </button>
  );
};

export default MenuIcon;
