'use client'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useFilterContext } from "@/context/FilterContext"
import FilterSearch from '../SearchFilter';

const AddFilterButton: React.FC = () => {
    const [isShow, setIsShow] = useState<boolean>(true)

    const filterContext = useFilterContext()

    useEffect(() => {
        if (filterContext.filters.length === 0) {
            setIsShow(true)
        }
    }, [filterContext.filters.length])

    return (
        <>
            <div className="dropdown">
                <button
                    className={`  mainBtn addFilterButton   ${isShow && "active"}`} 
                    onClick={() => setIsShow(!isShow)}
                >
                    <span className='addIconWrapper'>
                        <IoMdAdd size={12} />
                    </span>
                    Add Filter
                </button>

                <ul
                    className={`dropdown-menu filterdropdownMenu p-0 ${isShow && 'show'}`} 
                    onClick={(e) => e.stopPropagation()}
                >
                    <FilterSearch setIsShow={setIsShow}  />

                </ul>
            </div>

        </>
    )
}

export default AddFilterButton