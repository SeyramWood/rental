import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

const SearchInput = () => {
  const dropRef = React.useRef(null);
  const [drop, setDrop] = React.useState(false);
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setDrop(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropRef]);
  return (
    <div className="asinyo__header__search">
      <div
        className={`asinyo__header__search__container ${drop && "scaleZ"
          }`}
        ref={dropRef}
      >
        <IoSearchOutline />
        <input
          type="search"
          name=""
          id=""
          placeholder="Search products..."
          onKeyPress={() => setDrop((state) => true)}
        />
        <button type="button">search</button>
      </div>

      <div className="asinyo__header__search__dropdown">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        ratione nulla sint distinctio blanditiis facilis voluptas libero
        tenetur laboriosam, suscipit nobis reiciendis, odit expedita
        eos, in cumque minima obcaecati. Assumenda. Lorem ipsum dolor
        sit amet consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Iste ratione nulla sint
        distinctio blanditiis facilis voluptas libero tenetur
        laboriosam, suscipit nobis reiciendis, odit expedita eos, in
        cumque minima obcaecati. Assumenda.
      </div>
    </div>
  )
}

export default SearchInput