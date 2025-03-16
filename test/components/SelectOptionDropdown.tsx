import React, { FC, useState } from 'react'

interface SelectOptionDropdownProps {
    item: Array<{
        id: number;
        lable: string;
    }>;
    setSelectedValue: (value: string[]) => void;
    setIsOpen: (value: boolean) => void;
}

// Remove unused interface
// interface DropdownOption {
//   value: string;
//   label: string;
// }

const SelectOptionDropdown: FC<SelectOptionDropdownProps> = ({ item, setSelectedValue, setIsOpen }) => {
    const [isActive, setIsActive] = useState<number>(1);
    // Fix any types with proper type definitions
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [applyValue, setApplyValue] = useState<string[]>([]);

    // Add new function to handle select all
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allLabels = item.map((item: { lable: string }) => item.lable);
            setSelectedItems(allLabels);
            setApplyValue(allLabels)
        } else {
            setSelectedItems([]);
            setApplyValue([])
        }
    };

    // Add function to handle individual item selection
    const handleItemSelect = (inputValue: string) => {
        setSelectedItems((prev: string[]) => {
            if (prev.includes(inputValue)) {
                const lableValue = prev.filter((item: string) => item !== inputValue)
                setApplyValue(lableValue);
                return lableValue;
            } else {
                setApplyValue([...prev, inputValue]);
                return [...prev, inputValue];
            }
        });
    };

    const handleApplay = () => {
        if (applyValue) {
            setSelectedValue(applyValue);
            setIsOpen(false)
        }
    }

    return (
        <ul className="searchOptionContainer  ">
            <li className="selectTagsOptionValue ChechAllCheckBoxOption">
                <input
                    type="checkbox"
                    id="checkAll"
                    className="checkBoxInput"
                    checked={selectedItems.length === item.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <label htmlFor="checkAll" className="valueLabel">
                    Select all
                </label>
            </li>

            {item.map((item: { id: number; lable: string }, index: number) => {
                return (
                    <li
                        key={index}
                        className={`selectTagsOptionValue ${isActive === item.id && "active"}`}
                        onClick={() => {
                            setIsActive(item.id);
                            handleItemSelect(item.lable);
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.lable)}
                            onChange={() => handleItemSelect(item.lable)}
                            onClick={() => handleItemSelect(item.lable)}
                            id={item.lable}
                            className="checkBoxInput"
                        />
                        <label htmlFor={item.lable} className="valueLabel">
                            {item.lable}
                        </label>
                    </li>
                );
            })}

            <button onClick={handleApplay} className="applyButton">Apply⏎</button>
        </ul>
    )
}

export default SelectOptionDropdown