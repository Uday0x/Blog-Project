import React, { useId } from 'react'



//options, label,className ,Props
function Select({
    options,
    label,
    className,
    ...props
},ref) {
    const id = useId()
    return (
        <div className='w-full'>
    {label && <label htmlFor={id} className=''>

    </label>}

    <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >


            {
                options?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))
            }
    </select>
    </div>
    )
}

export default React.forwardRef(Select)



{/* <form action="/action_page.php">
  <label for="cars">Choose a car:</label>
  <select name="cars" id="cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select> */}

//   better understanding on whyoptiosn was used