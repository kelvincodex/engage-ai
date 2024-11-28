import React, {InputHTMLAttributes, useState} from 'react'

interface BaseToggleProps extends InputHTMLAttributes<HTMLInputElement>{

}
export const BaseToggle = ({...props}: BaseToggleProps) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    return (
        <div className="flex items-center">
            {/*<span className="mr-3 text-sm font-medium text-gray-600 ">Off</span>*/}
            <label className="relative flex items-center  cursor-pointer">
                <input {...props} onClick={handleCheckboxChange} type="checkbox" defaultChecked={isChecked} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0  rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-primary-color hover:peer-checked:bg-primary-color "></div>
            </label>
            {/*<span className="ml-3 text-sm font-medium text-gray-600 ">On</span>*/}
        </div>
    )
}

