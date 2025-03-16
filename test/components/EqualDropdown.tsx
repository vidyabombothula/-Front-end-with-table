import React, { FC, useState } from 'react'
import { FaSortDown } from 'react-icons/fa'

const EqualDropdown: FC = () => {
    const [selectedItem, setSelectedItem] = useState('Lesser than')

    const handleItemClick = (text: string) => {
        setSelectedItem(text)
    }

    return (
        <div className="dropdown IsDropdown">
            <button
                className="isDropDwonButton "
                type="button"
                id="dropdownMenuButton3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {selectedItem} 
                <FaSortDown size={15}  />
            </button>
            <ul className="dropdown-menu customDropDwonMenu" aria-labelledby="dropdownMenuButton3">
                <li><a className={`dropdown-item ${selectedItem === 'Lesser than' ? 'active' : ''}`} onClick={() => handleItemClick('Lesser than')} href="#">Lesser than</a></li>
                <li><a className={`dropdown-item ${selectedItem === 'Greater than' ? 'active' : ''}`} onClick={() => handleItemClick('Greater than')} href="#">Greater than</a></li>
                <li><a className={`dropdown-item ${selectedItem === 'Equals' ? 'active' : ''}`} onClick={() => handleItemClick('Equals')} href="#">Equals</a></li>
            </ul>
        </div>
    )
}

export default EqualDropdown
