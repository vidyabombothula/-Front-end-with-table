"use client"

import React, { FC, useState } from 'react'

const AndOrButton: FC = () => {
    const [active, setActive] = useState<string>("AND")
    return (
        <div className='AndOrButtonWrapper'>
            <div className="orLines"></div>
            <button className="AndOrButton">
                <span className={`buttonTabs ${active === "AND" && "active"}`} onClick={() => setActive("AND")}>AND</span>
                <span className={`buttonTabs ${active === "OR" && "active"}`} onClick={() => setActive("OR")}>OR</span>
            </button>
            <div className="orLines"></div>
        </div>
    )
}

export default AndOrButton