import React, { useId } from 'react';

const Select = React.forwardRef(function Select({
  options = [],        // default empty array
  label,
  className = '',
  valueKey = 'value',  // if options are objects, use these keys
  labelKey = 'label',
  placeholder,         // optional placeholder option
  ...props
}, ref) {
  const id = useId();

  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className='inline-block mb-1 pl-1'>
          {label}
        </label>
      )}

      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {options.map((option, idx) => {
          // handle both string and object options
          if (typeof option === 'string' || typeof option === 'number') {
            return (
              <option key={option + idx} value={option}>
                {option}
              </option>
            );
          } else if (option && typeof option === 'object') {
            const val = option[valueKey];
            const lab = option[labelKey];
            return (
              <option key={val ?? idx} value={val ?? ''}>
                {lab ?? String(val)}
              </option>
            );
          } else {
            return null;
          }
        })}
      </select>
    </div>
  );
});

export default Select;
