import React, { FC, useState } from 'react'

const IsDropdown: FC = () => {
    const [selectedItem, setSelectedItem] = useState('is')

    const handleItemClick = (text: string) => {
        setSelectedItem(text)
    }

    return (
        <div className="dropdown IsDropdown">
            <button
                className="isDropDwonButton"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {selectedItem}
            </button>
            <ul className="dropdown-menu customDropDwonMenu" aria-labelledby="dropdownMenuButton1">
                <li><a className={`dropdown-item ${selectedItem === 'is' ? 'active' : ''}`} onClick={() => handleItemClick('is')} href="#">is</a></li>
                <li><a className={`dropdown-item ${selectedItem === 'is not' ? 'active' : ''}`} onClick={() => handleItemClick('is not')} href="#">is not</a></li>
                <li><a className={`dropdown-item ${selectedItem === 'Scontains' ? 'active' : ''}`} onClick={() => handleItemClick('Scontains')} href="#">Scontains</a></li>
                <li><a className={`dropdown-item ${selectedItem === 'does not contain' ? 'active' : ''}`} onClick={() => handleItemClick('does not contain')} href="#">does not contain</a></li>
            </ul>
        </div>
    )
}

export default IsDropdown
