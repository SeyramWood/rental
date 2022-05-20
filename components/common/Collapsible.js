import React from 'react'
import useCollapse from 'react-collapsed'
import { IoChevronUpOutline, IoChevronDownOutline } from 'react-icons/io5'

const Collapsible = ({ title, children }) => {
  const config = {
    duration: 500,
    easing: 'cubic-bezier(.17,.67,.83,.67)',
    expandStyles: {
      opacity: 0.5
    },
    collapseStyles: {
      opacity: 0.5
    }
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config)
  return (
    <div className="collapsible">
      <div role='button' className="collapsible__header" {...getToggleProps()}>
        <span>{title}</span> {isExpanded ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
      </div>
      <div {...getCollapseProps()}>
        <div className="collapsible__content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Collapsible