import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";

const Stepper = React.forwardRef(function Stepper(
  { children, active = 0 },
  ref
) {
  const [status, setStatus] = React.useState(active);
  const [activeLine, setActiveLine] = React.useState(null);
  const [completed, setCompleted] = React.useState([]);
  const [isCompleted, setIsCompleted] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    isCompleted,
    prevStep() {
      status > 0
        ? setStatus((state) => (state = state - 1))
        : setStatus((state) => (state = 0));

      completed.splice(completed.indexOf(status > 0 ? status - 1 : status), 1);

      if (status < children.length) {
        setIsCompleted(false)
      }
    },
    nextStep() {
      if (status < children.length) {
        setStatus((state) => (state = state + 1));
      }
      if (status > 0) {
        setCompleted(
          (state) => (state = [...state, status > 0 ? status - 1 : status])
        );
      } else {
        setCompleted((state) => (state = [...state, status]));
      }
      if (status === children.length) {
        setIsCompleted(true)
      }
    },
  }));
  React.useEffect(() => {
    if (status > 0) {
      setActiveLine((state) => (state = status - 1));
    } else {
      setActiveLine((state) => (state = null));
    }
  }, [status]);

  return (
    <main className="asinyo__stepper">
      <div className="asinyo__stepper__header">
        {children.map((child, index) => (
          <div
            className="asinyo__stepper__header__label"
            key={index.toString()}
          >
            <div
              className={`asinyo__stepper__header__label__button ${
                index === activeLine && "active"
              } ${completed[index] >= 0 && "completed"}`}
            >
              <button
                type="button"
                className={`${index === status && "active"}`}
              >
                {completed[index] >= 0 ? <IoCheckmarkSharp /> : index + 1}
              </button>
            </div>
            <p className="asinyo__stepper__header__label__text">
              {child.props.label}
            </p>
          </div>
        ))}
      </div>

      {children[status]}
    </main>
  );
});

export default Stepper;
