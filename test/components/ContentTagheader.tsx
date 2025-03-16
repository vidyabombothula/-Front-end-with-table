import { useFilterContext } from '@/context/FilterContext'
import Image from 'next/image'
import React, { FC } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { IoIosArrowForward } from "react-icons/io";

const ContentTagheader: FC<{ tag: string; name: string, id: number }> = ({ tag, name, id }) => {
    const filterContext = useFilterContext()

    return (
        <div className="ContentTagheader">
            <div className="d-flex align-items-center gap-2 contentHeadLeft">
                <p className="mainText">{tag}</p>
                <span className="tagSpanIcon">
                    <IoIosArrowForward  className="greaterThenIcon" />
                </span>
                <div className="dropdown">
                    <button
                        className="tagdropdownButton  "
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {name}
                        <FaCaretDown color="#333333" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                            <a className="dropdown-item" href="#">
                                Tag 1
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <button className="deleteButton" onClick={() => filterContext.deleteFilter(id)}>
                <Image src={"/delete.svg"} width={15} height={18} alt='delect' className='deleteIcon' />
            </button>
        </div>
    )
}

export default ContentTagheader