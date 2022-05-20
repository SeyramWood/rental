import React from 'react'
import { IoCloseOutline } from 'react-icons/io5';
import MenuIcon from './MenuIcon'

const SideDrawer = React.forwardRef(function SideDrawer({ title, children }, ref) {
  const [openDrawer, setDrawerOpen] = React.useState(false);
  const open = (e) => {
    const scrollY =
      document.documentElement.style.getPropertyValue("--scroll-y");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}`;
    setDrawerOpen((state) => (state = true));
  };
  const close = (e) => {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    setDrawerOpen((state) => (state = false));
  };

  React.useImperativeHandle(ref, () => ({
    open,
    close
  }))

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`
      );
    });
  }, [openDrawer]);

  return (
    <div className={`asinyo__drawer ${openDrawer ? 'open' : 'close'}`} onClick={close}>
      <aside className='asinyo__drawer__content' onClick={e => e.stopPropagation()}>
        <div className="asinyo__drawer__content__header">
          <h3 className="asinyo__drawer__content__header__title">{title}</h3>
          <button type="button" className="btn--plain" onClick={close}>
            <IoCloseOutline />
          </button>
        </div>
        {children}
      </aside>
    </div>

  )
})

export default SideDrawer