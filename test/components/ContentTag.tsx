"use client"
import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import ContentTagheader from "./ContentTagheader";
import SelectOptionDropdown from "./SelectOptionDropdown";
import IsDropdown from "./IsDropdown";
import EqualDropdown from "./EqualDropdown"; 


const ContentTag: React.FC<{ name: string; tag: string ; id: number }> = ({ name, tag, id, }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selectedValue, setSelectedValue] = useState<string[]>(["Select Value "]);

    // dropdownoption

    interface Item {
        id: number;
        lable: string;
    }

    const [items, setItems] = useState<Item[]>([]);


    const filterOnInputChange = (value: string) => {
        setSearchTerm(value);
        const newItem = items.filter((item: { id: number; lable: string }) => item.lable.toLowerCase().includes(value.toLowerCase()))
        setItems(newItem)
    };


    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setItems([{
                id: 1,
                lable: "Pumpkin",
            },
            {
                id: 2,
                lable: "Cat",
            },
            {
                id: 3,
                lable: "Ghost",
            },
            {
                id: 4,
                lable: "Egg",
            },])
        }
    }, [searchTerm]);

    return (
        <>
            <div className="ContentTag">
                <ContentTagheader name={name} tag={tag} id={id} />

                {/* tags */}
                {tag === "Tags" && (
                    <div className="dropdown filterButtonDropDowns selectValueContainer" ref={dropdownRef}>
                        <IsDropdown   />

                        <button
                            className={`valueSelectBtn ${isOpen && "active"}  `}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {selectedValue.length === 0 ? "Select Value" : (
                                selectedValue.map((value, index) => (
                                    <span key={index} className="selectedValue">{value}{index === selectedValue.length - 1 ? '' : ', '}</span>
                                ))
                            )}
                        </button>
                        <ul
                            className={`dropdown-menu  filterdropdownMenu  p-0 ${isOpen && "show"} `}
                        >
                            <div className="d-flex align-items-center justify-content-between gap-2 filterSearchWrapper">
                                <IoIosSearch size={19} color="#999999" className="searchIcon" />
                                <input
                                    type="text"
                                    className="filterSearchInput"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => filterOnInputChange(e.target.value)}
                                />
                            </div>
                            <SelectOptionDropdown setIsOpen={setIsOpen} item={items} setSelectedValue={setSelectedValue} />
                        </ul>
                    </div>
                )}

             
               

                {
                    tag === "Metrics" && (
                        <div className="dropdown filterButtonDropDowns selectValueContainer" ref={dropdownRef}>
                            <EqualDropdown />

                            <input type="text"
                                className={`valueSelectBtn valueSelectInput ${isOpen && "active"}  `}
                                onClick={() => setIsOpen(!isOpen)}
                            />
                        </div>
                    )
                }

            </div>

               {/* and Or button */} 
        </>

    );
};

export default ContentTag;
