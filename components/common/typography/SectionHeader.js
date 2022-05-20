import React from "react";

const SectionHeader = ({ text }) => {
  return (
    <div className="section__header__wrapper">
      <header className="section__header__wrapper__header">
        <h1>{text}</h1>
      </header>
      <a href="http://" className="section__header__wrapper__link">
        See All
      </a>
    </div>
  );
};

export default SectionHeader;
