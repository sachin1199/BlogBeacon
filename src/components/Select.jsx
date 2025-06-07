import React, { useId } from "react";
import PropTypes from "prop-types";

const Select = React.forwardRef(function Select({ label, options, className, ...props },ref) {
    
    const id = useId();
    return (
      <>
        <div className="w-full">
          {label && <label htmlFor={id}>{label}</label>}
          <select
            id={id}
            {...props}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </>
    )



})




Select.propTypes = {
  label: PropTypes.string, 
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired, 
  className: PropTypes.string, 
}
export default Select;