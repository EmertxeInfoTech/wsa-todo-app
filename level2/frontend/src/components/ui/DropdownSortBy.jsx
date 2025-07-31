import clsx from "clsx";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ArrowDown from "../../assets/arrow-down.svg";

const DropdownSortBy = ({ placeholder, value, onChange, options }) => {
  //State to manage menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //Refrence to select the elememnt
  const selecRef = useRef(null);

  const toggleMenuDisplay = useCallback(
    () => setIsMenuOpen((isMenuOpen) => !isMenuOpen),
    []
  );

  //close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (selecRef.current && !selecRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionChange = useCallback(
    function (option) {
      onChange(option);
      setIsMenuOpen(false);
    },
    [onChange]
  );

  //Memoized selected options
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  return (
    <div ref={selecRef} className="dropdown-container">
      <div className="value-container" onClick={toggleMenuDisplay}>
        {/* Display selected value or placeholder */}
        <span
          className={clsx("dropdown-value", !value && "dropdown-placeholder")}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <img src={ArrowDown} alt="Dropdown icon" />
      </div>
      {/* display sort options */}
      {isMenuOpen && (
        <div className="menu-list">
          {options.map((option) => {
            return (
              <div
                key={option.value + "-option"}
                className="menu-list-option"
                onClick={() => handleOptionChange(option.value)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownSortBy;
